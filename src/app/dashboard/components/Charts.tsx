"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Skeleton from "./Skeleton";  // Import skeleton

import { lineChartData, barChartData, pieChartData } from "@/lib/mockData";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const chartVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface ChartsProps {
  isLoading?: boolean;
}

const Charts: React.FC<ChartsProps> = ({ isLoading = false }) => {
  if (isLoading) {
    // Show skeleton placeholders for charts
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg shadow bg-white dark:bg-gray-900">
            <Skeleton className="h-8 w-40 mb-6" />
            <Skeleton className="h-56 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      {/* Line Chart */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <h3 className="text-lg font-semibold mb-4">Product Sales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barChartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="sales"
              fill="#82ca9d"
              barSize={40}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <h3 className="text-lg font-semibold mb-4">Browser Usage</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              fill="#8884d8"
              label
              isAnimationActive={true}
              animationDuration={1500}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Charts;
