import { GoogleGenAI, Chat } from "@google/genai";

let genAI: GoogleGenAI | null = null;

// Initialize the client safely
const getClient = (): GoogleGenAI => {
  if (!genAI) {
    if (!process.env.API_KEY) {
      throw new Error("API Key not found in environment variables");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const createCuratorChat = (context: string): Chat => {
  const client = getClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are an expert antique curator named Aurelius. 
      Your tone is sophisticated, knowledgeable, yet accessible. 
      You are assisting a potential buyer.
      
      Here is the specific item context you are discussing:
      ${context}
      
      Answer their questions about history, value, maintenance, and style. 
      Keep answers concise (under 100 words) unless asked for a detailed history.`,
    },
  });
};

export const appraiseImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const client = getClient();
  
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: "Act as an expert antique appraiser. Analyze this image. Identify the likely era, style, materials, and potential origin. Provide a rough estimated price range in USD. Format the response with clear headings.",
          },
        ],
      },
    });
    
    return response.text || "I could not generate an appraisal for this image.";
  } catch (error) {
    console.error("Appraisal failed", error);
    return "Sorry, I encountered an error while analyzing the image. Please try again.";
  }
};
