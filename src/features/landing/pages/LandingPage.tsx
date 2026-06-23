import React from 'react';
import SEO from '@shared/components/SEO';
import AuthModal from '@features/auth/components/AuthModal';
import LandingNavbar from '../components/LandingNavbar';
import { ExamCategoriesSection } from '../components/ExamCategoriesSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { LandingCtaSection } from '../components/LandingCtaSection';
import { LandingFooter } from '../components/LandingFooter';
import { LandingHeroSection } from '../components/LandingHeroSection';
import { PopularTestsSection } from '../components/PopularTestsSection';
import { PricingSection } from '../components/PricingSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { useLandingContent } from '../hooks/useLandingContent';
const ChatbotWidget = React.lazy(() => import('@features/chatbot/components/ChatbotWidget'));

const LandingPage: React.FC = () => {
  const landing = useLandingContent();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEO description="DreamBoost - India's #1 exam preparation platform with 500+ test series for SSC, Banking, Railway, JEE, NEET and more." />
      <LandingNavbar />
      <LandingHeroSection
        heroLoaded={landing.heroLoaded}
        searchQuery={landing.searchQuery}
        isAuthenticated={landing.isAuthenticated}
        onSearchChange={landing.setSearchQuery}
        onNavigate={landing.navigate}
        onOpenAuth={landing.openAuth}
      />
      <ExamCategoriesSection
        categories={landing.categories}
        loading={landing.loading}
        isAuthenticated={landing.isAuthenticated}
        onNavigate={landing.navigate}
        onOpenAuth={landing.openAuth}
      />
      <PopularTestsSection
        tests={landing.popularTests}
        loading={landing.loading}
        onNavigate={landing.navigate}
        onStartTest={landing.handleStartTest}
      />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection
        plans={landing.plans.slice(0, 3)}
        loading={landing.loading}
        isAuthenticated={landing.isAuthenticated}
        onNavigate={landing.navigate}
        onOpenAuth={landing.openAuth}
      />
      <TestimonialsSection />
      <LandingCtaSection isAuthenticated={landing.isAuthenticated} onNavigate={landing.navigate} onOpenAuth={landing.openAuth} />
      <LandingFooter />

      <AuthModal isOpen={landing.authModalOpen} onClose={() => landing.setAuthModalOpen(false)} initialStep={landing.authStep} />
      {landing.isAuthenticated && <ChatbotWidget />}
    </div>
  );
};

export default LandingPage;
