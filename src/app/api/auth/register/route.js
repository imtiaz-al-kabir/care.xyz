import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/collections/users";

export async function POST(request) {
    try {
        const { name, email, password, contact, nid } = await request.json();

        // Validate password
        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);

        if (!hasUpperCase || !hasLowerCase) {
            return NextResponse.json(
                { success: false, message: "Password must contain at least 1 uppercase and 1 lowercase letter" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Create new user
        const user = await createUser({
            name,
            email,
            password,
            contact,
            nid,
        });

        // Return user without password
        const { password: _, ...userResponse } = user;

        return NextResponse.json({
            success: true,
            message: "User registered successfully!",
            user: userResponse,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to register user" },
            { status: 500 }
        );
    }
}
