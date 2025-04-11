
import React from 'react';
import { Shield, BellRing, Video, ShieldCheck } from 'lucide-react';

const Safety = () => {
  return (
    <section id="safety" className="container-section">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Safety First</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Your security is our top priority. We've built multiple safeguards into every Hitch Ride.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 relative">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-eco/10 p-3 rounded-full mr-4">
                  <Shield className="h-6 w-6 text-eco" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ride Verification System</h3>
                  <p className="text-gray-600">
                    Both drivers and riders must confirm that the ride was completed safely. If no confirmation is received, our automated system initiates safety protocols.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-eco/10 p-3 rounded-full mr-4">
                  <BellRing className="h-6 w-6 text-eco" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Emergency Alerts</h3>
                  <p className="text-gray-600">
                    Designated emergency contacts receive automatic notifications if you don't respond to ride completion prompts, with your exact location details.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-eco/10 p-3 rounded-full mr-4">
                  <Video className="h-6 w-6 text-eco" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Optional Dashcam Integration</h3>
                  <p className="text-gray-600">
                    Connect your dashcam to Hitch Ride for enhanced security. Footage is stored temporarily and only accessed in case of emergencies.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-eco/10 p-3 rounded-full mr-4">
                  <ShieldCheck className="h-6 w-6 text-eco" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">ID Verification</h3>
                  <p className="text-gray-600">
                    All users must complete multi-factor authentication and ID verification before their first ride, ensuring platform safety.
                  </p>
                </div>
              </div>
            </div>

            <span className="absolute -top-4 -left-4 bg-eco text-white text-xs font-semibold px-3 py-1 rounded-full">
              Bengaluru Safe Ride Partner
            </span>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Safety Protocol Flowchart</h3>
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="rounded-xl bg-gray-50 p-4 w-full text-center mb-10 relative">
                  <h4 className="font-semibold mb-1">Ride Completes</h4>
                  <p className="text-sm text-gray-600">Driver arrives at destination</p>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300"></div>
                </div>
                
                <div className="rounded-xl bg-gray-50 p-4 w-full text-center mb-10 relative">
                  <h4 className="font-semibold mb-1">Verification Request</h4>
                  <p className="text-sm text-gray-600">Both parties asked to confirm arrival</p>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300"></div>
                </div>
                
                <div className="flex justify-center w-full relative mb-10">
                  <div className="absolute top-0 left-1/4 transform -translate-x-1/2 w-1/2 h-0.5 bg-gray-300"></div>
                  <div className="absolute top-0 right-1/4 transform translate-x-1/2 w-1/2 h-0.5 bg-gray-300"></div>
                  
                  <div className="rounded-xl bg-eco text-white p-4 w-2/5 text-center mx-2">
                    <h4 className="font-semibold mb-1">Confirmed ✓</h4>
                    <p className="text-sm text-white/80">Ride recorded as successful</p>
                  </div>
                  
                  <div className="rounded-xl bg-red-100 p-4 w-2/5 text-center mx-2">
                    <h4 className="font-semibold mb-1 text-red-600">No Response</h4>
                    <p className="text-sm text-gray-600">Timer starts (5 min)</p>
                  </div>
                  
                  <div className="absolute -bottom-8 right-1/5 transform translate-x-1/2 w-0.5 h-8 bg-gray-300"></div>
                </div>
                
                <div className="rounded-xl bg-red-500 text-white p-4 w-full text-center">
                  <h4 className="font-semibold mb-1">Safety Alerts Triggered</h4>
                  <p className="text-sm text-white/80">Emergency contacts notified with location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
