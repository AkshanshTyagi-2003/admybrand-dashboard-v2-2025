'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadialBarChart,
  RadialBar,
} from 'recharts';

import Skeleton from '@/app/dashboard/components/Skeleton'; // alias import

import {
  lineChartData,
  barChartData,
  pieChartData,
  areaChartData,
  radarChartData,
  radialBarChartData,
} from '@/lib/mockData';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FFBB28'];

const chartVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

interface ChartsProps {
  isLoading?: boolean;
}

const Charts: React.FC<ChartsProps> = ({ isLoading = false }) => {
  if (isLoading) {
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
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
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
            <Bar dataKey="sales" fill="#82ca9d" barSize={40} />
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
              label
              isAnimationActive={true}
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

      {/* Area Chart */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <h3 className="text-lg font-semibold mb-4">Traffic Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={areaChartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="visits" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <h3 className="text-lg font-semibold mb-4">Department Performance</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={radarChartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="department" />
            <PolarRadiusAxis />
            <Radar dataKey="score" stroke="#ff7f50" fill="#ff7f50" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Radial Bar Chart */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow"
        initial="hidden"
        animate="visible"
        variants={chartVariants}
      >
        <h3 className="text-lg font-semibold mb-4">Conversion Rates</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart
  innerRadius="30%"
  outerRadius="90%"
  data={radialBarChartData}
  startAngle={180}
  endAngle={0}
>
  <RadialBar background dataKey="value" />
  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
  <Tooltip />
</RadialBarChart>

        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Charts;
