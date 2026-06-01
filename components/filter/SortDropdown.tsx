'use client';

import React from 'react';
import { Select } from 'antd';

export interface SortDropdownProps {
  value: string;
  onChange: (value: any) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sort By:</span>
      <Select
        value={value}
        onChange={onChange}
        className="w-48"
        defaultValue="createdAt"
      >
        <Select.Option value="createdAt">Newest Additions</Select.Option>
        <Select.Option value="price_low_high">Price: Low to High</Select.Option>
        <Select.Option value="price_high_low">Price: High to Low</Select.Option>
        <Select.Option value="rating">Safety Rating</Select.Option>
      </Select>
    </div>
  );
}
