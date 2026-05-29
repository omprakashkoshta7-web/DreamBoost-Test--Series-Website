import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Badge, Input, Loader, PageHeader } from '@shared/components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getPurchases, getAchievements, getCertificates } from '../store/profile.thunks';
import { selectProfileStats, selectProfilePerformanceHistory, selectProfileCertificates, selectProfilePurchases, selectProfileAchievements } from '../store/profile.selectors';
import { User, Mail, MapPin, Calendar, Edit, BookOpen, TrendingUp, Flame, Trophy, Award, Shield, Bell, Download, Trash2, Lock, Camera, Check, CreditCard, FileText, Settings as SettingsIcon } from '@shared/icons';
import { useProfile, useProfileForm } from '../hooks/useProfile';
import ProfileTabs from '@features/profile/components/ProfileTabs';
import ProfileHeaderCard from '@features/profile/components/ProfileHeaderCard';
import ProfileStatsGrid from '@features/profile/components/ProfileStatsGrid';
import AchievementsGrid from '@features/profile/components/AchievementsGrid';
import PurchasesHistoryTable from '@features/profile/components/PurchasesHistoryTable';
import DangerZoneCard from '@features/profile/components/DangerZoneCard';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, updateProfile, refresh } = useProfile();
  const { formData: editForm, initForm, setField } = useProfileForm();
  const stats = useAppSelector(selectProfileStats);
  const performanceHistory = useAppSelector(selectProfilePerformanceHistory);
  const certificates = useAppSelector(selectProfileCertificates);
  const purchases = useAppSelector(selectProfilePurchases);
  const achievements = useAppSelector(selectProfileAchievements);

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'certificates' | 'history' | 'settings'>('overview');

  useEffect(() => {
    refresh();
    dispatch(getPurchases());
    dispatch(getAchievements());
    dispatch(getCertificates());
  }, [dispatch, refresh]);

  useEffect(() => {
    if (profile) {
      initForm();
    }
  }, [profile, initForm]);

  const handleSaveProfile = async () => {
    await updateProfile(editForm);
    setIsEditing(false);
    refresh();
  };

  const setEditForm = useCallback((value: Record<string, string>) => {
    Object.entries(value).forEach(([k, v]) => setField(k, v));
  }, [setField]);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: User },
    { key: 'purchases', label: 'Purchases', icon: CreditCard },
    { key: 'certificates', label: 'Certificates', icon: FileText },
    { key: 'history', label: 'History', icon: TrendingUp },
    { key: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  if (loading && !profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" label="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" />

      <ProfileTabs tabs={tabs} activeTab={activeTab} onTabChange={(key) => setActiveTab(key as any)} />

      {activeTab === 'overview' && (
        <>
          <ProfileHeaderCard profile={profile} isEditing={isEditing} editForm={editForm as any} setIsEditing={setIsEditing} setEditForm={setEditForm} handleSaveProfile={handleSaveProfile} />
          <ProfileStatsGrid stats={stats} />
          <AchievementsGrid achievements={achievements} />
        </>
      )}

      {activeTab === 'purchases' && (
        <PurchasesHistoryTable purchases={purchases} />
      )}

      {activeTab === 'certificates' && (
        <Card title="My Certificates">
          <div className="space-y-3 mt-4">
            {certificates.map(c => (<div key={c.id} className="flex items-center justify-between p-4 border border-tb-gray-200 rounded-xl hover:bg-tb-gray-50"><div><h4 className="text-sm font-semibold text-tb-navy">{c.title}</h4><p className="text-xs text-tb-gray-500 mt-1">{new Date(c.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Score: {c.score}</p></div><Button variant="secondary" size="sm"><Download className="w-4 h-4" /> Download</Button></div>))}
            {certificates.length === 0 && <p className="text-center text-tb-gray-500 py-8">No certificates yet. Complete tests to earn certificates!</p>}
          </div>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card title="Performance History">
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead><tr className="border-b border-tb-gray-200"><th className="px-4 py-3 text-left text-xs font-semibold text-tb-gray-500 uppercase">Test</th><th className="px-4 py-3 text-left text-xs font-semibold text-tb-gray-500 uppercase hidden sm:table-cell">Date</th><th className="px-4 py-3 text-center text-xs font-semibold text-tb-gray-500 uppercase">Score</th><th className="px-4 py-3 text-right text-xs font-semibold text-tb-gray-500 uppercase">Rank</th></tr></thead>
              <tbody>{performanceHistory.map((p, i) => (<tr key={i} className="border-b border-tb-gray-100 hover:bg-tb-gray-50"><td className="px-4 py-4 text-sm font-medium text-tb-navy">{p.test}</td><td className="px-4 py-4 text-sm text-tb-gray-500 hidden sm:table-cell">{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td><td className="px-4 py-4 text-center"><span className={`text-sm font-bold ${p.score >= 80 ? 'text-tb-green' : p.score >= 60 ? 'text-tb-orange' : 'text-tb-red'}`}>{p.score}%</span></td><td className="px-4 py-4 text-right text-sm font-semibold text-tb-navy">{p.rank}</td></tr>))}</tbody>
            </table>
          </div>
          {performanceHistory.length === 0 && <p className="text-center text-tb-gray-500 py-8">No test history yet.</p>}
        </Card>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-4">
          <Card title="Account Settings">
            <div className="space-y-1 mt-4">
              {[{ icon: <Shield className="w-5 h-5 text-tb-gray-400" />, title: 'Two-Factor Authentication', desc: 'Add extra security', action: <Badge variant="warning">Disabled</Badge> }, { icon: <Bell className="w-5 h-5 text-tb-gray-400" />, title: 'Email Notifications', desc: 'Receive updates', action: <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-tb-gray-300 text-tb-blue" /> }, { icon: <Download className="w-5 h-5 text-tb-gray-400" />, title: 'Download Data', desc: 'Export your data', action: <Button variant="secondary" size="sm">Download</Button> }].map((s, i) => (<div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-tb-gray-50">{s.icon}<div className="flex-1 ml-4"><h4 className="font-medium text-sm text-tb-navy">{s.title}</h4><p className="text-xs text-tb-gray-500">{s.desc}</p></div>{s.action}</div>))}
            </div>
          </Card>
          <DangerZoneCard />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
