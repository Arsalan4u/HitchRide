
import React, { useEffect, useState, useRef } from 'react';
import { Leaf, Award, Droplet } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const EcoPoints = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [co2Count, setCo2Count] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const co2Target = 2573;
  const fuelTarget = 12850;
  const pointsTarget = 18650;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate CO2 counter
      const duration = 2000;
      const interval = 20;
      const steps = duration / interval;
      const increment = co2Target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        setCo2Count(Math.floor(current));
        if (current >= co2Target) {
          setCo2Count(co2Target);
          clearInterval(timer);
        }
      }, interval);

      // Animate progress bars
      const progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return prev + 1;
        });
      }, 20);

      return () => {
        clearInterval(timer);
        clearInterval(progressTimer);
      };
    }
  }, [isVisible, co2Target]);

  return (
    <section id="eco-points" className="bg-gradient-to-b from-white to-gray-50 py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Eco Points System</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Every shared ride contributes to a healthier environment. Track your impact and earn rewards.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-eco p-8 text-white">
              <h3 className="text-3xl font-bold mb-3">CO₂ Saved Across Bengaluru</h3>
              <p className="mb-6 text-white/80">
                Our community's collective impact on reducing carbon emissions through carpooling
              </p>
              
              <div className="flex items-end">
                <div className="text-6xl md:text-8xl font-bold">
                  {co2Count.toLocaleString()}
                </div>
                <div className="text-2xl ml-2 mb-2">kg</div>
              </div>
              <p className="text-lg text-white/80">of CO₂ emissions prevented</p>
            </div>
            
            <div className="w-full md:w-1/2 p-8">
              <h3 className="text-2xl font-bold mb-6">Your Personal Impact</h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-eco/10 p-2 rounded-full mr-3">
                        <Leaf className="h-5 w-5 text-eco" />
                      </div>
                      <span className="font-medium">Eco Points</span>
                    </div>
                    <span className="font-bold">{Math.floor((pointsTarget * progress) / 100)}/{pointsTarget}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-eco/10 p-2 rounded-full mr-3">
                        <Droplet className="h-5 w-5 text-eco" />
                      </div>
                      <span className="font-medium">Fuel Saved (ml)</span>
                    </div>
                    <span className="font-bold">{Math.floor((fuelTarget * progress) / 100)}/{fuelTarget}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-eco/10 p-2 rounded-full mr-3">
                        <Award className="h-5 w-5 text-eco" />
                      </div>
                      <span className="font-medium">Achievement Level</span>
                    </div>
                    <span className="bg-eco text-white px-3 py-1 rounded-full text-sm font-medium">
                      {progress < 33 ? 'Bronze' : progress < 66 ? 'Silver' : 'Gold'} Member
                    </span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-eco h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Redeem Eco Points For</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card">
              <img src="https://placehold.co/120x120/00E676/FFFFFF?text=☕" alt="Coffee" className="mx-auto mb-3 rounded-lg" />
              <p className="font-medium">Free Coffee</p>
              <p className="text-sm text-gray-500">500 points</p>
            </div>
            <div className="card">
              <img src="https://placehold.co/120x120/00E676/FFFFFF?text=🎟️" alt="Movie" className="mx-auto mb-3 rounded-lg" />
              <p className="font-medium">Movie Tickets</p>
              <p className="text-sm text-gray-500">1500 points</p>
            </div>
            <div className="card">
              <img src="https://placehold.co/120x120/00E676/FFFFFF?text=⛽" alt="Fuel" className="mx-auto mb-3 rounded-lg" />
              <p className="font-medium">Fuel Discount</p>
              <p className="text-sm text-gray-500">2000 points</p>
            </div>
            <div className="card">
              <img src="https://placehold.co/120x120/00E676/FFFFFF?text=🌳" alt="Tree" className="mx-auto mb-3 rounded-lg" />
              <p className="font-medium">Plant a Tree</p>
              <p className="text-sm text-gray-500">3000 points</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoPoints;
