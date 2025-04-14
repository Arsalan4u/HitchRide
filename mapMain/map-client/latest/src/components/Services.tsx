import React from 'react';
import { Button } from "./ui/button";

const Services = () => {
  const scrollToHowItWorks = () => {
    document.getElementById('suggestion')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section id="suggestion" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center mt-10">Suggestions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Courier Card */}
          <div className="border border-gray-200 rounded-lg p-6 h-80 w-full flex flex-col">
            <div className="h-32 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400">
                <img 
                  src="/ridesNearu.jpg" 
                  alt="Courier Service" 
                  onError={(e) => {
                    console.error('Error loading image:', e);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  className="max-h-full max-w-full object-contain"
                />
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Rides Near You</h3>
            <p className="text-gray-700 mb-4 flex-grow">Find nearby rides for quick, everyday travel.</p>
            <Button variant="link" className="text-green-700 font-bold hover:bg-green-400 p-0 h-auto hover:text-green-800 self-start">
              Details
            </Button>
          </div>
          
          {/* Rentals Card */}
          <div className="border border-gray-200 rounded-lg p-6 h-80 w-full flex flex-col">
            <div className="h-32 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400">
                <img 
                  src="/outstation.png" 
                  alt="Rentals Service"
                  onError={(e) => {
                    console.error('Error loading image:', e);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  className="max-h-full max-w-full object-contain"
                />
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">OutStation</h3>
            <p className="text-gray-700 mb-4 flex-grow">Plan intercity rides for long-distance travel outside your city.</p>
            <Button variant="link" className="text-blue-600 font-bold p-0 h-auto  hover:text-blue-800 self-start">
              Details
            </Button>
          </div>
          
          {/* Reserve Card */}
          <div className="border border-gray-200 rounded-lg p-6 h-80 w-full flex flex-col">
            <div className="h-32 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400">
              <img src="/schedule.jpg" alt="" />
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Reserve</h3>
            <p className="text-gray-700 mb-4 flex-grow">Reserve your ride in advance so you can relax on the day of your trip.</p>
            <Button variant="link" className="text-green-600 p-0 h-auto font-bold hover:text-blue-800 self-start">
              Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;