'use client';

import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import MetricCard from "./components/MetricCard";
import ChartCard from "./components/ChartCard";
import DataTable from "./components/DataTable";
import Charts from "./components/Charts";
import { FiTrendingUp, FiUsers, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";

interface MetricType {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  date: string;
}

interface TableRow {
  name: string;
  email: string;
  sales: number;
  date: string;
}

export default function DashboardPage() {
  const tableColumns = ["name", "email", "sales", "date"];

  const [metrics, setMetrics] = useState<MetricType[]>([]);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState({ fromDate: "", toDate: "" });

  const filterByDate = (data: any[], from: string, to: string) => {
    if (!from && !to) return data;
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      const fromD = from ? new Date(from) : null;
      const toD = to ? new Date(to) : null;
      if (fromD && toD) return itemDate >= fromD && itemDate <= toD;
      if (fromD) return itemDate >= fromD;
      if (toD) return itemDate <= toD;
      return true;
    });
  };

  const filteredMetrics = useMemo(
    () => filterByDate(metrics, dateRange.fromDate, dateRange.toDate),
    [metrics, dateRange]
  );

  const filteredTableData = useMemo(
    () => filterByDate(tableData, dateRange.fromDate, dateRange.toDate),
    [tableData, dateRange]
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/users");
        const users = res.data;
        const now = new Date();
        const userTable: TableRow[] = users.map((user: any, i: number) => {
          const fakeDate = new Date(now.getTime() - i * 86400000);
          return {
            name: `${user.name.firstname} ${user.name.lastname}`,
            email: user.email,
            sales: Math.floor(Math.random() * 10000 + 10000),
            date: fakeDate.toISOString().split("T")[0],
          };
        });

        const totalRevenue = userTable.reduce((sum, user) => sum + user.sales, 0);
        const totalUsers = userTable.length;
        const growthPercentage = `${(Math.random() * 20).toFixed(1)}%`;

        const newMetrics: MetricType[] = [
          {
            title: "Revenue",
            value: totalRevenue,
            icon: <FiDollarSign />,
            change: Math.random() * 10,
            date: now.toISOString().split("T")[0],
          },
          {
            title: "Users",
            value: totalUsers,
            icon: <FiUsers />,
            change: Math.random() * 10,
            date: now.toISOString().split("T")[0],
          },
          {
            title: "Growth",
            value: growthPercentage,
            icon: <FiTrendingUp />,
            change: Math.random() * 10 - 5,
            date: now.toISOString().split("T")[0],
          },
        ];

        setMetrics(newMetrics);
        setTableData(userTable);
      } catch (err) {
        console.error("API Fetch Failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let simulationInterval: NodeJS.Timeout;
    let updateInterval: NodeJS.Timeout;

    const startSimulation = () => {
      setIsLoading(true);

      updateInterval = setInterval(() => {
        setMetrics((prev) =>
          prev.map((metric) => {
            const randomChange = parseFloat((Math.random() * 10 - 5).toFixed(1));
            let raw =
              typeof metric.value === "number"
                ? metric.value
                : parseFloat(metric.value.toString().replace(/[^\d.]/g, ""));
            raw += randomChange;
            if (metric.title === "Revenue") {
              return { ...metric, value: Math.max(0, raw), change: randomChange };
            } else if (metric.title === "Users") {
              return {
                ...metric,
                value: Math.max(0, Math.round(raw)),
                change: randomChange,
              };
            } else {
              return {
                ...metric,
                value: `${Math.max(0, raw).toFixed(1)}%`,
                change: randomChange,
              };
            }
          })
        );
      }, 2000);

      setTimeout(() => {
        setIsLoading(false);
        clearInterval(updateInterval);
      }, 3000);
    };

    simulationInterval = setInterval(() => startSimulation(), 30000);

    return () => {
      clearInterval(simulationInterval);
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Dashboard Overview
          </h1>
        </div>

        {/* Metrics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
        >
          {filteredMetrics.map(({ title, value, icon, change }) => (
            <motion.div
              key={title}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <MetricCard title={title} value={value} icon={icon} change={change} />
            </motion.div>
          ))}
        </motion.div>

        <Charts isLoading={isLoading} />

        {/* Data Table with filter inside */}
        <ChartCard title="Users">
          <DataTable
            columns={tableColumns}
            data={filteredTableData}
            isLoading={isLoading}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </ChartCard>
      </main>
    </div>
  );
}
