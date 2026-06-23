import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExam } from '../hooks';
import { Loader, Badge } from '@shared/components';
import SEO from '@shared/components/SEO';
import { ArrowLeft, Search, Zap, Layers, BookOpen, Star, TrendingUp, Clock, Filter, Sliders, ChevronDown } from '@shared/icons';

type TabKey = 'full' | 'subject' | 'chapter';
type SortOption = 'newest' | 'most_attempted' | 'highest_score' | 'easy_hard';

const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: 'full', label: 'Full Length', icon: Zap },
  { key: 'subject', label: 'Subject', icon: Layers },
  { key: 'chapter', label: 'Chapter', icon: BookOpen },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'most_attempted', label: 'Most Attempted' },
  { value: 'highest_score', label: 'Highest Score' },
  { value: 'easy_hard', label: 'Easy → Hard' },
];

const DIFFICULTY_ORDER: Record<string, number> = { easy: 1, medium: 2, hard: 3 };

const TestSeriesPage: React.FC = () => {
  const { examSlug } = useParams<{ examSlug: string }>();
  const navigate = useNavigate();
  const { currentExam, loading, selectExam } = useExam();

  const [activeTab, setActiveTab] = useState<TabKey>('full');
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);

  useEffect(() => {
    if (examSlug) selectExam(examSlug);
  }, [selectExam, examSlug]);

  useEffect(() => {
    setSelectedSubject('');
    setSelectedChapter('');
  }, [activeTab]);

  const tests = useMemo(() => (currentExam?.tests || []), [currentExam]);

  const grouped = useMemo(() => {
    const full = tests.filter((t: any) => t.testType === 'full');
    const subject = tests.filter((t: any) => t.testType === 'subject');
    const chapter = tests.filter((t: any) => t.testType === 'chapter');
    return { full, subject, chapter };
  }, [tests]);

  const subjects = useMemo(() => {
    const all = activeTab === 'subject' ? grouped.subject : grouped.chapter;
    return [...new Set(all.map((t: any) => t.subject).filter(Boolean))];
  }, [activeTab, grouped]);

  const chapters = useMemo(() => {
    if (!selectedSubject) return [];
    const pool = grouped.chapter.filter((t: any) => t.subject === selectedSubject);
    return [...new Set(pool.map((t: any) => t.chapter).filter(Boolean))];
  }, [selectedSubject, grouped.chapter]);

  const filteredTests = useMemo(() => {
    let pool: any[];
    if (activeTab === 'full') pool = grouped.full;
    else if (activeTab === 'subject') {
      pool = selectedSubject ? grouped.subject.filter((t: any) => t.subject === selectedSubject) : grouped.subject;
    } else {
      if (selectedSubject && selectedChapter) {
        pool = grouped.chapter.filter((t: any) => t.subject === selectedSubject && t.chapter === selectedChapter);
      } else if (selectedSubject) {
        pool = grouped.chapter.filter((t: any) => t.subject === selectedSubject);
      } else {
        pool = grouped.chapter;
      }
    }

    let result = [...pool];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t: any) => t.name?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q) || t.subject?.toLowerCase().includes(q));
    }
    if (difficultyFilter) {
      result = result.filter((t: any) => t.difficulty === difficultyFilter);
    }
    if (sortBy === 'newest') result.sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    else if (sortBy === 'most_attempted') result.sort((a: any, b: any) => (b.attemptedCount || 0) - (a.attemptedCount || 0));
    else if (sortBy === 'highest_score') result.sort((a: any, b: any) => (b.avgScore || 0) - (a.avgScore || 0));
    else if (sortBy === 'easy_hard') result.sort((a: any, b: any) => (DIFFICULTY_ORDER[a.difficulty] || 2) - (DIFFICULTY_ORDER[b.difficulty] || 2));

    return result;
  }, [activeTab, grouped, selectedSubject, selectedChapter, search, difficultyFilter, sortBy]);

  const getBadge = (test: any) => {
    if (!test.isActive) return null;
    if (test.badge?.text) return { text: test.badge.text, color: test.badge.color || 'bg-blue-500' };
    if (test.isPremium === false) return { text: 'FREE', color: 'bg-green-500' };
    if (test.attemptedCount > 1000) return { text: 'TRENDING', color: 'bg-orange-500' };
    return null;
  };

  if (loading || !currentExam) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading..." /></div>;
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <SEO title="Test Series" description="Browse and practice with DreamBoost test series for competitive exams." />
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-tb-navy dark:text-white">{currentExam.name}</h1>
          <p className="text-sm text-gray-500">{tests.length} tests available</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tests..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tb-blue" />
        </div>

        {/* Difficulty Filter */}
        <div className="relative">
          <button onClick={() => { setShowDifficultyMenu(!showDifficultyMenu); setShowSortMenu(false); }}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" /> {difficultyFilter || 'Difficulty'}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {showDifficultyMenu && (
            <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
              {['', 'easy', 'medium', 'hard'].map((d) => (
                <button key={d} onClick={() => { setDifficultyFilter(d); setShowDifficultyMenu(false); }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${difficultyFilter === d ? 'text-tb-blue font-medium' : 'text-gray-700'}`}>
                  {d ? d.charAt(0).toUpperCase() + d.slice(1) : 'All'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button onClick={() => { setShowSortMenu(!showSortMenu); setShowDifficultyMenu(false); }}
            className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Sliders className="w-4 h-4" /> {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {showSortMenu && (
            <div className="absolute top-full mt-1 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
              {SORT_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                  className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${sortBy === opt.value ? 'text-tb-blue font-medium' : 'text-gray-700'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const count = grouped[tab.key].length;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key ? 'bg-white text-tb-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="text-xs ml-1">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Subject Chips (Subject tab) */}
      {activeTab === 'subject' && subjects.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setSelectedSubject('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              !selectedSubject ? 'bg-tb-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>All</button>
          {subjects.map((s: string) => (
            <button key={s} onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedSubject === s ? 'bg-tb-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>{s}</button>
          ))}
        </div>
      )}

      {/* Subject + Chapter Select (Chapter tab) */}
      {activeTab === 'chapter' && (
        <div className="flex flex-wrap gap-3">
          <select value={selectedSubject} onChange={(e) => { setSelectedSubject(e.target.value); setSelectedChapter(''); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-tb-blue">
            <option value="">Select Subject</option>
            {subjects.map((s: string) => <option key={s} value={s}>{s}</option>)}
          </select>
          {selectedSubject && chapters.length > 0 && (
            <select value={selectedChapter} onChange={(e) => setSelectedChapter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-tb-blue">
              <option value="">Select Chapter</option>
              {chapters.map((c: string) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-gray-500">{filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''} found</p>

      {/* Test Cards */}
      {filteredTests.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No tests found</p>
          <p className="text-sm">Try changing filters or select a different subject/chapter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTests.map((test: any) => {
            const badge = getBadge(test);
            return (
              <div key={test._id || test.id} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-tb-blue/30 transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-tb-navy dark:text-white truncate">{test.name}</h3>
                    {activeTab !== 'full' && test.subject && (
                      <p className="text-xs text-gray-500 mt-0.5">{test.subject}{test.chapter ? ` — ${test.chapter}` : ''}</p>
                    )}
                  </div>
                  {badge && (
                    <Badge text={badge.text} color={badge.color} size="sm" className="ml-2 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{test.duration} min</span>
                  <span>{test.totalQuestions || test.questionCount || 0} Q</span>
                  <span>{test.totalMarks || 0} marks</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    test.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    test.difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{test.difficulty || 'medium'}</span>
                </div>

                {(test.attemptedCount > 0 || test.avgScore > 0) && (
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    {test.attemptedCount > 0 && <span>🔥 {(test.attemptedCount / 1000).toFixed(1)}K attempts</span>}
                    {test.avgScore > 0 && <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-yellow-500" />{test.avgScore.toFixed(1)}</span>}
                  </div>
                )}

                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                  <button onClick={() => navigate(`/app/test-instructions/${test._id || test.id}`)}
                    className="flex-1 px-3 py-2 bg-tb-blue text-white text-sm font-medium rounded-lg hover:bg-tb-blue-dark transition-colors">
                    Start Test
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TestSeriesPage;
