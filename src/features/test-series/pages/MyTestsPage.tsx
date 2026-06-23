import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@shared/utils/apiClient';
import { Loader } from '@shared/components';
import MyTestCard from '@features/test-series/components/MyTestCard';
import MyTestsEmptyState from '@features/test-series/components/MyTestsEmptyState';
import MyTestsHeader from '@features/test-series/components/MyTestsHeader';
import SEO from '@shared/components/SEO';

const MyTestsPage: React.FC = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiClient.get('/tests/my');
        setTests(res.data.data.tests || []);
      } catch { /* ignore */ }
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader size="lg" /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <SEO title="My Tests" noIndex />
      <MyTestsHeader onBack={() => navigate(-1)} testCount={tests.length} />

      {tests.length === 0 ? (
        <MyTestsEmptyState onBrowseSeries={() => navigate('/app/test-series')} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test: any) => (
            <MyTestCard key={test._id} test={test} currentTime={currentTime} onNavigate={(id: string) => navigate(`/app/test-instructions/${id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTestsPage;
