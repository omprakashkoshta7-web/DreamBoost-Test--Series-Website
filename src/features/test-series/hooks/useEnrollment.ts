import { useState, useCallback, useEffect, useRef } from 'react';
import { enrollTest, fetchMyEnrollments } from '../services/api';
import { useToast } from '@shared/components/ToastProvider';
import { useNavigate } from 'react-router-dom';

export const useEnrollment = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [enrollingTest, setEnrollingTest] = useState<any | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const enrollingTestRef = useRef<any | null>(null);

  useEffect(() => {
    enrollingTestRef.current = enrollingTest;
  }, [enrollingTest]);

  useEffect(() => {
    fetchMyEnrollments().then(setEnrolledIds).catch(() => {});
  }, []);

  const handleEnrollClick = useCallback((test: any) => {
    if (test) setEnrollingTest(test);
  }, []);

  const handleEnrollConfirm = useCallback(async () => {
    const test = enrollingTestRef.current;
    if (!test) return;
    setEnrolling(true);
    try {
      await enrollTest(test._id);
      setEnrolledIds(prev => [...prev, test._id]);
      const testName = test.name;
      const testId = test._id;
      setEnrollingTest(null);
      showToast(`Successfully enrolled in "${testName}"!`, 'success');
      setTimeout(() => navigate(`/app/test-instructions/${testId}`), 1200);
    } catch (error: any) {
      showToast(error?.response?.data?.message || 'Failed to enroll. Please try again.', 'error');
    }
    setEnrolling(false);
  }, [navigate, showToast]);

  const closeEnrollModal = useCallback(() => {
    setEnrollingTest(null);
  }, []);

  return { enrolledIds, enrollingTest, enrolling, handleEnrollClick, handleEnrollConfirm, closeEnrollModal };
};
