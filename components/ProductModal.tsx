import React from 'react';
import { AntiqueItem } from '../types';
import { Button, Icons } from './UI';
import ChatCurator from './ChatCurator';

interface ProductModalProps {
  item: AntiqueItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: AntiqueItem) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-5xl h-[90vh] overflow-y-auto rounded-none shadow-2xl flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <Icons.X className="w-6 h-6 text-stone-800" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-stone-100 flex items-center justify-center p-8 md:sticky md:top-0 md:h-full">
          <div className="relative w-full aspect-square max-w-md shadow-xl">
             <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none"></div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-8 bg-white">
          <div>
            <p className="text-antique-600 font-bold tracking-widest text-xs uppercase mb-2">{item.category} • {item.era}</p>
            <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">{item.name}</h2>
            <p className="text-2xl font-serif text-antique-800 mb-6">${item.price.toLocaleString()}</p>
            
            <div className="prose prose-stone mb-6 text-stone-600 leading-relaxed font-sans">
              <p>{item.description}</p>
              <h4 className="font-bold text-stone-800 mt-4 text-sm uppercase tracking-wide">History</h4>
              <p className="text-sm">{item.history}</p>
            </div>

            <Button onClick={() => { onAddToCart(item); onClose(); }} className="w-full">
              <Icons.ShoppingBag className="w-4 h-4" />
              Acquire This Piece
            </Button>
          </div>

          <div className="border-t border-stone-200 pt-8">
            <ChatCurator item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
