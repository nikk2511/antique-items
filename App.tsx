import React, { useState } from 'react';
import { AntiqueItem, AppView } from './types';
import { MOCK_ANTIQUES } from './constants';
import Hero from './components/Hero';
import { SectionHeading, Icons, Button } from './components/UI';
import ProductModal from './components/ProductModal';
import AppraisalTool from './components/AppraisalTool';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedItem, setSelectedItem] = useState<AntiqueItem | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = (item: AntiqueItem) => {
    setCartCount(prev => prev + 1);
    // In a real app, we'd manage a cart array
    alert(`Added ${item.name} to cart.`);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.APPRAISAL:
        return (
            <div className="min-h-screen pt-20">
                 <AppraisalTool />
            </div>
        );
      case AppView.CATALOG:
        return (
            <div className="min-h-screen pt-20 px-6 max-w-7xl mx-auto pb-24">
                <SectionHeading title="Curated Collection" subtitle="New Arrivals" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {MOCK_ANTIQUES.map(item => (
                        <div 
                            key={item.id} 
                            className="group bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
                            onClick={() => setSelectedItem(item)}
                        >
                            <div className="relative overflow-hidden aspect-[4/5]">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                
                                {/* Quick View Button */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <Button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedItem(item);
                                        }}
                                        className="bg-white/90 backdrop-blur-sm text-stone-900 hover:bg-white hover:text-antique-800 shadow-lg min-w-[140px]"
                                    >
                                        <Icons.Eye className="w-4 h-4" />
                                        Quick View
                                    </Button>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="text-xs font-bold tracking-widest text-antique-600 mb-2 uppercase">{item.category}</p>
                                <h3 className="text-xl font-display text-stone-900 mb-2 group-hover:text-antique-700 transition-colors">{item.name}</h3>
                                <div className="mt-auto flex justify-between items-end pt-4 border-t border-stone-100">
                                    <span className="font-serif text-lg text-stone-600 italic">{item.era}</span>
                                    <span className="font-bold text-stone-900 text-lg">${item.price.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
      case AppView.HOME:
      default:
        return (
            <>
                <Hero 
                    onShopNow={() => setCurrentView(AppView.CATALOG)} 
                    onAppraise={() => setCurrentView(AppView.APPRAISAL)}
                />
                <div className="py-24 px-6 bg-white">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
                         <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-antique-50 rounded-full flex items-center justify-center text-antique-800">
                                <Icons.Star />
                            </div>
                            <h3 className="font-display text-xl">Authenticated</h3>
                            <p className="text-stone-600 font-light">Every piece is rigorously verified by our experts for authenticity and provenance.</p>
                         </div>
                         <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-antique-50 rounded-full flex items-center justify-center text-antique-800">
                                <Icons.MessageCircle />
                            </div>
                            <h3 className="font-display text-xl">AI Curator</h3>
                            <p className="text-stone-600 font-light">Chat with our digital historian to learn the deep history behind every artifact.</p>
                         </div>
                         <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto bg-antique-50 rounded-full flex items-center justify-center text-antique-800">
                                <Icons.Search />
                            </div>
                            <h3 className="font-display text-xl">Smart Appraisal</h3>
                            <p className="text-stone-600 font-light">Upload photos of your own heirlooms to receive instant AI-driven value estimates.</p>
                         </div>
                    </div>
                </div>
            </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-antique-200 selection:text-antique-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView(AppView.HOME)}>
            <div className="w-8 h-8 bg-antique-800 rounded-sm flex items-center justify-center text-white font-display font-bold text-xl">A</div>
            <span className="font-display text-2xl font-semibold tracking-tight">AURELIA</span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex gap-8">
             <button 
                onClick={() => setCurrentView(AppView.HOME)}
                className={`text-sm tracking-widest uppercase hover:text-antique-600 transition-colors ${currentView === AppView.HOME ? 'text-antique-800 font-bold' : 'text-stone-500'}`}
             >
                Home
             </button>
             <button 
                onClick={() => setCurrentView(AppView.CATALOG)}
                className={`text-sm tracking-widest uppercase hover:text-antique-600 transition-colors ${currentView === AppView.CATALOG ? 'text-antique-800 font-bold' : 'text-stone-500'}`}
             >
                Collection
             </button>
             <button 
                onClick={() => setCurrentView(AppView.APPRAISAL)}
                className={`text-sm tracking-widest uppercase hover:text-antique-600 transition-colors ${currentView === AppView.APPRAISAL ? 'text-antique-800 font-bold' : 'text-stone-500'}`}
             >
                Appraisal
             </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer group">
                <Icons.ShoppingBag className="w-6 h-6 text-stone-800 group-hover:text-antique-600 transition-colors" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-antique-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </div>
            <button className="md:hidden">
                <Icons.Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderView()}
      </main>
      
      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
                <span className="font-display text-2xl text-white block mb-4">AURELIA</span>
                <p className="max-w-sm font-light">Preserving history through curated elegance. We bring the finest antiques from around the world to your home.</p>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-4 text-sm">Links</h4>
                <ul className="space-y-2 text-sm">
                    <li>Collection</li>
                    <li>About Us</li>
                    <li>Appraisal</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold uppercase tracking-widest mb-4 text-sm">Contact</h4>
                <ul className="space-y-2 text-sm">
                    <li>London, UK</li>
                    <li>contact@aurelia.co</li>
                    <li>+44 20 7123 4567</li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-stone-800 text-xs flex justify-between">
            <span>© 2024 Aurelia Antiques. All rights reserved.</span>
            <span>Powered by Google Gemini</span>
        </div>
      </footer>

      {/* Modal */}
      {selectedItem && (
        <ProductModal 
          item={selectedItem} 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default App;