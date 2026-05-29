import { useState, useCallback, useEffect } from 'react';
import { fetchSettings as fetchSettingsApi, updateSettings as updateSettingsApi } from '../services/api';

export const useSettings = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSettingsApi();
      setSettings(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (data: Record<string, any>) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateSettingsApi(data);
      setSettings(updated);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { settings, loading, error, updateSettings, refresh };
};
