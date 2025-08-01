'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, isLoading = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter by search query (name or email)
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    const lower = searchQuery.toLowerCase();
    return users.filter(
      (u) => u.name.toLowerCase().includes(lower) || u.email.toLowerCase().includes(lower)
    );
  }, [users, searchQuery]);

  // Sort filtered data
  const sortedUsers = useMemo(() => {
    if (!sortConfig) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'ascending' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  const csvHeaders = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
  ];

  const handlePDFExport = () => {
    setExportingPDF(true);

    const doc = new jsPDF();
    doc.text('User List', 14, 15);

    const tableColumn = ['ID', 'Name', 'Email', 'Phone'];
    const tableRows = sortedUsers.map((user) => [user.id, user.name, user.email, user.phone]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [220, 53, 69] }, // Bootstrap danger red
      startY: 20,
    });

    doc.save('users.pdf');
    setExportingPDF(false);
  };

  if (!isClient) return null;

  return (
    <div>
      {/* Search input */}
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
          <thead className="bg-gray-50 cursor-pointer select-none">
            <tr>
              {['id', 'name', 'email', 'phone'].map((col) => (
                <th
                  key={col}
                  onClick={() => !isLoading && requestSort(col as keyof User)}
                  className={`px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-100 transition-colors ${
                    isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    <span className="text-xs">{getSortIndicator(col as keyof User)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {['id', 'name', 'email', 'phone'].map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            ) : (
              sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-3 mt-4">
        <CSVLink
          headers={csvHeaders}
          data={sortedUsers}
          filename="users_export.csv"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Export CSV
        </CSVLink>

        <button
          onClick={handlePDFExport}
          disabled={exportingPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
        >
          {exportingPDF ? 'Exporting PDF...' : 'Export PDF'}
        </button>
      </div>
    </div>
  );
};

export default UsersTable;
