# 🔐 Environment Variables Setup Guide

## Step 1: Create .env.local File

In the root directory of your project (`care.xyz`), create a new file named `.env.local`

**IMPORTANT**: This file is gitignored and will NOT be committed to version control.

## Step 2: Add the Following Content

Copy and paste this into your `.env.local` file:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=care-xyz-secret-key-2024-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/care-xyz

# Stripe Configuration (Get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Google OAuth (Optional - for production)
# GOOGLE_CLIENT_ID=your-google-client-id-here
# GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

## Step 3: MongoDB Setup

You have two options:

### Option A: MongoDB Atlas (Cloud - Recommended for Beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `MONGODB_URI` in `.env.local` with your connection string
   
   Example:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/care-xyz?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB

1. Download and install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Keep the default `MONGODB_URI=mongodb://localhost:27017/care-xyz`

## Step 4: Restart Development Server

After creating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## ✅ Verification

You'll know it's working when:
- No MongoDB connection errors in the terminal
- You can create bookings and they appear in "My Bookings"
- Bookings persist after page refresh

## 🔒 Security Notes

- **NEVER** commit `.env.local` to Git
- Change `NEXTAUTH_SECRET` to a random string in production
- Use strong passwords for MongoDB Atlas
