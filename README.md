# Care.xyz - Premium Caregiving Management System

Care.xyz is a high-end, professional platform designed to connect individuals with expert caregivers. Built with modern web technologies, it features a seamless booking flow, secure payments, and a robust administrative dashboard.

## 🌟 Key Features

### 🔐 Multi-Layered Authentication
- **Secure Sign-in**: Integrated with **NextAuth.js** supporting Google OAuth and Email/Password credentials.
- **Role-Based Access**: Dedicated workflows and views for regular users and platform administrators.
- **Client-Side Guards**: Persistent route protection using custom `PrivateRoute` and `AdminRoute` components.

### 📅 Advanced Booking Engine
- **Dynamic Pricing**: Real-time cost calculation based on service duration (hours/days).
- **Location Support**: Integrated geographic data for precise caregiver coordination.
- **Booking History**: Personalized "My Bookings" dashboard for users to track their care schedule.

### 💳 Integrated Payments
- **Stripe Checkout**: Secure, enterprise-grade payment processing.
- **Automated Invoicing**: Instant email invoices sent via **Nodemailer** with **SweetAlert2** notifications on the client side.
- **Verified Transactions**: Real-time payment verification and booking synchronization.

### 📊 Admin Dashboard
- **System Metrics**: Real-time stats on total revenue, users, and bookings.
- **Management Portal**: Administrative control over payments, user roles, and service listings.
- **Premium UI**: Dark-themed, responsive sidebar layout with smooth **Framer Motion** transitions.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Native Driver)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Payments**: [Stripe](https://stripe.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [SweetAlert2](https://sweetalert2.github.io/)

## 🚀 Getting Started

### 1. Requirements
- Node.js 18.x or later
- MongoDB instance (Local or Atlas)
- Stripe Account (for payments)
- Google Cloud Project (for OAuth)

### 2. Environment Setup
Create a `.env` file in the root directory and provide the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### 3. Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## 🏗️ Project Structure

```text
src/
├── app/              # Next.js App Router (Pages & API)
├── components/       # Custom UI & Layout components
├── lib/              # Shared logic, Auth options, and DB collections
├── public/           # Static assets
└── styles/           # Global CSS and Tailwind configuration
```

## 📜 License
Private/Proprietary. All rights reserved.
