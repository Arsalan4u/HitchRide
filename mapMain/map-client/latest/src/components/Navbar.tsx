import { useState, useEffect } from 'react';
import { Button } from "../../../../../client/client2/src/components/ui/button";
import { MenuIcon, X, LogIn, UserPlus, Shield, Crown, Globe } from "lucide-react";
import {
  useUser,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/clerk-react';
import { RegistrationModal } from '../../../../../client/src/components/registration/RegistrationModal';
import { usePremium } from '../../../../../client/src/context/premiumContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { user } = useUser();
  const [isVehicleVerified, setIsVehicleVerified] = useState(false);
  const { isPremium } = usePremium();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch vehicle verification status from backend using Clerk userId
  useEffect(() => {
    const checkVehicleVerification = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`http://localhost:5000/api/vehicle/verify?userId=${user.id}`);
        const data = await res.json();
        setIsVehicleVerified(data?.isVehicleVerified || false);
      } catch (error) {
        console.error("Error checking vehicle verification status:", error);
      }
    };
    checkVehicleVerification();
  }, [user]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-[#2E7D32] font-extrabold">Hitch</span>
            <span className="font-light">Ride</span>
          </a>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('suggestion')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Suggestion</button>
          <button onClick={() => scrollToSection('schedule')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Schedule</button>
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center gap-1 text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider"
            >
              <Globe className="h-4 w-4" />
              <span>En</span>
            </button>
            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  English
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  हिंदी
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  ಕನ್ನಡ
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <SignedIn>
              {isPremium ? (
                <button
                  onClick={() => scrollToSection('premium-section')}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
                           text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                           flex items-center justify-center"
                >
                  <Crown className="h-5 w-5 animate-pulse" />
                </button>
              ) : (
                <button
                  onClick={() => scrollToSection('premium-section')}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
                           text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                           flex items-center justify-center gap-2 group"
                >
                  <Crown className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  <span>Go Premium</span>
                </button>
              )}
              {!isVehicleVerified && (
                <button
                  onClick={() => setShowRegistration(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                             text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                             flex items-center justify-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Register</span>
                </button>
              )}
              <div className="ml-2">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-[#2E7D32]",
                    }
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="flex items-center gap-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                             text-white flex items-center gap-2 shadow-md hover:shadow-lg">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </nav>
        {/* Mobile Menu Button - Hamburger */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-[#2E7D32]" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-xl animate-slideDown origin-top">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <button onClick={() => scrollToSection('suggestion')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Suggestion</button>
            <button onClick={() => scrollToSection('schedule')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Schedule</button>
            
            <div className="py-3 border-b border-gray-100">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#2E7D32] transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>Language (En)</span>
              </button>
              {showLanguageMenu && (
                <div className="mt-2 pl-6 space-y-2">
                  <button className="block w-full text-left text-sm text-gray-700 hover:text-[#2E7D32]">
                    English
                  </button>
                  <button className="block w-full text-left text-sm text-gray-700 hover:text-[#2E7D32]">
                    हिंदी
                  </button>
                  <button className="block w-full text-left text-sm text-gray-700 hover:text-[#2E7D32]">
                    ಕನ್ನಡ
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('eco-points')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Eco Points</button>
            <button onClick={() => scrollToSection('safety')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Safety</button>
            <button onClick={() => scrollToSection('map')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Live Map</button>
            <div className="pt-4 space-y-3">
              <SignedIn>
                {isPremium ? (
                  <button
                    onClick={() => scrollToSection('premium-section')}
                    className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
                             text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                             flex items-center justify-center gap-2"
                  >
                    <Crown className="h-5 w-5 animate-pulse" />
                    <span>Premium Member</span>
                  </button>
                ) : (
                  <button
                    onClick={() => scrollToSection('premium-section')}
                    className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
                             text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                             flex items-center justify-center gap-2"
                  >
                    <Crown className="h-4 w-4" />
                    <span>Go Premium</span>
                  </button>
                )}
                {!isVehicleVerified && (
                  <button
                    onClick={() => {
                      setShowRegistration(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                               text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                               flex items-center justify-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Register Vehicle</span>
                  </button>
                )}
                <div className="flex justify-center pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                               text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
      {/* Registration Modal */}
      {showRegistration && (
        <RegistrationModal onClose={() => setShowRegistration(false)} />
      )}
    </header>
  );
};

export default Navbar;


