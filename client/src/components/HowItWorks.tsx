
import React from 'react';
import { RefreshCcw, Leaf, Shield, UserCheck } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const features = [
    {
      icon: <RefreshCcw className="h-8 w-8 text-eco" />,
      title: "Ride Matching",
      description: "Our AI algorithm matches you with riders going in the same direction, optimizing routes for everyone."
    },
    {
      icon: <Leaf className="h-8 w-8 text-eco" />,
      title: "Fuel-Based Pricing",
      description: "Prices adjust based on vehicle fuel efficiency, encouraging eco-friendly transportation."
    },
    {
      icon: <Shield className="h-8 w-8 text-eco" />,
      title: "Eco Point Rewards",
      description: "Earn points for every ride you share and redeem them for rewards at our partner establishments."
    },
    {
      icon: <UserCheck className="h-8 w-8 text-eco" />,
      title: "Verified Riders",
      description: "All riders undergo thorough verification processes to ensure safety and security."
    }
  ];

  return (
    <section id="how-it-works" className="container-section">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How Hitch Ride Works</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our platform makes carpooling simple, efficient and rewarding for everyone in Bengaluru.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="animate-on-scroll border-none shadow-lg hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${index * 0.2}s` }}>
            <CardContent className="p-6">
              <div className="bg-eco/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
