'use client';

import React, { useState } from "react";

interface DateRange {
  fromDate: string;
  toDate: string;
}

interface Props {
  onChange: (range: DateRange) => void;
}

const DateRangeFilter: React.FC<Props> = ({ onChange }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFrom = e.target.value;
    setFromDate(newFrom);
    onChange({ fromDate: newFrom, toDate });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTo = e.target.value;
    setToDate(newTo);
    onChange({ fromDate, toDate: newTo });
  };

  return (
    <div className="flex items-center gap-6 mb-6">
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          From:
        </label>
        <input
          type="date"
          value={fromDate}
          onChange={handleFromChange}
          className="px-3 py-1 border rounded"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          To:
        </label>
        <input
          type="date"
          value={toDate}
          onChange={handleToChange}
          className="px-3 py-1 border rounded"
        />
      </div>
    </div>
  );
};

export default DateRangeFilter;
