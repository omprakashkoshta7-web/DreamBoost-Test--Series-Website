import React from 'react';
import { Card, Button, Toggle } from '@shared/components';
import { Sun, Check } from '@shared/icons';

interface AppearanceSettingsProps {
  appearance: { theme: string; fontSize: 'small' | 'medium' | 'large'; compactMode: boolean };
  onChange: (a: any) => void;
  saving: boolean;
  onSave: () => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ appearance, onChange, saving, onSave }) => (
  <Card title="Appearance">
    <div className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-tb-gray-700 mb-2">Theme</label>
        <div className="flex gap-3">
          {[{ key: 'light', label: 'Light', icon: Sun }].map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => { onChange({ ...appearance, theme: 'light' }); localStorage.setItem('theme-mode', 'light'); document.documentElement.classList.remove('dark'); }}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${appearance.theme === t.key ? 'border-tb-blue bg-blue-50 text-tb-blue' : 'border-tb-gray-200 text-tb-gray-600 hover:bg-tb-gray-50'}`}>
                <Icon className="w-4 h-4" /><span className="text-sm font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-tb-gray-700 mb-2">Font Size</label>
        <div className="flex gap-3">
          {(['small', 'medium', 'large'] as const).map(size => (
            <button key={size} onClick={() => onChange({ ...appearance, fontSize: size })}
              className={`flex-1 p-3 rounded-xl border-2 capitalize text-sm font-medium transition-all ${appearance.fontSize === size ? 'border-tb-blue bg-blue-50 text-tb-blue' : 'border-tb-gray-200 text-tb-gray-600 hover:bg-tb-gray-50'}`}>
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl border border-tb-gray-200">
        <div><h4 className="font-medium text-sm text-tb-navy">Compact Mode</h4><p className="text-xs text-tb-gray-500">Reduce spacing for denser layout</p></div>
        <Toggle checked={appearance.compactMode} onChange={() => onChange({ ...appearance, compactMode: !appearance.compactMode })} />
      </div>

      <Button variant="primary" onClick={onSave} isLoading={saving}><Check className="w-4 h-4" /> Save Appearance</Button>
    </div>
  </Card>
);

export default AppearanceSettings;
