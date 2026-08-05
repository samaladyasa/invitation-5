import React from 'react';

export default function LuxuryButton({
  children,
  onClick,
  variant = 'gold', 
  className = '',
  icon: Icon = null,
  type = 'button'
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden rounded-full font-cinzel text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 group cursor-pointer';

  const variants = {
    gold: 'bg-gold-gradient text-[#4A231A] hover:brightness-105 border border-[#C09A6B]/50',
    maroon: 'bg-[#5C2C1E] text-[#FFFBF8] hover:bg-[#4A231A] border border-[#C09A6B]/60',
    emerald: 'bg-[#5C2C1E] text-[#FFFBF8] hover:bg-[#4A231A] border border-[#C09A6B]/60',
    outline: 'bg-[#FFFBF8]/90 backdrop-blur-md text-[#4A231A] border-2 border-[#C09A6B] hover:bg-[#5C2C1E] hover:text-[#FFFBF8]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
      </span>
    </button>
  );
}
