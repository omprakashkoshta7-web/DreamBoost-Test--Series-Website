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

const TestSeriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tests, categories: hookCategories, loading } = useTestSeries();
  const { enrolledIds, enrollingTest, enrolling, handleEnrollClick, handleEnrollConfirm, closeEnrollModal } = useEnrollment();
  const completedCategories = useAppSelector(selectCompletedCategories);
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(() => Date.now());

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

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader size="lg" label="Loading tests..." /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <HeroSection />
      <SearchFilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} resultCount={filteredTests.length} />
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTests.map((test: any) => (
            <TestCard key={test._id} test={test} completedCategories={completedCategories} isEnrolled={enrolledIds.includes(test._id)} currentTime={currentTime} onEnroll={handleEnrollClick} />
          ))}
        </div>
      ) : (
        <TestEmptyState />
      )}
      <ProTipCard />

      {enrollingTest && (
        <EnrollModal test={enrollingTest} onClose={closeEnrollModal} onConfirm={handleEnrollConfirm} loading={enrolling} />
      )}
    </div>
  );
};

export default TestSeriesPage;
