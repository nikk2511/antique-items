import React, { useState, useEffect, useRef } from 'react';
import { AntiqueItem, ChatMessage } from '../types';
import { createCuratorChat } from '../services/geminiService';
import { Icons } from './UI';
import { Chat, GenerateContentResponse } from '@google/genai';

interface ChatCuratorProps {
  item: AntiqueItem;
}

const ChatCurator: React.FC<ChatCuratorProps> = ({ item }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat when item changes
  useEffect(() => {
    const initChat = () => {
      const context = `
        Item: ${item.name}
        Era: ${item.era}
        Category: ${item.category}
        Price: $${item.price}
        Description: ${item.description}
        Historical Provenance: ${item.history}
      `;
      try {
        chatSessionRef.current = createCuratorChat(context);
        setMessages([{
          role: 'model',
          text: `Greetings. I am Aurelius, the curator. I see you are admiring the ${item.name} from the ${item.era}. How may I enlighten you about this piece?`,
          timestamp: new Date()
        }]);
      } catch (e) {
        console.error("Failed to init chat", e);
        setMessages([{
            role: 'model',
            text: 'I am unable to connect to the archives (API Key missing).',
            timestamp: new Date()
        }])
      }
    };

    initChat();
  }, [item]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      const responseText = result.text || "I apologize, I'm having trouble finding that information.";
      
      setMessages(prev => [...prev, {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: "Pardon me, I seem to have lost my train of thought. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-stone-50 border border-antique-200 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="bg-antique-100 p-3 border-b border-antique-200 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-antique-800 flex items-center justify-center text-white">
            <Icons.Star className="w-4 h-4" />
        </div>
        <div>
            <p className="text-sm font-bold text-antique-900">Ask Curator Aurelius</p>
            <p className="text-xs text-antique-600">AI-Powered Expert</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-antique-800 text-white rounded-tr-none' 
                : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-200 p-3 rounded-lg rounded-tl-none shadow-sm">
              <Icons.Loader2 className="w-4 h-4 animate-spin text-antique-600" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-antique-200">
        <div className="flex gap-2">
          <input 
            type="text"
            className="flex-1 bg-stone-50 border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-antique-500 font-sans"
            placeholder="Ask about origin, material, or care..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-antique-600 text-white p-2 rounded hover:bg-antique-700 disabled:opacity-50 transition-colors"
          >
            <Icons.Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatCurator;
