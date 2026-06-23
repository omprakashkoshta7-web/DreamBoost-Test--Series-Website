import React, { useState, useEffect } from 'react';
import SEO from '@shared/components/SEO';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfile, changePassword } from '@features/profile/store/profile.thunks';
import { selectProfile } from '@features/profile/store/profile.selectors';
import apiClient from '@shared/utils/apiClient';
import { Check, X } from '@shared/icons';
import { PageHeader } from '@shared/components';
import ProfileSection from '../components/ProfileSection';
import SecuritySection from '../components/SecuritySection';
import NotificationSettings from '../components/NotificationSettings';
import AppearanceSettings from '../components/AppearanceSettings';
import DangerZone from '../components/DangerZone';
import ChangePasswordModal from '../components/ChangePasswordModal';
import SettingsToast from '@features/settings/components/SettingsToast';
import { useSettings } from '../hooks';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);
  const { settings, updateSettings, refresh } = useSettings();

  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', bio: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true, testReminders: true, leaderboardUpdates: false,
    promotionalEmails: false, resultNotifications: true, achievementAlerts: true, systemUpdates: true,
  });
  const [appearance, setAppearance] = useState({ theme: 'light' as 'light', fontSize: 'medium' as 'small' | 'medium' | 'large', compactMode: false });
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (profile) setProfileForm({ name: profile.name || '', email: profile.email || '', phone: profile.phone || '', bio: profile.bio || '' });
  }, [profile]);

  useEffect(() => {
    if (settings.notificationPreferences) setNotifications(settings.notificationPreferences);
    if (settings.appearanceSettings) setAppearance({ ...settings.appearanceSettings, theme: 'light' });
  }, [settings]);

  const showMsg = (type: 'success' | 'error', text: string) => { setMessage({ type, text }); setTimeout(() => setMessage(null), 3000); };

  const handleSaveProfile = async () => {
    setSaving({ profile: true });
    const result = await dispatch(updateProfile(profileForm));
    setSaving({ profile: false });
    showMsg(updateProfile.fulfilled.match(result) ? 'success' : 'error', updateProfile.fulfilled.match(result) ? 'Profile updated successfully' : (result.payload as string));
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { showMsg('error', 'Passwords do not match'); return; }
    setSaving({ password: true });
    const result = await dispatch(changePassword({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }));
    setSaving({ password: false });
    if (changePassword.fulfilled.match(result)) { setShowPasswordModal(false); setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); showMsg('success', 'Password changed successfully'); }
    else showMsg('error', result.payload as string);
  };

  const handleSaveNotifications = async () => {
    setSaving({ notifications: true });
    try { await updateSettings({ notificationPreferences: notifications }); showMsg('success', 'Notification preferences updated'); }
    catch (err: any) { showMsg('error', err.response?.data?.message || 'Failed to update'); }
    setSaving({ notifications: false });
  };

  const handleSaveAppearance = async () => {
    setSaving({ appearance: true });
    try { await updateSettings({ appearanceSettings: appearance }); showMsg('success', 'Appearance settings updated'); }
    catch (err: any) { showMsg('error', err.response?.data?.message || 'Failed to update'); }
    setSaving({ appearance: false });
  };

  const handleLogoutAll = async () => {
    try { await apiClient.post('/settings/logout-all'); showMsg('success', 'Logged out from all other sessions'); }
    catch { showMsg('error', 'Failed to logout sessions'); }
  };

  return (
    <div className="space-y-6">
      <SEO title="Settings" noIndex />
      <PageHeader title="Settings" />

      <SettingsToast message={message} />

      <ProfileSection form={profileForm} onChange={setProfileForm} saving={!!saving.profile} onSave={handleSaveProfile} />
      <SecuritySection onChangePassword={() => setShowPasswordModal(true)} onLogoutAll={handleLogoutAll} />
      <NotificationSettings settings={notifications} onChange={(key, val) => setNotifications({ ...notifications, [key]: val })} saving={!!saving.notifications} onSave={handleSaveNotifications} />
      <AppearanceSettings appearance={appearance} onChange={setAppearance} saving={!!saving.appearance} onSave={handleSaveAppearance} />
      <DangerZone />
      <ChangePasswordModal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} form={passwordForm} onChange={setPasswordForm} saving={!!saving.password} onSubmit={handleChangePassword} />
    </div>
  );
};

export default SettingsPage;
