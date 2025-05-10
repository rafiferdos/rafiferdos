"use client";
import { ThemeContext } from "@/providers/ThemeProvider";
import { cn } from "@/utils/cn";
import { motion, stagger, useAnimate } from "framer-motion";
import { useContext, useEffect } from "react";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const { theme } = useContext(ThemeContext);
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={
                theme === "dark"
                  ? "text-white opacity-0 font-normal text-sm sm:text-lg md:text-xl lg:text-2xl"
                  : "text-black opacity-0 font-normal text-sm sm:text-lg md:text-xl lg:text-2xl"
              }
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className=" dark:text-white text-black text-xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
