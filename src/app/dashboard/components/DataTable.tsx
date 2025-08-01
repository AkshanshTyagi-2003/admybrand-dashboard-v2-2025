'use client';

import React, { useState, useMemo, useEffect } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Skeleton from "./Skeleton";
import DateRangeFilter from "./DateRangeFilter";

interface DataTableProps {
  columns: string[];
  data: { [key: string]: any }[];
  isLoading?: boolean;
  dateRange: { fromDate: string; toDate: string };
  setDateRange: React.Dispatch<React.SetStateAction<{ fromDate: string; toDate: string }>>;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  isLoading = false,
  dateRange,
  setDateRange,
}) => {
  const [sortConfig, setSortConfig] = useState<null | { key: string; direction: "ascending" | "descending" }>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lower = searchQuery.toLowerCase();
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(lower) ||
        item.email?.toLowerCase().includes(lower)
    );
  }, [data, searchQuery]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "ascending" ? aVal - bVal : bVal - aVal;
      }
      return String(aVal).localeCompare(String(bVal)) * (sortConfig.direction === "ascending" ? 1 : -1);
    });
    return sorted;
  }, [filteredData, sortConfig]);

  const handlePDFExport = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.charAt(0).toUpperCase() + col.slice(1));
    const tableRows = sortedData.map((row) => columns.map((col) => row[col]));
    doc.text("Data Table Export", 14, 15);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [40, 116, 166] },
      startY: 20,
    });
    doc.save("datatable_export.pdf");
  };

  if (!isClient) return null;

  return (
    <div>
      {/* Date Filter inside table card, above search */}
      <DateRangeFilter onChange={setDateRange} />

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => !isLoading && setSortConfig((prev) => ({
                    key: col,
                    direction: prev?.key === col && prev.direction === "ascending" ? "descending" : "ascending"
                  }))}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-100"
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {columns.map((_, j) => (
                    <td key={j} className="px-6 py-4"><Skeleton className="h-4 w-full" /></td>
                  ))}
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">No results found.</td></tr>
            ) : (
              sortedData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  {columns.map((col) => (
                    <td key={col} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3 mt-4">
        <CSVLink
          headers={columns.map((col) => ({ label: col, key: col }))}
          data={sortedData}
          filename="datatable_export.csv"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export CSV
        </CSVLink>
        <button
          onClick={handlePDFExport}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default DataTable;
