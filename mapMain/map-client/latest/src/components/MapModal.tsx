import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  pickup: string;
  dropoff: string;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, pickup, dropoff }) => {
  const mapRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);

  // Cleanup function to remove iframe and reset state
  const cleanup = () => {
    if (mapRef.current) {
      mapRef.current.src = '';
      mapRef.current.remove();
    }
    setIsLoading(true);
    setError(null);
    setRetryCount(0);
  };

  useEffect(() => {
    if (!isOpen) {
      cleanup();
      return;
    }

    if (isOpen) {
      setIsLoading(true);
      setError(null);
      setIframeKey(prev => prev + 1); // Force iframe recreation
      
      const loadMap = () => {
        try {
          const mapUrl = `http://localhost:3000?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}&t=${Date.now()}`;
          
          // Add event listeners for iframe load and error
          const iframe = mapRef.current!;
          const handleLoad = () => {
            setIsLoading(false);
            // Ensure the map is properly sized
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage('resize', '*');
            }
          };
          
          const handleError = () => {
            setIsLoading(false);
            setError('Failed to load map. Please check if the map server is running.');
            // Retry loading after a delay
            if (retryCount < 3) {
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
                loadMap();
              }, 1000);
            }
          };

          iframe.addEventListener('load', handleLoad);
          iframe.addEventListener('error', handleError);

          // Set src after adding event listeners
          iframe.src = mapUrl;

          return () => {
            iframe.removeEventListener('load', handleLoad);
            iframe.removeEventListener('error', handleError);
          };
        } catch (err) {
          setIsLoading(false);
          setError('Error initializing map');
          console.error('Map initialization error:', err);
        }
      };

      loadMap();
    }

    return cleanup;
  }, [isOpen, pickup, dropoff, retryCount, iframeKey]);

  const handleRetry = () => {
    setRetryCount(0);
    setIsLoading(true);
    setError(null);
    setIframeKey(prev => prev + 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[70vw] h-[70vh] p-0 bg-white">
        <div className="relative w-full h-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={onClose}
            aria-label="Close map"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-sm text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center">
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-gray-600 mt-2">Please ensure the map server is running on port 3000</p>
                <Button 
                  onClick={handleRetry}
                  className="mt-4"
                  disabled={retryCount >= 3}
                >
                  Retry
                </Button>
              </div>
            </div>
          )}
          
          <iframe
            key={iframeKey}
            ref={mapRef}
            className="w-full h-full border-0"
            title="Map"
            aria-label="Interactive map showing route from pickup to dropoff location"
            allowFullScreen
            loading="eager"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal; 