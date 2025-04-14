// import React from 'react';

// const RideMap = () => {
//   return (
//     <div className="relative w-full h-full min-h-[400px] bg-gray-200 rounded-lg overflow-hidden">
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="text-center">
//           <div className="mb-4">
//             <svg className="animate-spin h-10 w-10 text-hitchride-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//           </div>
//           <p className="text-gray-600">Loading map...</p>
//         </div>
//       </div>
//       <div className="absolute bottom-4 right-4 flex flex-col gap-2">
//         <button className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors">
//           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M5 12h14" />
//             <path d="M12 5v14" />
//           </svg>
//         </button>
//         <button className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 transition-colors">
//           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M5 12h14" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RideMap;




import React from 'react';

const RideMap = () => {
  return (
    <div className="w-full">
      <div className="w-full" style={{ height: '400px', overflow: 'hidden' }}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
        src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=don%20bosco%20insitute%20technology%20banglore+(shreyam)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          title="Google Map"

          //  src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=don%20bosco%20insitute%20technology%20banglore+(shreyam)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
          className="border-0"
        >
          <a href="https://www.gps.ie/collections/drones/">best drones</a>
        </iframe>
      </div>
    </div>
  );
};

export default RideMap;
