"use client";
import React, { useContext, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ThemeContext } from "@/providers/ThemeProvider";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface MenuItemProps {
  setActive: Dispatch<SetStateAction<string | null>>;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  onClick?: () => void; // Add this line to include the onClick prop
}
export const MenuItem: React.FC<MenuItemProps> = ({
  setActive,
  active,
  item,
  children,
  onClick
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <div onMouseEnter={() => setActive(item)} onClick={onClick} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className={
          theme === "dark"
            ? "text-neutral-200 dark:text-neutral-300 cursor-pointer lg:text-xl md:text-lg text-xs"
            : "text-neutral-700 dark:text-neutral-200 cursor-pointer lg:text-xl md:text-lg text-xs"
        }
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && children && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full overflow-x-auto navbar-menu flex border border-transparent dark:bg-black dark:border-white/[0.2] shadow-input justify-start sm:justify-center md:justify-center space-x-6 px-8 md:px-24 py-5 whitespace-nowrap backdrop-filter bg-base-100/30 backdrop-blur-xl bg-opacity-40 border-b border-gray-500 transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-lg"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
