// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { Manager } from "socket.io-client";
// import Navbar from "./components/Navbar";
// import Map from "./components/Map";
// import NotFound from "./pages/NotFound";
// import { Dialog, DialogContent } from "./components/ui/dialog";

// interface LocationData {
//   id: string;
//   latitude: number;
//   longitude: number;
//   timestamp: string;
// }

// interface Position {
//   lat: number;
//   lng: number;
// }

// const AppContent = () => {
//   const location = useLocation();
//   const [showMap, setShowMap] = useState(false);
//   const [socket, setSocket] = useState<any>(null);
//   const [connected, setConnected] = useState(false);
//   const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
//   const [markers, setMarkers] = useState<LocationData[]>([]);
//   const [mapReady, setMapReady] = useState(false);
//   const [locationError, setLocationError] = useState<string | null>(null);
//   const [pickup, setPickup] = useState<string | null>(null);
//   const [dropoff, setDropoff] = useState<string | null>(null);

//   useEffect(() => {
//     if (location.pathname === "/map-main") {
//       setShowMap(true);
//     } else {
//       setShowMap(false);
//     }
//   }, [location]);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const pickupParam = urlParams.get('pickup');
//     const dropoffParam = urlParams.get('dropoff');
    
//     if (pickupParam && dropoffParam) {
//       setPickup(pickupParam);
//       setDropoff(dropoffParam);
//     }
//   }, []);

//   useEffect(() => {
//     if (!("geolocation" in navigator)) {
//       setLocationError("Geolocation is not supported by your browser");
//       return;
//     }

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 10000,
//       maximumAge: 0
//     };

//     const getInitialPosition = () => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newPosition = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//           setCurrentPosition(newPosition);
//           setLocationError(null);
          
//           if (socket && connected) {
//             socket.emit('send-location', {
//               latitude: newPosition.lat,
//               longitude: newPosition.lng,
//               timestamp: new Date().toISOString(),
//             });
//           }
//         },
//         (error) => {
//           setLocationError(`Error getting location: ${error.message}`);
//         },
//         options
//       );
//     };

//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const newPosition = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         setCurrentPosition(newPosition);
//         setLocationError(null);
        
//         if (socket && connected) {
//           socket.emit('send-location', {
//             latitude: newPosition.lat,
//             longitude: newPosition.lng,
//             timestamp: new Date().toISOString(),
//           });
//         }
//       },
//       (error) => {
//         setLocationError(`Error watching location: ${error.message}`);
//       },
//       options
//     );

//     getInitialPosition();

//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, [socket, connected]);

//   useEffect(() => {
//     const manager = new Manager('http://localhost:3000', {
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     const newSocket = manager.socket('/');
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       setConnected(true);
//     });

//     newSocket.on('disconnect', () => {
//       setConnected(false);
//     });

//     newSocket.on('receive-location', (data: LocationData) => {
//       setMarkers(prevMarkers => {
//         const existingMarkerIndex = prevMarkers.findIndex(m => m.id === data.id);
//         if (existingMarkerIndex >= 0) {
//           const newMarkers = [...prevMarkers];
//           newMarkers[existingMarkerIndex] = data;
//           return newMarkers;
//         }
//         return [...prevMarkers, data];
//       });
//     });

//     newSocket.on('user-disconnected', (id: string) => {
//       setMarkers(prevMarkers => prevMarkers.filter(m => m.id !== id));
//     });

//     return () => {
//       newSocket.close();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <Routes>
//           <Route path="/" element={
//             <div className="flex flex-col min-h-screen">
//               <div className="h-full">
//                 {locationError && (
//                   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {locationError}
//                   </div>
//                 )}
//                 <Map
//                   currentPosition={currentPosition}
//                   markers={markers}
//                   onMapReady={() => setMapReady(true)}
//                   pickup={pickup}
//                   dropoff={dropoff}
//                   onMapClick={() => {}}
//                   isReady={mapReady}
//                 />
//               </div>
//             </div>
//           } />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//       <Dialog open={showMap} onOpenChange={setShowMap}>
//         <DialogContent className="w-[90vw] h-[90vh] p-0">
//           {locationError && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {locationError}
//             </div>
//           )}
//           <Map
//             currentPosition={currentPosition}
//             markers={markers}
//             onMapReady={() => setMapReady(true)}
//             pickup={pickup}
//             dropoff={dropoff}
//             onMapClick={() => {}}
//             isReady={mapReady}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// };

// export default App;



// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import Hero from "./components/Hero";
// import MapPage from "./pages/MapPage";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Hero />} />
//           <Route path="/map" element={<MapPage />} />
//           <Route path="/how-it-works" element={<Index />} />
//           <Route path="/eco-points" element={<Index />} />
//           <Route path="/safety" element={<Index />} />
//           <Route path="/live-map" element={<Index />} />
//           {/* Legacy routes - keeping them for backward compatibility */}
//           <Route path="/ride" element={<Index />} />
//           <Route path="/drive" element={<Index />} />
//           <Route path="/business" element={<Index />} />
//           <Route path="/about" element={<Index />} />
//           // Keep existing routes - they'll automatically pass state
//           <Route path="/ride-booking" element={<Index />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import { Dialog, DialogContent } from "./components/ui/dialog";

const AppContent = () => {
  const location = useLocation();
  const [showMap, setShowMap] = React.useState(false);

  React.useEffect(() => {
    if (location.pathname === "/map-main") {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="w-[90vw] h-[90vh] p-0">
          <MapPage />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;