'use client';

import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, change }) => {
  const isPositive = change >= 0;

  // Extract numeric value for CountUp
  const numericValue =
    typeof value === "number"
      ? value
      : parseFloat(value.replace(/[^\d.-]/g, "")); // removes $ and % signs

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)" }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </div>
        <div className="text-gray-700 dark:text-gray-200 text-xl">{icon}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-4xl font-semibold text-gray-900 dark:text-white">
          <CountUp
            start={0}
            end={numericValue || 0}
            duration={1.5}
            separator=","
            decimals={typeof value === "string" && value.includes("%") ? 1 : 0}
            suffix={typeof value === "string" && value.includes("%") ? "%" : ""}
            prefix={typeof value === "string" && value.includes("$") ? "$" : ""}
          />
        </div>

        <motion.div
          className="flex items-center gap-1 text-sm font-medium"
          animate={{ color: isPositive ? "#16a34a" : "#ef4444" }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {isPositive ? (
              <motion.div
                key="up"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <ArrowUp size={18} className="text-green-500" />
              </motion.div>
            ) : (
              <motion.div
                key="down"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                <ArrowDown size={18} className="text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
          <span>{Math.abs(change)}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
