// // backend/authMiddleware.ts
// import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
// // import { RequestHandler } from 'express';

// export const verifyClerkSession = ClerkExpressRequireAuth({
//   authorizedParties: ['http://localhost:8080'], // Your frontend origin
//   jwtKey: process.env.CLERK_JWT_KEY
// });

// // Usage in your routes:
// router.post('/verifications', verifyClerkSession, verificationController);


// //---------------------------------------------


// // backend/middleware/authMiddleWare.js
// import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// // Middleware to verify Clerk session
// export const verifyClerkSession = ClerkExpressRequireAuth({
//   authorizedParties: ['http://localhost:8080'], // Your frontend origin
//   jwtKey: process.env.CLERK_JWT_KEY
// });


import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const verifyClerkSession = ClerkExpressRequireAuth();
