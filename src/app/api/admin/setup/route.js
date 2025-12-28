import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/collections/users";

// This is a one-time setup endpoint to create the first admin user
// After creating your admin, you should disable or delete this file for security

export async function POST(request) {
    try {
        const { email, password, name } = await request.json();

        // Check if admin already exists
        const existingAdmin = await findUserByEmail(email);
        if (existingAdmin) {
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Create admin user
        const admin = await createUser({
            name: name || "Admin User",
            email: email,
            password: password,
            contact: "0000000000",
            nid: "0000000000",
            role: "admin", // Set as admin
            isVerified: true,
        });

        const { password: _, ...adminResponse } = admin;

        return NextResponse.json({
            success: true,
            message: "Admin user created successfully! You can now login and access /admin",
            user: adminResponse,
        });
    } catch (error) {
        console.error("Admin setup error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create admin user" },
            { status: 500 }
        );
    }
}
