
import React, { useState } from 'react';
import { Map, MapPin, Car, Route } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const MapSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 3000); // Reset after 3 seconds
  };

  return (
    <section id="map" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Map</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See how Hitch Ride connects thousands of Bengaluru commuters in real-time.
          </p>
        </div>

        <Card className="max-w-6xl mx-auto overflow-hidden border-none shadow-2xl">
          <CardContent className="p-0">
            <div className="relative">
              {/* Map background - would be a real map in actual implementation */}
              <div className="aspect-[16/9] bg-map-pattern bg-cover bg-center relative overflow-hidden">
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                
                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <button 
                    className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    onClick={triggerAnimation}
                    aria-label="Center map"
                  >
                    <Map className="h-6 w-6 text-gray-700" />
                  </button>
                </div>

                {/* Bengaluru Coordinates */}
                <div className="absolute top-4 left-4 bg-white/80 py-1 px-3 rounded-full text-sm font-medium shadow-md">
                  Bengaluru | 12.9716° N, 77.5946° E
                </div>

                {/* Sample location pins */}
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '30%', left: '20%' }}></div>
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '40%', left: '30%' }}></div>
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '35%', left: '50%' }}></div>
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '60%', left: '40%' }}></div>
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '50%', left: '70%' }}></div>
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '25%', left: '75%' }}></div>
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '70%', left: '65%' }}></div>
                <div className={`map-pin ${isAnimating ? 'animate-pulse-light' : ''}`} style={{ top: '55%', left: '25%' }}></div>

                {/* Sample routes */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M160,120 C250,150 350,200 400,225 S550,280 640,320" 
                    stroke="#00E676" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    fill="none" 
                    className={`route-line ${isAnimating ? 'animate' : ''}`}
                  />
                  
                  <path 
                    d="M200,300 C280,260 380,280 450,320 S600,350 700,280" 
                    stroke="#00E676" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeDasharray="8 4"
                    fill="none" 
                    className={`${isAnimating ? 'opacity-70' : 'opacity-40'}`}
                  />
                </svg>

                {/* Car icon */}
                <div className={`absolute ${isAnimating ? 'animate-float' : ''}`} style={{ 
                  top: '50%', 
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}>
                  <Car className="h-10 w-10 text-eco filter drop-shadow-md" />
                </div>
                
                {/* Bengaluru districts labels */}
                <div className="absolute top-1/4 left-1/4 text-xs font-medium bg-white/70 px-2 py-1 rounded shadow">
                  Indiranagar
                </div>
                <div className="absolute top-1/3 right-1/4 text-xs font-medium bg-white/70 px-2 py-1 rounded shadow">
                  Koramangala
                </div>
                <div className="absolute bottom-1/4 left-1/3 text-xs font-medium bg-white/70 px-2 py-1 rounded shadow">
                  Jayanagar
                </div>
                <div className="absolute bottom-1/3 right-1/3 text-xs font-medium bg-white/70 px-2 py-1 rounded shadow">
                  Whitefield
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/80 py-1 px-3 rounded text-xs">
                  Data visualization only. Actual rider locations are private.
                </div>
              </div>
            </div>

            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-700">Active Riders</h4>
                    <p className="text-2xl font-bold">2,487</p>
                  </div>
                  <MapPin className="h-8 w-8 text-eco opacity-80" />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-700">Ongoing Rides</h4>
                    <p className="text-2xl font-bold">342</p>
                  </div>
                  <Car className="h-8 w-8 text-eco opacity-80" />
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-700">Popular Routes</h4>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Route className="h-8 w-8 text-eco opacity-80" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;
