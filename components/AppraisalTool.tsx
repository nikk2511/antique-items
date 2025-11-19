import React, { useState, useRef } from 'react';
import { Button, SectionHeading, Icons } from './UI';
import { appraiseImage } from '../services/geminiService';

const AppraisalTool: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Extract raw base64 for Gemini
        const base64Data = base64String.split(',')[1];
        setImage(base64String);
        setMimeType(file.type);
      };
      reader.readAsDataURL(file);
      setResult('');
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsLoading(true);
    
    // We need the raw base64 data, not the data URL
    const base64Data = image.split(',')[1];

    try {
      const analysis = await appraiseImage(base64Data, mimeType);
      setResult(analysis);
    } catch (err) {
      setResult("An error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <SectionHeading 
        title="AI Appraisal Studio" 
        subtitle="Discover the hidden value" 
      />
      
      <div className="grid md:grid-cols-2 gap-12 mt-12 items-start">
        {/* Upload Area */}
        <div className="space-y-6">
          <div 
            className={`border-2 border-dashed border-antique-300 rounded-lg aspect-[4/3] flex flex-col items-center justify-center p-6 transition-all ${!image ? 'bg-stone-50 hover:bg-stone-100 cursor-pointer' : 'bg-white'}`}
            onClick={() => !image && fileInputRef.current?.click()}
          >
            {image ? (
              <div className="relative w-full h-full">
                <img src={image} alt="Upload" className="w-full h-full object-contain rounded" />
                <button 
                  onClick={(e) => { e.stopPropagation(); setImage(null); setResult(''); }}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:text-red-600"
                >
                  <Icons.X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="text-center text-stone-500">
                <Icons.Camera className="w-12 h-12 mx-auto mb-4 text-antique-400" />
                <p className="font-medium">Click to upload an image</p>
                <p className="text-sm mt-2 text-stone-400">Supports JPG, PNG</p>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileSelect}
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={!image || isLoading} 
            className="w-full"
          >
            {isLoading ? <><Icons.Loader2 className="animate-spin" /> Analyzing...</> : 'Analyze Item'}
          </Button>
        </div>

        {/* Result Area */}
        <div className="bg-white border border-antique-200 p-8 min-h-[400px] rounded-sm shadow-sm relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-antique-300 via-antique-600 to-antique-300"></div>
           
           {!result && !isLoading && (
             <div className="h-full flex flex-col items-center justify-center text-stone-400 text-center">
               <Icons.Search className="w-12 h-12 mb-4 opacity-20" />
               <p>Upload an image and ask our AI Curator to analyze its era, style, and estimated value.</p>
             </div>
           )}

           {isLoading && (
             <div className="h-full flex flex-col items-center justify-center text-antique-600">
                <Icons.Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-serif italic">Consulting the archives...</p>
             </div>
           )}

           {result && (
             <div className="prose prose-stone prose-sm max-w-none animate-[fadeIn_0.5s_ease-out]">
               <h3 className="font-display text-2xl text-antique-900 border-b border-antique-100 pb-2 mb-4">Appraisal Report</h3>
               <div className="whitespace-pre-wrap font-serif text-stone-700 leading-relaxed">
                {result}
               </div>
               <div className="mt-8 p-4 bg-antique-50 border border-antique-200 text-xs text-antique-800 italic">
                 Disclaimer: This is an AI-generated estimate for informational purposes only and does not constitute a certified professional appraisal.
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AppraisalTool;
