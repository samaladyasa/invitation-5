import React, { useId } from 'react';


export function ScallopedDivider({ fillColor = "#F7FAF8", topColor = "transparent", reverse = false }) {
  return (
    <div className={`relative w-full overflow-hidden leading-none z-10 ${reverse ? 'rotate-180' : ''}`}>
      <svg
        className="relative block w-full h-12 md:h-20 text-[#D4A96A]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 350,-40 500,60 C650,160 900,-20 1200,40 L1200,120 L0,120 Z"
          fill={fillColor}
        />
        <path
          d="M0,0 C150,90 350,-40 500,60 C650,160 900,-20 1200,40"
          fill="none"
          stroke="#D4A96A"
          strokeWidth="1"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}


export function TempleArchDivider({ fillColor = "#FFFBF8", strokeColor = "#D4A96A" }) {
  return (
    <div className="relative w-full overflow-hidden leading-none z-10 py-2">
      <svg
        className="w-full h-16 md:h-24 text-[#D4A96A]/25"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,0 Q 250,90 500,30 Q 750,90 1000,0 L 1000,100 L 0,100 Z"
          fill={fillColor}
        />
        <path
          d="M 0,0 Q 250,90 500,30 Q 750,90 1000,0"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}


export function GarlandDivider() {
  return (
    <div className="relative w-full overflow-hidden z-20 py-3 my-2">
      <div className="relative w-full flex justify-between items-center px-6 md:px-20 opacity-70">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center" style={{ opacity: 0.9 - (i % 3) * 0.06 }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A96A] mb-1" />
            <div className="w-0.5 h-6 md:h-8 bg-gradient-to-b from-[#D4A96A] to-[#C89052] rounded-full" />
            <div className="w-3 h-3 rounded-full bg-[#C89052] shadow-sm flex items-center justify-center text-[9px] text-white font-semibold mt-1">
              •
            </div>
          </div>
        ))}
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent mt-1" />
    </div>
  );
}


export function PaisleyWaveDivider({ fillColor = "#F7FAF8" }) {
  return (
    <div className="relative w-full overflow-hidden z-10">
      <svg className="w-full h-16 md:h-28 text-[#D4A96A]/30" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,0 C300,120 400,-50 700,90 C900,140 1100,20 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        />
        <path
          d="M0,0 C300,120 400,-50 700,90 C900,140 1100,20 1200,60"
          fill="none"
          stroke="#D4A96A"
          strokeWidth="1"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}


export function FiligreeDivider() {
  return (
    <div className="flex items-center justify-center my-8 md:my-12 px-6">
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent" />
      <div className="px-4 flex items-center gap-3">
        <span className="text-[#D4A96A] text-sm">❖</span>
        <span className="text-white font-cinzel tracking-widest text-sm uppercase font-semibold">
          ॐ Shree Ganeshay Namah ॐ
        </span>
        <span className="text-[#D4A96A] text-sm">❖</span>
      </div>
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#D4A96A] to-transparent" />
    </div>
  );
}


export function MountainDivider({
  prevColor = '#FFFFFF',
  fillColor = '#F0F5F2',
  height = 140,
  variant = 'classic',
  strokeColor = 'rgba(255,255,255,0.72)',
}) {
  const gradientId = useId();

  const variantPaths = {
    classic: {
      top: 'M0,0 H1200 V24 C1048,28 930,10 820,18 C704,26 598,10 484,14 C334,20 210,50 0,30 Z',
      main: 'M0,30 C190,88 300,8 462,46 C658,92 770,22 924,58 C1028,82 1114,40 1200,64 L1200,160 L0,160 Z',
      accent: 'M0,30 C190,88 300,8 462,46 C658,92 770,22 924,58 C1028,82 1114,40 1200,64',
    },
    soft: {
      top: 'M0,0 H1200 V26 C1088,30 964,14 844,18 C690,24 590,8 456,12 C304,18 180,44 0,34 Z',
      main: 'M0,34 C150,82 276,20 436,52 C620,90 754,22 904,56 C1004,80 1108,42 1200,66 L1200,160 L0,160 Z',
      accent: 'M0,34 C150,82 276,20 436,52 C620,90 754,22 904,56 C1004,80 1108,42 1200,66',
    },
    paper: {
      top: 'M0,0 H1200 V22 C1068,24 950,12 818,18 C678,24 594,8 472,12 C330,18 216,44 0,30 Z',
      main: 'M0,32 C176,80 296,20 462,54 C642,90 758,24 918,58 C1018,80 1096,42 1200,62 L1200,160 L0,160 Z',
      accent: 'M0,32 C176,80 296,20 462,54 C642,90 758,24 918,58 C1018,80 1096,42 1200,62',
    },
    step: {
      top: 'M0,0 H1200 V18 C1050,26 934,12 820,12 C678,12 584,8 470,12 C336,18 218,36 0,26 Z',
      main: 'M0,26 C170,66 302,14 470,44 C640,74 770,22 928,52 C1038,72 1114,38 1200,58 L1200,160 L0,160 Z',
      accent: 'M0,26 C170,66 302,14 470,44 C640,74 770,22 928,52 C1038,72 1114,38 1200,58',
    },
    swell: {
      top: 'M0,0 H1200 V20 C1076,26 966,14 848,18 C682,24 560,10 432,14 C278,18 190,44 0,32 Z',
      main: 'M0,36 C174,94 292,20 446,52 C620,90 744,22 900,62 C1018,92 1100,52 1200,74 L1200,160 L0,160 Z',
      accent: 'M0,36 C174,94 292,20 446,52 C620,90 744,22 900,62 C1018,92 1100,52 1200,74',
    },
    ink: {
      top: 'M0,0 H1200 V20 C1080,24 960,10 830,16 C692,22 560,8 436,14 C294,20 190,40 0,28 Z',
      main: 'M0,34 C168,94 282,16 456,56 C630,96 744,24 906,62 C1030,92 1114,48 1200,80 L1200,160 L0,160 Z',
      accent: 'M0,34 C168,94 282,16 456,56 C630,96 744,24 906,62 C1030,92 1114,48 1200,80',
    },
  };

  const selected = variantPaths[variant] || variantPaths.classic;

  return (
    <div
      className="relative w-full overflow-hidden leading-none isolate"
      style={{
        backgroundColor: prevColor,
        position: 'relative',
        zIndex: 20,
        marginTop: '0',
        marginBottom: '0',
      }}
    >
      <svg
        className="relative block w-full"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
        style={{
          height: `${height}px`,
          display: 'block',
          marginTop: '0',
          marginBottom: '0',
          filter: 'drop-shadow(0 8px 14px rgba(45, 71, 59, 0.08))',
        }}
      >
        <defs>
          <linearGradient id={`mountainGradient-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity="1" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="0.98" />
          </linearGradient>
        </defs>

        <path d={selected.top} fill={prevColor} />
        <path d={selected.main} fill={`url(#mountainGradient-${gradientId})`} />
        <path
          d={selected.accent}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function HeroRevealDivider({ topColor = '#85B09A', bottomColor = '#F6EFE5', height = 140 }) {
  return (
    <div className="relative w-full overflow-hidden leading-none" style={{ backgroundColor: topColor, height: `${height}px` }}>
      <svg
        className="block w-full h-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,18 C170,44 254,4 408,26 C590,52 682,18 866,30 C1032,42 1168,8 1440,28 L1440,180 L0,180 Z"
          fill={topColor}
        />
        <path
          d="M0,64 C170,116 286,26 470,68 C648,108 734,34 914,76 C1094,118 1238,56 1440,88 L1440,180 L0,180 Z"
          fill={bottomColor}
          opacity="0.98"
        />
        <path
          d="M0,62 C170,116 286,26 470,68 C648,108 734,34 914,76 C1094,118 1238,56 1440,88"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
