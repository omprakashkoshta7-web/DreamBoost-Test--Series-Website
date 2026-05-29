import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectProfile, selectProfileLoading, selectProfileError } from '../store/profile.selectors';
import { fetchProfile, updateProfile as updateProfileThunk } from '../store/profile.thunks';

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const loading = useAppSelector(selectProfileLoading);
  const error = useAppSelector(selectProfileError);

  const update = useCallback(
    (data: { name?: string; email?: string; bio?: string; phone?: string; location?: string; city?: string; state?: string; targetExam?: string; education?: string; class?: string }) =>
      dispatch(updateProfileThunk(data)),
    [dispatch]
  );

  const refresh = useCallback(() => dispatch(fetchProfile()), [dispatch]);

  return { profile, loading, error, updateProfile: update, refresh };
};

export const useProfileForm = () => {
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [dirty, setDirty] = useState(false);

  const initForm = useCallback(() => {
    if (profile) {
      const { name, email, bio, phone, location, city, state, targetExam, education } = profile as any;
      setFormData({ name: name || '', email: email || '', bio: bio || '', phone: phone || '', location: location || '', city: city || '', state: state || '', targetExam: targetExam || '', education: education || '' });
      setDirty(false);
    }
  }, [profile]);

  const setField = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  }, []);

  const submit = useCallback(async () => {
    if (dirty) {
      await updateProfile(formData as any);
      setDirty(false);
    }
  }, [dirty, updateProfile, formData]);

  const reset = useCallback(() => {
    initForm();
  }, [initForm]);

  return { formData, dirty, setField, submit, reset, initForm };
};
