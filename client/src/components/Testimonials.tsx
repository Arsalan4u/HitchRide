
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { QuoteIcon } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Hitch Ride has cut my commute costs by 60% while helping me meet amazing people in my neighborhood.",
    name: "Priya S.",
    role: "IT Professional, Whitefield",
    avatar: "https://placehold.co/64x64/eee/999?text=PS"
  },
  {
    id: 2,
    quote: "As a student, the free ride program has been incredibly helpful. I save money and do my part for the environment.",
    name: "Rahul K.",
    role: "Engineering Student, Koramangala",
    avatar: "https://placehold.co/64x64/eee/999?text=RK"
  },
  {
    id: 3,
    quote: "The safety features give me peace of mind when sharing rides. It's revolutionized how I travel in the city.",
    name: "Anjali M.",
    role: "Marketing Manager, Indiranagar",
    avatar: "https://placehold.co/64x64/eee/999?text=AM"
  },
  {
    id: 4,
    quote: "Matching with colleagues who take similar routes has made my daily drive much more enjoyable and cost-effective.",
    name: "Vikram T.",
    role: "Software Developer, Electronic City",
    avatar: "https://placehold.co/64x64/eee/999?text=VT"
  },
];

const partnerLogos = [
  { name: "Bengaluru Metro", logo: "https://placehold.co/120x60/eee/999?text=Metro" },
  { name: "Green Bengaluru", logo: "https://placehold.co/120x60/eee/999?text=Green+BLR" },
  { name: "Tech Park Association", logo: "https://placehold.co/120x60/eee/999?text=TechPark" },
  { name: "EcoCommute", logo: "https://placehold.co/120x60/eee/999?text=EcoCommute" },
  { name: "Clean Air Initiative", logo: "https://placehold.co/120x60/eee/999?text=CleanAir" }
];

const Testimonials = () => {
  return (
    <section id="join" className="container-section bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Movement</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Thousands of Bengaluru residents are already enjoying smarter commutes with Hitch Ride.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="card h-full flex flex-col">
                  <div className="mb-4 text-eco">
                    <QuoteIcon className="h-8 w-8" />
                  </div>
                  <p className="text-gray-700 italic flex-grow">"{testimonial.quote}"</p>
                  <div className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-end gap-2 mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>

      <div className="mt-20">
        <h3 className="text-center text-2xl font-bold mb-8">Our Partners</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partnerLogos.map((partner, index) => (
            <div key={index} className="hover:opacity-80 transition-opacity">
              <img src={partner.logo} alt={partner.name} className="h-12 md:h-16" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start carpooling?</h3>
          <p className="text-gray-600 mb-8">
            Join thousands of Bengaluru commuters who are saving money, reducing traffic, and helping the environment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary text-lg flex items-center justify-center">
              Download App
              <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L7 11H17L12 16Z" fill="currentColor" />
              </svg>
            </button>
            <button className="btn-secondary text-lg">
              Refer a Friend
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
