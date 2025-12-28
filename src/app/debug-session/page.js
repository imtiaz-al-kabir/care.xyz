"use client";

import { useSession } from "next-auth/react";

export default function DebugSession() {
    const { data: session, status } = useSession();

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold mb-4">Session Debug</h1>

                <div className="space-y-4">
                    <div>
                        <strong>Status:</strong> {status}
                    </div>

                    <div>
                        <strong>Session Data:</strong>
                        <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
                            {JSON.stringify(session, null, 2)}
                        </pre>
                    </div>

                    {session?.user && (
                        <div className="mt-4 p-4 bg-blue-50 rounded">
                            <h2 className="font-bold mb-2">User Info:</h2>
                            <p><strong>Name:</strong> {session.user.name}</p>
                            <p><strong>Email:</strong> {session.user.email}</p>
                            <p><strong>ID:</strong> {session.user.id}</p>
                            <p><strong>Role:</strong> {session.user.role || "NOT SET"}</p>
                        </div>
                    )}

                    {session?.user?.role === "admin" ? (
                        <div className="p-4 bg-green-50 border border-green-200 rounded">
                            ✅ You have admin role! You should be able to access /admin
                        </div>
                    ) : (
                        <div className="p-4 bg-red-50 border border-red-200 rounded">
                            ❌ Admin role not found in session. Please logout and login again.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
