import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/collections/users";

// This is a one-time setup endpoint to create the first admin user
// After creating your admin, you should disable or delete this file for security

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const password = searchParams.get("password");
    const name = searchParams.get("name") || "Admin User";

    if (!email || !password) {
        return NextResponse.json(
            { success: false, message: "Email and password required in query params" },
            { status: 400 }
        );
    }

    return await setupAdmin({ email, password, name });
}

export async function POST(request) {
    try {
        const data = await request.json();
        return await setupAdmin(data);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Invalid JSON body" },
            { status: 400 }
        );
    }
}

async function setupAdmin({ email, password, name }) {
    try {
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
            name: name,
            email: email,
            password: password,
            contact: "0000000000",
            nid: "0000000000",
            role: "admin",
            isVerified: true,
        });

        const { password: _, ...adminResponse } = admin;

        return NextResponse.json({
            success: true,
            message: "Admin user created successfully!",
            user: adminResponse,
        });
    } catch (error) {
        console.error("Admin setup error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create admin user", details: error.message },
            { status: 500 }
        );
    }
}
