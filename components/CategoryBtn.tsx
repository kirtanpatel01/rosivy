'use client'

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa6";

const CategoryBtn = ({ className }: { className: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const sound = new Audio("/sounds/drop.wav");
    sound.volume = 0.6;
    sound.play();

    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const list = ["Bracelet", "Necklace", "Bukey", "Ribbens"];

  return (
    <div ref={dropdownRef} className="relative flex flex-col items-center">
      <button
        className={`flex items-center cursor-pointer hover:text-black transition-all duration-300 gap-1 ${className}`}
        onClick={handleClick}
      >
        Categories
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaAngleDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-8 bg-white min-w-36 border-6 border-p5 rounded-2xl px-4 py-3 space-y-2 shadow-md"
          >
            {list.map((item) => (
              <li
                key={item}
                className="flex flex-col items-center text-black gap-2 border border-p6/40 rounded-full px-2 py-1 cursor-pointer hover:bg-p2/50"
              >
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CategoryBtn;
