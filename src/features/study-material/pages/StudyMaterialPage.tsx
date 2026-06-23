import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Loader } from '@shared/components';
import { Search } from '@shared/icons';
import CategoryChips from '../components/CategoryChips';
import SubjectGrid from '../components/SubjectGrid';
import MaterialCard from '../components/MaterialCard';
import StudyMaterialHeader from '@features/study-material/components/StudyMaterialHeader';
import RecommendedSectionHeader from '@features/study-material/components/RecommendedSectionHeader';
import MaterialEmptyState from '@features/study-material/components/MaterialEmptyState';
import { studyMaterialCategoryChips, useStudyMaterialPage } from '../hooks/useStudyMaterial';
import SEO from '@shared/components/SEO';

const StudyMaterialPage: React.FC = () => {
  const navigate = useNavigate();
  const studyMaterial = useStudyMaterialPage();

  return (
    <div className="space-y-8 animate-fade-in">
      <SEO title="Study Material" noIndex />
      <StudyMaterialHeader />

      <div className="max-w-xl">
        <Input placeholder="Search notes, PDFs, topics..." value={studyMaterial.search} onChange={(e) => studyMaterial.setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} />
      </div>

      <CategoryChips chips={studyMaterialCategoryChips} active={studyMaterial.activeCategory} onChange={studyMaterial.setActiveCategory} />
      <SubjectGrid subjects={studyMaterial.subjects} />

      {studyMaterial.materials.length > 0 && !studyMaterial.search && !studyMaterial.activeCategory && (
        <div>
          <RecommendedSectionHeader onViewAll={() => navigate('/app/my-library')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {studyMaterial.materials.slice(0, 4).map((material) => <MaterialCard key={material.id} material={material} />)}
          </div>
        </div>
      )}

      {(studyMaterial.search || studyMaterial.activeCategory) && (
        <div>
          <h2 className="text-lg font-bold text-tb-navy mb-4">
            {studyMaterial.search ? `Results for "${studyMaterial.search}"` : `${studyMaterial.activeCategoryLabel} Materials`}
          </h2>
          {studyMaterial.loading ? (
            <div className="flex justify-center py-12"><Loader size="lg" /></div>
          ) : studyMaterial.materials.length === 0 ? (
            <MaterialEmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyMaterial.materials.map((material) => <MaterialCard key={material.id} material={material} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyMaterialPage;
