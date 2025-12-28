# Environment Setup Instructions

## Creating Your .env.local File

Create a file named `.env.local` in the root directory with the following content:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXTAUTH_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/care-xyz

# For MongoDB Atlas (cloud), use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/care-xyz?retryWrites=true&w=majority

# Google OAuth (Optional)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## MongoDB Setup Options

### Option 1: Local MongoDB
1. Install MongoDB locally: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/care-xyz`

### Option 2: MongoDB Atlas (Cloud - Recommended)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` with your Atlas connection string

## After Setup
1. Restart your development server: `npm run dev`
2. The application will automatically connect to MongoDB
