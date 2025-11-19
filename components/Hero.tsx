import React from 'react';
import { Button, Icons } from './UI';

interface HeroProps {
  onShopNow: () => void;
  onAppraise: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow, onAppraise }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-[pulse_20s_ease-in-out_infinite]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2969&auto=format&fit=crop")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
        <div className="max-w-2xl text-white space-y-6">
          <div className="flex items-center gap-2 text-antique-200 opacity-90">
            <div className="h-[1px] w-12 bg-antique-200"></div>
            <span className="tracking-widest uppercase text-sm">Est. 1892 • London</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display leading-tight">
            Timeless Beauty <br />
            <span className="text-antique-300 italic font-serif">Reimagined.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-200 font-sans font-light leading-relaxed max-w-lg">
            Discover curated artifacts from centuries past, authenticated by experts and powered by modern intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button onClick={onShopNow} className="min-w-[180px]">
              Explore Collection
            </Button>
            <Button onClick={onAppraise} variant="outline" className="min-w-[180px] border-white text-white hover:bg-white hover:text-black">
              <Icons.Camera className="w-4 h-4" />
              Appraise Item
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <div className="w-px h-12 bg-white/50 mx-auto mb-2"></div>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </div>
  );
};

export default Hero;
