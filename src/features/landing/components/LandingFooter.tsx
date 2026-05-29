import BrandLogo from '@shared/components/BrandLogo';
import { Mail, MapPin, Phone } from '@shared/icons';

export const LandingFooter = () => (
  <footer className="bg-tb-navy text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <BrandLogo className="flex items-center gap-1.5 mb-4" textClassName="text-xl font-bold text-white" />
          <p className="text-sm text-tb-gray-300 leading-relaxed">India's most trusted exam preparation platform with 500+ test series.</p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Exams</h4>
          <ul className="space-y-2 text-sm text-tb-gray-300">
            {['SSC Exams', 'Banking Exams', 'Railway Exams', 'JEE/NEET'].map((item) => <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm text-tb-gray-300">
            {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm text-tb-gray-300">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@dreamboost.com</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> New Delhi, India</li>
          </ul>
        </div>
      </div>
      <div className="pt-6 border-t border-tb-navy-light text-center text-sm text-tb-gray-400">
        <p>&copy; 2026 DreamBoost. All rights reserved.</p>
      </div>
    </div>
  </footer>
);
