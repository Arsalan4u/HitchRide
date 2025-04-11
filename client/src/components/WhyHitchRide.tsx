
import React from 'react';
import { 
  CreditCard, 
  BookOpen,
  Brain,
  Users,
  Leaf,
  BarChart,
  BadgeCheck,
  Heart
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const WhyHitchRide = () => {
  const benefits = [
    {
      icon: <CreditCard className="h-6 w-6 text-eco" />,
      title: "Free or Affordable",
      description: "Students and daily commuters can access free rides through our sponsored program, or pay minimal fees based on distance."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-eco" />,
      title: "Student Support",
      description: "Special discounts and priority matching for students commuting to universities and educational institutions."
    },
    {
      icon: <Brain className="h-6 w-6 text-eco" />,
      title: "Smart Routing",
      description: "Our AI analyzes traffic patterns in real-time to suggest the most efficient routes through Bengaluru's busy streets."
    },
    {
      icon: <Users className="h-6 w-6 text-eco" />,
      title: "Community Driven",
      description: "Join a growing network of eco-conscious commuters working together to reduce Bengaluru's traffic congestion."
    },
    {
      icon: <Leaf className="h-6 w-6 text-eco" />,
      title: "Lower Income Support",
      description: "Subsidized rides for essential workers and low-income groups, making transportation accessible for all."
    },
    {
      icon: <BarChart className="h-6 w-6 text-eco" />,
      title: "Transparent Pricing",
      description: "Clear, upfront cost sharing with no hidden fees or surge pricing during peak hours."
    },
    {
      icon: <BadgeCheck className="h-6 w-6 text-eco" />,
      title: "Verified Community",
      description: "All members undergo thorough verification for a safe and trustworthy carpooling experience."
    },
    {
      icon: <Heart className="h-6 w-6 text-eco" />,
      title: "Better for Bengaluru",
      description: "Every shared ride contributes to less congestion, cleaner air, and a more sustainable city for everyone."
    },
  ];

  return (
    <section className="container-section">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hitch Ride?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our platform offers unique advantages for Bengaluru commuters looking for smarter transportation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="animate-on-scroll border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6 h-full flex flex-col">
              <div className="bg-eco/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-600 flex-grow">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyHitchRide;
