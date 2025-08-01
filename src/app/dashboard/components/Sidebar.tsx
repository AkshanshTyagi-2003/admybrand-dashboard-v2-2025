'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiHome, FiBarChart2, FiUsers } from "react-icons/fi";
import clsx from "clsx";

// ✅ 1. Define prop type
type SidebarProps = {
  onToggle: (isExpanded: boolean) => void;
};

// ✅ 2. Accept props in function
export default function Sidebar({ onToggle }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const newVal = !prev;
      onToggle(newVal); // ✅ pass updated state back to parent
      return newVal;
    });
  };

  return (
    <motion.div
      animate={{ width: isExpanded ? 256 : 80 }}
      transition={{ duration: 0.3, type: 'tween' }}
      onClick={toggleSidebar}
      className={clsx(
        'h-screen bg-white dark:bg-gray-900 shadow-md flex flex-col p-4 cursor-pointer',
        'transition-all ease-in-out duration-300 overflow-hidden'
      )}
    >
      <ul className="space-y-6 mt-6">
        {[
          { name: "Dashboard", icon: <FiHome /> },
          { name: "Analytics", icon: <FiBarChart2 /> },
          { name: "Users", icon: <FiUsers /> },
        ].map(({ name, icon }) => (
          <motion.li
            key={name}
            initial={{ opacity: 0.7 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            className="flex items-center gap-4 text-gray-700 dark:text-gray-300"
          >
            <span className="text-2xl">{icon}</span>
            {isExpanded && <span className="text-base font-semibold">{name}</span>}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
