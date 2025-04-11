
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = (
          rect.top <= (window.innerHeight * 0.8) &&
          rect.bottom >= 0
        );
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    // Run once on mount
    animateElements();
    
    // Add event listener
    window.addEventListener('scroll', animateElements);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);
};

export default useScrollAnimation;
