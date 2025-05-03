import { cn } from "@/utils/cn";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  // Create state to store client-side rendered meteors
  const [meteorElements, setMeteorElements] = useState<React.ReactNode[]>([]);
  
  // Only generate meteors on the client side
  useEffect(() => {
    const meteors = new Array(number || 20).fill(true);
    
    const elements = meteors.map((_, idx) => {
      const left = Math.floor(Math.random() * (400 - -400) + -400);
      const delay = Math.random() * (0.8 - 0.2) + 0.2;
      const duration = Math.floor(Math.random() * (10 - 2) + 2);
      
      return (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: left + "px",
            animationDelay: delay + "s",
            animationDuration: duration + "s",
          }}
        ></span>
      );
    });
    
    setMeteorElements(elements);
  }, [number, className]);

  // Return a placeholder during SSR to avoid hydration issues
  if (typeof window === 'undefined') {
    return (
      <div className="meteors-container relative w-full h-full">
        {/* Empty container for SSR */}
      </div>
    );
  }

  // Return client-side rendered meteors
  return (
    <div className="meteors-container relative w-full h-full">
      {meteorElements}
    </div>
  );
};