import { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { profileSetup } from '../store/auth.thunks';
import { selectProfileSetupLoading, selectProfileSetupError } from '../store/auth.selectors';

interface ProfileData {
  name: string;
  phone: string;
  city: string;
  state: string;
  targetExam: string;
  education: string;
}

const initialProfile: ProfileData = {
  name: '', phone: '', city: '', state: '', targetExam: '', education: '',
};

export const useProfileSetup = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProfileSetupLoading);
  const error = useAppSelector(selectProfileSetupError);

  const [profile, setProfileState] = useState<ProfileData>(initialProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = useCallback((field: keyof ProfileData, value: string) => {
    setProfileState(prev => ({ ...prev, [field]: value }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    if (!profile.name.trim()) newErrors.name = 'Name is required';
    if (!profile.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(profile.phone.replace(/\s/g, ''))) newErrors.phone = 'Enter valid 10-digit number';
    if (!profile.targetExam) newErrors.targetExam = 'Select your target exam';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [profile]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return false;
    const result = await dispatch(profileSetup({
      phone: profile.phone, city: profile.city, state: profile.state,
      targetExam: profile.targetExam, education: profile.education,
    }));
    return profileSetup.fulfilled.match(result);
  }, [dispatch, profile, validate]);

  const resetForm = useCallback(() => {
    setProfileState(initialProfile);
    setErrors({});
  }, []);

  return {
    profile, loading, error, errors,
    setField, handleSubmit, resetForm,
  };
};
