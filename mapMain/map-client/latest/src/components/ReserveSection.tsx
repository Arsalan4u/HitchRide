

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Calendar,
  Clock,
  CheckCircle,
  ChevronDown,
  Shield,
  Clock3,
  CalendarRange,
  ArrowRight,
  Star,
  CreditCard,
  Car
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const ReserveSection = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section id="schedule" className="py-22  relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 mt-24 "  style={{ scrollMarginTop: '100px' }}>
      {/* Premium decorative elements - scaled down */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/20 to-blue-200/15 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/15 to-indigo-200/15 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
        
        {/* Smaller decorative patterns */}
        <div className="absolute top-20 left-20 w-48 h-48 border border-indigo-200/20 rounded-full"></div>
        <div className="absolute top-32 left-32 w-24 h-24 border border-indigo-200/15 rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-36 h-36 border border-blue-200/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-blue-200/15 rounded-full"></div>
        
        {/* Smaller animated dots */}
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-indigo-400/30 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* More refined header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
<br/>
<br/>
<br/>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight ">
            <span className="relative inline-block">
              <span className="relative z-10">Plan Your Journey</span>
              <span className="absolute bottom-1.5 left-0 w-full h-2.5 bg-indigo-100/80 -z-10 rounded-md transform -rotate-1"></span>
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              With Precision
            </span>
          </h2>
          
          <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Schedule your ride up to 90 days in advance with guaranteed availability.
          </p>
        </motion.div>

        {/* More compact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
<Card className="bg-white/90 text-green-500 backdrop-blur-md border border-gray-200/70 rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(79,70,229,0.1)] hover:shadow-[0_15px_50px_-10px_rgba(79,70,229,0.2)] transition-all duration-400 relative">
  {/* Vibrant yet professional background */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/20 via-blue-50/30 to-white opacity-30 bg-black"></div>
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2UwZTdmZiIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')] opacity-15"></div>
  
  <div className="relative z-10 bg-gradient-to-br from-indigo-50/80 to-blue-50/80 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
    {/* Left Column: Booking Form */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-indigo-100/[0.04] [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.7),transparent)]"></div>
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
            <Car className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Hitch<span className="text-indigo-600">Ride</span> Reserve
          </h3>
        </div>
        
        <p className="text-green mb-6 text-sm max-w-md">
          Schedule your ride in advance with benefits.
        </p>

{/* Form Inputs */}
<div className="space-y-6 mb-8">
  {/* Date Input */}
  <div className="space-y-2">
    <label className="text-green-500 text-xs font-medium flex items-center gap-1.5">
      <CalendarRange className="h-3.5 w-3.5 text-green-500" />
      Select Pickup Date
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-1 flex items-center pl-3">
      <Calendar className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors" />
      </div>
      <div className="">
      <Input
        placeholder="Choose date"
        className=" pl-6 pr-8 h-12 text-sm border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/30 rounded-lg shadow-xs transition-all"
      />
      </div>
      <div className="absolute inset-y-0 right-2 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-green-500 group-hover:text-green-600 transition-colors " />
      </div>
      </div>
    <p className="text-xs text-gray-400">Book up to 90 days in advance</p>
  </div>

  {/* Time Input */}
  <div className="space-y-2">
    <label className="text-xs font-medium text-green-500 flex items-center gap-1.5">
      <Clock3 className="h-3.5 w-3.5 text-green-500" />
      Select Pickup Time
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-1 flex items-center pl-3">
        <Clock className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors" />
      </div>
      <div>
      <Input
        placeholder="Choose time"
        className="pl-6 pr-8 h-12 text-sm border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-200/30 rounded-lg shadow-xs transition-all"
      />
      </div>
      <div className="absolute inset-y-0 right-2 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-green-500 group-hover:text-green-600 transition-colors" />
      </div>
    </div>
    <p className="text-xs text-gray-400">Local timezone</p>
  </div>
</div>

        {/* Submit Button */}
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-500 group-hover:duration-200 animate-pulse-slow"></div>
          <Button className="relative w-full h-12 text-sm font-medium bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg flex items-center justify-center gap-1.5 group">
            <span>Continue to Vehicle Selection</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <CreditCard className="h-3.5 w-3.5" />
          <span>No payment required until confirmation</span>
        </div>
      </div>
    </div>

    {/* Right Column: Benefits */}
    <div className="bg-white/90 p-6 rounded-xl relative border border-gray-100/70 shadow-xs">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/15 to-blue-100/20 rounded-full blur-xl -translate-y-1/3 translate-x-1/4"></div>
      
      <div className="relative">
        <h4 className="text-lg font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
          <span className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center">
            <Star className="h-3.5 w-3.5 text-indigo-600" />
          </span>
           Benefits
        </h4>
        <p className="text-gray-500 mb-6 text-sm">
          Exclusive advantages with scheduled rides
        </p>

        <div className="space-y-5">
          {[
            {
              icon: <CalendarRange className="h-5 w-5 text-indigo-600" />,
              title: "90-Day Advanced Booking",
              desc: "Plan trips in advance with guaranteed availability.",
            },
            {
              icon: <Clock3 className="h-5 w-5 text-indigo-600" />,
              title: "Extended Wait Time",
              desc: "15-minute complimentary wait period.",
            },
            {
              icon: <Shield className="h-5 w-5 text-indigo-600" />,
              title: "Flexible Cancellation",
              desc: "Cancel up to 60 minutes before pickup.",
            },
          ].map((benefit, index) => (
            <motion.div 
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="flex items-start gap-4 group"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-250 ${
                hoverIndex === index 
                  ? "bg-gradient-to-br from-indigo-600 to-blue-600 shadow-md shadow-indigo-100" 
                  : "bg-white shadow-xs border border-gray-100"
              }`}>
                <div className={`${hoverIndex === index ? "text-white" : "text-indigo-600"}`}>
                  {benefit.icon}
                </div>
              </div>
              <div>
                <h5 className={`text-base font-semibold mb-1 transition-colors duration-250 ${
                  hoverIndex === index ? "text-indigo-700" : "text-gray-900"
                }`}>
                  {benefit.title}
                </h5>
                <p className="text-gray-500 text-sm leading-snug">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}

          <div className="pt-4">
            <Button
              variant="link"
              className="text-indigo-600 text-xs font-medium hover:text-indigo-800 hover:underline flex items-center gap-1 pl-0 group"
            >
              <span>View terms and conditions</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ReserveSection;