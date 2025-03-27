'use client'

import React, { useState } from "react";
import { motion } from 'framer-motion';
import { FaAngleDown } from "react-icons/fa6";

const CategoryBtn = ({ className }) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    const sound = new Audio("/sounds/drop.wav");
    sound.volume = 0.6;
    sound.play();

    setIsRotated((prev) => !prev); // Toggle the rotation state
  };

  return (
    <div>
      <button className={`flex items-center gap-1 ${className}`} onClick={handleClick}>
        Categories
        <motion.span
          animate={{ rotate: isRotated ? 180 : 0 }} // Rotate 180 degrees if `isRotated` is true
          transition={{ duration: 0.3 }}
        >
          <FaAngleDown />
        </motion.span>
      </button>
    </div>
  );
};

export default CategoryBtn;
