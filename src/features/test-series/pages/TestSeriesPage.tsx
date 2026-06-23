import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchCompletedCategories } from '../store/test.thunks';
import { selectCompletedCategories } from '../store/test.selectors';
import { useTestSeries, useEnrollment } from '../hooks';
import { Loader } from '@shared/components';
import HeroSection from '../components/HeroSection';
import SearchFilterBar from '../components/SearchFilterBar';
import TestCard from '../components/TestCard';
import TestEmptyState from '../components/TestEmptyState';
import ProTipCard from '../components/ProTipCard';
import EnrollModal from '../components/EnrollModal';
import SEO from '@shared/components/SEO';

const TestSeriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tests, categories: hookCategories, loading, pagination } = useTestSeries();
  const { enrolledIds, enrollingTest, enrolling, handleEnrollClick, handleEnrollConfirm, closeEnrollModal } = useEnrollment();
  const completedCategories = useAppSelector(selectCompletedCategories);
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [displayLimit, setDisplayLimit] = useState(50);

  useEffect(() => { dispatch(fetchCompletedCategories()); }, [dispatch]);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (urlCategory !== 'All') setSelectedCategory(urlCategory);
  }, [urlCategory]);

  const categories = ['All', ...hookCategories];
  const filteredTests = tests.filter((test: any) => {
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      test.name.toLowerCase().includes(q) ||
      test.category?.toLowerCase().includes(q) ||
      test.subject?.toLowerCase().includes(q) ||
      test.description?.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const visibleTests = filteredTests.slice(0, displayLimit);
  const hasMoreVisible = displayLimit < filteredTests.length;

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading tests..." /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <SEO title="Test Series" noIndex />
      <HeroSection />
      <SearchFilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} resultCount={filteredTests.length} />
      {visibleTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleTests.map((test: any) => (
            <TestCard key={test._id} test={test} completedCategories={completedCategories} isEnrolled={enrolledIds.includes(test._id)} currentTime={currentTime} onEnroll={handleEnrollClick} />
          ))}
        </div>
      ) : (
        <TestEmptyState />
      )}
      {hasMoreVisible && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setDisplayLimit(prev => prev + 50)}
            className="px-6 py-2.5 bg-tb-blue text-white text-sm font-medium rounded-lg hover:bg-tb-blue-dark transition-colors"
          >
            Load More ({filteredTests.length - visibleTests.length} remaining)
          </button>
        </div>
      )}
      <ProTipCard />

      {enrollingTest && (
        <EnrollModal test={enrollingTest} onClose={closeEnrollModal} onConfirm={handleEnrollConfirm} loading={enrolling} />
      )}
    </div>
  );
};

export default TestSeriesPage;
