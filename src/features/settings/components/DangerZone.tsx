import React from 'react';
import { Card, Button } from '@shared/components';
import { Trash2 } from '@shared/icons';

const DangerZone: React.FC = () => (
  <Card>
    <div className="p-4 bg-red-50 rounded-xl border border-red-200">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-red-100 rounded-lg"><Trash2 className="w-5 h-5 text-tb-red" /></div>
        <div>
          <h4 className="font-bold text-tb-red">Delete Account</h4>
          <p className="text-sm text-tb-red/80 mt-1">This action cannot be undone. All your data will be permanently deleted.</p>
          <Button variant="danger" className="mt-3" size="sm">Delete Account</Button>
        </div>
      </div>
    </div>
  </Card>
);

export default DangerZone;
