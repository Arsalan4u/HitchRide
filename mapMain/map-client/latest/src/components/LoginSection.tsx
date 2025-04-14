
import React from 'react';
import { Button } from "./ui/button";

const LoginSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="hitchride-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Log in to see your recent activity</h2>
          <p className="text-gray-600 mb-8">
            View past trips, tailored suggestions, support resources, and more.
          </p>
          <div className="space-y-4">
            <Button className="bg-hitchride-dark text-white hover:bg-hitchride-dark/90 w-full sm:w-auto px-8">
              Log in to your account
            </Button>
            <div>
              <Button variant="link" className="text-hitchride-primary underline">
                Don't have an Hitch Ride account? Sign up
              </Button>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-hitchride-secondary/10 rounded-lg p-6 h-[300px] flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-hitchride-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              <p className="text-hitchride-dark font-medium">Access your travel history and preferences</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
