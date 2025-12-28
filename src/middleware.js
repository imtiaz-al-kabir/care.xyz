// Middleware temporarily disabled for demo purposes
// To enable authentication protection, uncomment the code below and add NEXTAUTH_SECRET to .env.local

// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: "/login",
//   },
// });

// export const config = {
//   matcher: ["/booking/:path*", "/my-bookings"],
// };

export default function middleware() {
    // Middleware disabled for demo
}

export const config = {
    matcher: [],
};
