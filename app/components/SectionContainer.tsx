import React, { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ children }) => {
  return (
    <div className="antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen place-content-center flex flex-col items-center justify-center text-sm sm:text-base">
      {children}
    </div>
  );
};

export default SectionContainer;