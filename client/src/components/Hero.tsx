import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { RegistrationModal } from './registration/RegistrationModal';

const Hero = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleFindRideClick = () => {
    setShowRegistration(true);
  };

  const handleRegistrationComplete = () => {
    setIsVerified(true);
    setShowRegistration(false);
    // Redirect to find rides page or show available rides
    console.log('User verified, proceed to find rides');
  };

  const handleCloseModal = () => {
    setShowRegistration(false);
  };

  return (
    <section className="hero-section">
      {/* Registration Modal */}
      {showRegistration && (
        <RegistrationModal 
          onClose={handleCloseModal}
          // Note: Your current RegistrationModal doesn't have onComplete prop,
          // so we'll use the existing onClose flow
        />
      )}

      <div className="hero-bg"></div>
      
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block">Hitch Ride</span>
              <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12">
              Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  onClick={handleFindRideClick}
                  className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                           text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
                           transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Find a Ride
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
                           text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
                           transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                  onClick={scrollToHowItWorks}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  Share a Ride
                </Button>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={scrollToHowItWorks} 
                className="flex items-center text-gray-600 hover:text-eco transition-colors"
              >
                Learn how it works
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
              <img 
                src="/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png" 
                alt="Hitch Ride Carpooling Service" 
                className="w-full h-full object-contain"
              />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M200,180 C250,200 300,350 400,400 S550,480 640,320" 
                  stroke="#00E676" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  fill="none" 
                  className="route-line animate" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;