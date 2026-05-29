import React from 'react';
import { Button, Input, Select, Modal, Toggle } from '@shared/components';
import type { IAdminExam, IAdminExamForm, IExamCategory } from '../../../types';

interface Props {
  isOpen: boolean;
  editing: IAdminExam | null;
  form: IAdminExamForm;
  onFormChange: (form: IAdminExamForm) => void;
  categories: IExamCategory[];
  onSave: () => void;
  onClose: () => void;
}

const ExamFormModal: React.FC<Props> = ({ isOpen, editing, form, onFormChange: setForm, categories, onSave, onClose }) => {
  const selectedCategory = categories.find((c: IExamCategory) => c._id === form.categoryId);
  const isEngineering = selectedCategory?.name.toLowerCase().includes('engineering');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editing ? 'Edit Exam' : 'Add Exam'} size="lg">
      <div className="space-y-4 p-4">
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-') })} required />
        <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
        <Select label="Category" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} options={categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))} required />
        
        {isEngineering && (
          <Select 
            label="Exam Type" 
            value={form.examType || 'other'} 
            onChange={(e) => setForm({ ...form, examType: e.target.value as 'national' | 'state' | 'competitive' | 'other' })} 
            options={[
              { value: 'national', label: 'National Level (JEE, BITSAT, CUET)' },
              { value: 'state', label: 'State-Level (MHT CET, WBJEE, KCET, etc.)' },
              { value: 'competitive', label: 'Competitive Entrance' },
              { value: 'other', label: 'Other' },
            ]} 
          />
        )}

        <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. BookOpen, Atom, Calculator" />
        <Input label="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="e.g. #3b82f6" />
        
        <div>
          <label className="block text-sm font-medium text-tb-gray-700 dark:text-gray-300 mb-2">Banner Image URL</label>
          <Input value={form.bannerUrl || ''} onChange={(e) => setForm({ ...form, bannerUrl: e.target.value })} placeholder="https://..." />
          {form.bannerUrl && (
            <div className="mt-2">
              <img src={form.bannerUrl} alt="Preview" className="w-full h-32 rounded-lg object-cover border border-tb-gray-200" />
            </div>
          )}
        </div>

        <Select label="Difficulty" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} options={[{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]} />
        <Input label="Order" type="number" value={String(form.order)} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} placeholder="Display order (lower values appear first)" />
        <label className="flex items-center gap-2 text-sm text-tb-gray-700 dark:text-gray-300"><Toggle checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} /> Active</label>
        <Button onClick={onSave} className="w-full mt-2">{editing ? 'Update' : 'Create'}</Button>
      </div>
    </Modal>
  );
};

export default ExamFormModal;
