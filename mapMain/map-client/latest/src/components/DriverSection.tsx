
import React from 'react';
import { Button } from "../components/ui/button";

const DriverSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="hitchride-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="bg-hitchride-primary/10 rounded-lg h-[300px] flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-hitchride-primary mx-auto mb-4">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.5-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
              <p className="text-hitchride-dark font-medium">Flexible earning opportunities</p>
            </div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold mb-6">Drive when you want, make what you need</h2>
          <p className="text-gray-600 mb-8">
            Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Hitch Ride.
          </p>
          <div className="space-y-4">
            <Button className="bg-hitchride-dark text-white hover:bg-hitchride-dark/90 w-full sm:w-auto px-8">
              Get started
            </Button>
            <div>
              <Button variant="link" className="text-hitchride-primary underline">
                Already have an account? Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriverSection;
