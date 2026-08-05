import React from 'react';
import { ArrowUp, Phone, Mail } from 'lucide-react';
import data from '../../data.json';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D473B] text-[#FFFBF8] py-16 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        <h2 className="font-cinzel-dec text-3xl md:text-5xl text-[#FFFBF8] font-bold tracking-wider">
          {data.footer.names}
        </h2>

        <span className="font-script text-2xl text-[#C09A6B] my-2">
          {data.brandName}
        </span>

        <p className="font-cormorant text-lg text-[#E6EFEA] max-w-lg italic my-4">
          {data.footer.description}
        </p>

        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C09A6B] to-transparent my-6" />

        
        <div className="flex flex-wrap justify-center gap-6 text-xs font-sans text-[#E6EFEA] my-4 font-medium">
          {data.footer.contacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-2">
              {contact.type === 'phone' ? (
                <Phone className="w-4 h-4 text-[#C09A6B]" />
              ) : (
                <Mail className="w-4 h-4 text-[#C09A6B]" />
              )}
              <span>{contact.label}</span>
            </div>
          ))}
        </div>

        
        <button
          onClick={scrollToTop}
          className="mt-8 p-4 rounded-full border border-[#C09A6B] bg-[#FFFBF8] text-[#4A231A] hover:bg-[#C09A6B] hover:text-[#FFFBF8] transition-all shadow-md group"
          title="Return to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>

        <p className="font-cinzel text-[10px] text-[#C09A6B] tracking-widest uppercase font-bold mt-8">
          {data.footer.creditText}{' '}
          <a
            href={data.footer.creditLink}
            target="_blank"
            rel="noreferrer"
            className="text-[#F8E7BA] hover:text-white transition-colors underline underline-offset-4"
          >
            {data.footer.creditName}
          </a>
        </p>
      </div>
    </footer>
  );
}
