import React from 'react';
import { useNavbar } from '../hooks';
import AuthModal from '@features/auth/components/AuthModal';
import NotificationPopover from '@shared/components/NotificationPopover';
import BrandLogo from '@shared/components/BrandLogo';
import { Button, UserDropdown } from '@shared/components';
import {
  Menu, X, BookOpen, Trophy, LayoutDashboard,
  User, Bell, CreditCard, Settings,
} from '@shared/icons';

const LandingNavbar: React.FC = () => {
  const {
    mobileMenuOpen, setMobileMenuOpen,
    userMenuOpen, setUserMenuOpen,
    notificationOpen, setNotificationOpen,
    authModalOpen, setAuthModalOpen,
    authStep, setAuthStep,
    handleLogout,
    openAuth,
    userInitials,
    navTo,
    user,
    isAuthenticated,
    navigate,
  } = useNavbar();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-tb-gray-200/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <button onClick={() => navigate('/')}>
            <BrandLogo logoClassName="h-14 w-auto sm:h-16 md:h-20 lg:h-24 object-contain object-left" textClassName="hidden" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#exams" className="px-3 py-2 text-sm font-medium text-tb-gray-600 hover:text-tb-blue rounded-lg hover:bg-tb-gray-50 transition-all duration-200">Exams</a>
            <a href="#features" className="px-3 py-2 text-sm font-medium text-tb-gray-600 hover:text-tb-blue rounded-lg hover:bg-tb-gray-50 transition-all duration-200">Features</a>
            <a href="#pricing" className="px-3 py-2 text-sm font-medium text-tb-gray-600 hover:text-tb-blue rounded-lg hover:bg-tb-gray-50 transition-all duration-200">Pricing</a>
            {isAuthenticated && (
              <button onClick={() => navTo('/app/dashboard')} className="px-3 py-2 text-sm font-medium text-tb-blue hover:text-tb-blue-dark rounded-lg hover:bg-blue-50 transition-all duration-200">
                My Tests
              </button>
            )}
            <button onClick={() => navTo('/app/test-series')} className="px-3 py-2 text-sm font-medium text-tb-gray-600 hover:text-tb-blue rounded-lg hover:bg-tb-gray-50 transition-all duration-200">
              Test Series
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <div className="relative">
                  <button onClick={() => setNotificationOpen(!notificationOpen)} className="relative p-2.5 rounded-xl hover:bg-tb-gray-100 text-tb-gray-500 transition-all duration-200">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tb-red rounded-full ring-2 ring-white" />
                  </button>
                  {notificationOpen && <NotificationPopover onClose={() => setNotificationOpen(false)} />}
                </div>
                <UserDropdown
                  user={user}
                  userInitials={userInitials}
                  isOpen={userMenuOpen}
                  onToggle={() => setUserMenuOpen(!userMenuOpen)}
                  onClose={() => setUserMenuOpen(false)}
                  onLogout={handleLogout}
                  navigate={navTo}
                  links={[
                    { label: 'Dashboard', icon: LayoutDashboard, href: '/app/dashboard' },
                    { label: 'Test Series', icon: BookOpen, href: '/app/test-series' },
                    { label: 'Leaderboard', icon: Trophy, href: '/app/leaderboard' },
                    { label: 'Payments', icon: CreditCard, href: '/app/payment' },
                    { label: 'Profile', icon: User, href: '/app/profile' },
                    { label: 'Settings', icon: Settings, href: '/app/settings' },
                  ]}
                  variant="landing"
                />
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm" onClick={() => openAuth('login')} className="hidden sm:block">Login</Button>
                <Button variant="orange" size="sm" onClick={() => openAuth('register')} className="shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]">
                  Sign Up Free
                </Button>
              </>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 rounded-xl hover:bg-tb-gray-100 transition-colors">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-tb-gray-200 bg-white/95 backdrop-blur-lg py-3 px-4 space-y-1 animate-slide-up">
          <a href="#exams" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm text-tb-gray-600 hover:bg-tb-gray-50 rounded-lg">Exams</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm text-tb-gray-600 hover:bg-tb-gray-50 rounded-lg">Features</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 text-sm text-tb-gray-600 hover:bg-tb-gray-50 rounded-lg">Pricing</a>
          {isAuthenticated ? (
            <>
              <button onClick={() => navTo('/app/dashboard')} className="block w-full text-left py-2.5 px-3 text-sm text-tb-blue font-medium hover:bg-blue-50 rounded-lg">My Tests</button>
              <button onClick={() => navTo('/app/test-series')} className="block w-full text-left py-2.5 px-3 text-sm text-tb-gray-600 hover:bg-tb-gray-50 rounded-lg">Test Series</button>
              <button onClick={() => navTo('/app/profile')} className="block w-full text-left py-2.5 px-3 text-sm text-tb-gray-600 hover:bg-tb-gray-50 rounded-lg">Profile</button>
              <button onClick={handleLogout} className="block w-full text-left py-2.5 px-3 text-sm text-tb-red font-medium hover:bg-red-50 rounded-lg">Logout</button>
            </>
          ) : (
            <button onClick={() => openAuth('login')} className="block w-full text-left py-2.5 px-3 text-sm text-tb-blue font-medium hover:bg-blue-50 rounded-lg">Login</button>
          )}
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialStep={authStep} />
    </nav>
  );
};

export default LandingNavbar;
