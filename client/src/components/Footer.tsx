
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="text-2xl font-bold flex items-center gap-2 mb-4">
              <span className="text-eco">Hitch</span>Ride
            </a>
            <p className="text-gray-400 mb-6">
              A smarter way to share rides in Bengaluru. Reduce traffic, save money, and help the environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-eco transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-eco transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#eco-points" className="text-gray-400 hover:text-white transition-colors">
                  Eco Points
                </a>
              </li>
              <li>
                <a href="#safety" className="text-gray-400 hover:text-white transition-colors">
                  Safety Features
                </a>
              </li>
              <li>
                <a href="#map" className="text-gray-400 hover:text-white transition-colors">
                  Live Map
                </a>
              </li>
              <li>
                <a href="#join" className="text-gray-400 hover:text-white transition-colors">
                  Join the Movement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Download App
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Partner Program
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Corporate Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Blog & News
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a href="mailto:support@hitchride.com" className="text-gray-400 hover:text-white transition-colors">
                  support@hitchride.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <a href="tel:+918012345678" className="text-gray-400 hover:text-white transition-colors">
                  +91 80 1234 5678
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Download Our App</h4>
              <div className="flex space-x-4">
                <a href="#" className="block">
                  <img 
                    src="https://placehold.co/120x40/333/eee?text=App+Store" 
                    alt="Download on App Store" 
                    className="h-10" 
                  />
                </a>
                <a href="#" className="block">
                  <img 
                    src="https://placehold.co/120x40/333/eee?text=Google+Play" 
                    alt="Get it on Google Play" 
                    className="h-10" 
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hitch Ride. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
