import React from 'react';
import { Modal, Input, Button } from '@shared/components';
import { Lock } from '@shared/icons';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: { currentPassword: string; newPassword: string; confirmPassword: string };
  onChange: (f: any) => void;
  saving: boolean;
  onSubmit: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, form, onChange, saving, onSubmit }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Change Password" size="md">
    <div className="space-y-4">
      <Input label="Current Password" type="password" value={form.currentPassword}
        onChange={(e) => onChange({ ...form, currentPassword: e.target.value })} icon={<Lock className="w-4 h-4" />} />
      <Input label="New Password" type="password" value={form.newPassword}
        onChange={(e) => onChange({ ...form, newPassword: e.target.value })} icon={<Lock className="w-4 h-4" />} />
      <Input label="Confirm Password" type="password" value={form.confirmPassword}
        onChange={(e) => onChange({ ...form, confirmPassword: e.target.value })} icon={<Lock className="w-4 h-4" />} />
      <div className="flex gap-3">
        <Button variant="secondary" fullWidth onClick={onClose}>Cancel</Button>
        <Button variant="primary" fullWidth onClick={onSubmit} isLoading={saving}><Lock className="w-4 h-4" /> Update Password</Button>
      </div>
    </div>
  </Modal>
);

export default ChangePasswordModal;
