import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { findUserByEmail, createUser, comparePassword } from "@/lib/collections/users";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Find user by email
                    const user = await findUserByEmail(credentials.email);

                    if (!user) {
                        return null;
                    }

                    // Check password
                    const isPasswordValid = await comparePassword(credentials.password, user.password);

                    if (!isPasswordValid) {
                        return null;
                    }

                    // Return user object
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
        newUser: "/register",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    // Check if user already exists
                    let existingUser = await findUserByEmail(user.email);

                    if (!existingUser) {
                        // Create new user from Google profile
                        existingUser = await createUser({
                            name: user.name,
                            email: user.email,
                            password: Math.random().toString(36), // Random password for OAuth users
                            contact: "", // Can be updated later
                            nid: "", // Can be updated later
                            role: "user",
                            isVerified: true, // Google users are pre-verified
                        });
                    }

                    // Store the database user ID in the user object
                    user.id = existingUser._id.toString();
                    user.role = existingUser.role;
                } catch (error) {
                    console.error("Error saving Google user:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
