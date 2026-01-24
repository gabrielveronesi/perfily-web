import React from 'react';

export const PixLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M386.7 85.3H125.3L16 194.7L256 434.7L496 194.7L386.7 85.3ZM256 348L106.7 198.7L169.3 136H342.7L405.3 198.7L256 348Z" />
    <path d="M256 168C238.3 168 224 182.3 224 200C224 217.7 238.3 232 256 232C273.7 232 288 217.7 288 200C288 182.3 273.7 168 256 168Z" />
  </svg>
);

export const UserAvatar: React.FC<{ index: number }> = ({ index }) => {
  const colors = ['bg-indigo-100 text-indigo-600', 'bg-emerald-100 text-emerald-600', 'bg-rose-100 text-rose-600', 'bg-amber-100 text-amber-600', 'bg-sky-100 text-sky-600'];
  const colorClass = colors[index % colors.length];
  
  return (
    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-white ${colorClass}`}>
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
};
