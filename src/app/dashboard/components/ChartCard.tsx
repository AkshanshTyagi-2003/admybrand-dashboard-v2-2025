import React from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-10">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;
