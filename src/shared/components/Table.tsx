import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

function Table<T>({ columns, data, keyExtractor, isLoading, emptyState, className = '' }: TableProps<T>) {
  if (isLoading) {
    return (
      <div className={`bg-white rounded-xl border border-tb-gray-100 ${className}`}>
        <div className="p-12 text-center text-tb-gray-400">Loading...</div>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={`bg-white rounded-xl border border-tb-gray-100 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-tb-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold text-tb-gray-500 uppercase tracking-wider ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-tb-gray-100">
            {data.map((item, index) => (
              <tr key={keyExtractor(item)} className="hover:bg-tb-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-sm text-tb-gray-700 ${col.className || ''}`}>
                    {col.render(item, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
