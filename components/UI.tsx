import React from 'react';

// Lucide Icons
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  MessageCircle, 
  Camera, 
  ArrowRight, 
  Star,
  Loader2,
  Send,
  Eye
} from 'lucide-react';

export const Icons = {
  ShoppingBag,
  Search,
  Menu,
  X,
  MessageCircle, 
  Camera,
  ArrowRight,
  Star,
  Loader2,
  Send,
  Eye
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-none font-sans font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-antique-800 text-white hover:bg-antique-900 hover:shadow-lg",
    secondary: "bg-antique-200 text-antique-900 hover:bg-antique-300",
    outline: "border border-antique-800 text-antique-800 hover:bg-antique-800 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const SectionHeading: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <span className="block text-antique-600 font-sans text-sm tracking-widest uppercase mb-2">
        {subtitle}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-display font-normal text-stone-800">
      {title}
    </h2>
    <div className={`mt-4 h-1 w-16 bg-antique-400 ${align === 'center' ? 'mx-auto' : ''}`} />
  </div>
);