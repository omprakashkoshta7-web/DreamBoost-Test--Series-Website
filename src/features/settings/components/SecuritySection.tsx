import React from 'react';
import { Card, Button } from '@shared/components';
import { Lock, Shield, LogOut } from '@shared/icons';

interface SecuritySectionProps {
  onChangePassword: () => void;
  onLogoutAll: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ onChangePassword, onLogoutAll }) => (
  <Card title="Security">
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between p-4 rounded-xl border border-tb-gray-200">
        <div className="flex items-center gap-3"><Lock className="w-5 h-5 text-tb-gray-400" /><div><h4 className="font-medium text-sm text-tb-navy">Password</h4><p className="text-xs text-tb-gray-500">Change your password</p></div></div>
        <Button variant="secondary" size="sm" onClick={onChangePassword}>Change</Button>
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl border border-tb-gray-200">
        <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-tb-gray-400" /><div><h4 className="font-medium text-sm text-tb-navy">Two-Factor Authentication</h4><p className="text-xs text-tb-gray-500">Add extra security layer</p></div></div>
        <span className="text-xs text-tb-orange font-semibold">Coming Soon</span>
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl border border-tb-gray-200">
        <div className="flex items-center gap-3"><LogOut className="w-5 h-5 text-tb-gray-400" /><div><h4 className="font-medium text-sm text-tb-navy">Active Sessions</h4><p className="text-xs text-tb-gray-500">Logout from all other devices</p></div></div>
        <Button variant="secondary" size="sm" onClick={onLogoutAll}>Logout All</Button>
      </div>
    </div>
  </Card>
);

export default SecuritySection;
