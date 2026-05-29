import React from 'react';
import { Users, TrendingUp, TrendingDown, Minus, Crown, Medal } from '@shared/icons';
import { Card, Badge, SearchBar, Table, EmptyState, Pagination } from '@shared/components';

interface RankingsTableProps {
  entries: any[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-amber-500" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />;
  return <span className="text-sm font-bold text-tb-gray-500">#{rank}</span>;
};

const getChangeIcon = (change: string) => {
  if (change === 'up') return <TrendingUp className="w-4 h-4 text-tb-green" />;
  if (change === 'down') return <TrendingDown className="w-4 h-4 text-tb-red" />;
  return <Minus className="w-4 h-4 text-tb-gray-400" />;
};

const RankingsTable: React.FC<RankingsTableProps> = ({ entries, searchQuery, onSearchChange, page, totalPages, onPageChange }) => {
  const safeEntries = entries.filter(Boolean);
  const filtered = safeEntries.filter(e =>
    String(e.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.exam || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: 'rank',
      header: 'Rank',
      render: (entry: any) => (
        <div className="flex items-center gap-2">
          {getRankIcon(entry.rank)}
          {getChangeIcon(entry.change || 'same')}
        </div>
      ),
    },
    {
      key: 'student',
      header: 'Student',
      render: (entry: any) => {
        const name = String(entry.name || 'Student');
        const avatar = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tb-blue to-blue-700 flex items-center justify-center text-sm font-bold text-white">{avatar}</div>
            <div>
              <span className="font-medium text-tb-navy">{name}</span>
              <p className="text-xs text-tb-gray-500 md:hidden">{entry.exam || 'General'}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'exam',
      header: 'Exam',
      className: 'hidden md:table-cell text-center',
      render: (entry: any) => <Badge variant="primary">{entry.exam || 'General'}</Badge>,
    },
    {
      key: 'tests',
      header: 'Tests',
      className: 'hidden sm:table-cell text-center',
      render: (entry: any) => <span className="text-sm text-tb-gray-600">{entry.testsCompleted ?? 0}</span>,
    },
    {
      key: 'accuracy',
      header: 'Accuracy',
      className: 'hidden lg:table-cell text-center',
      render: (entry: any) => {
        const avgScore = entry.avgScore ?? 0;
        return (
          <span className={`text-sm font-semibold ${avgScore >= 80 ? 'text-tb-green' : avgScore >= 60 ? 'text-tb-orange' : 'text-tb-red'}`}>{avgScore}%</span>
        );
      },
    },
    {
      key: 'points',
      header: 'Points',
      className: 'text-right',
      render: (entry: any) => <span className="font-bold text-tb-navy">{entry.totalScore ?? 0}</span>,
    },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="p-5 border-b border-tb-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-tb-blue" /></div>
            <div><h3 className="text-base font-bold text-tb-navy">Full Rankings</h3><p className="text-xs text-tb-gray-500">{filtered.length} students</p></div>
          </div>
          <SearchBar value={searchQuery} onChange={onSearchChange} placeholder="Search by name..." />
        </div>
      </div>

      <Table
        columns={columns}
        data={filtered}
        keyExtractor={(entry: any) => `${entry.rank}-${entry.name}`}
        emptyState={<EmptyState icon={<Users className="w-12 h-12 text-tb-gray-300" />} title="No students found" />}
        className="border-0 rounded-none bg-transparent shadow-none"
      />

      {page !== undefined && totalPages !== undefined && onPageChange && (
        <div className="p-5 border-t border-tb-gray-100">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </Card>
  );
};

export default RankingsTable;
