"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminTest() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dbUser, setDbUser] = useState(null);

    const [dbStats, setDbStats] = useState(null);

    useEffect(() => {
        // Fetch DB stats
        fetch('/api/debug-db')
            .then(r => r.json())
            .then(setDbStats)
            .catch(console.error);

        // Fetch user from database to compare
        if (session?.user?.email) {
            fetch(`/api/test-user?email=${session.user.email}`)
                .then(r => r.json())
                .then(data => setDbUser(data.user))
                .catch(console.error);
        }
    }, [session]);

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-3xl font-bold mb-6">🔍 Admin Access Diagnostic</h1>

                    {/* Session Status */}
                    <div className="mb-6 p-4 bg-blue-50 rounded">
                        <h2 className="font-bold text-lg mb-2">1. Session Status</h2>
                        <p className="mb-2"><strong>Status:</strong> <span className="font-mono">{status}</span></p>
                        <p><strong>Logged In:</strong> {session ? "✅ Yes" : "❌ No"}</p>
                    </div>

                    {/* Session Data */}
                    {session && (
                        <div className="mb-6 p-4 bg-green-50 rounded">
                            <h2 className="font-bold text-lg mb-2">2. Session User Data</h2>
                            <div className="space-y-1">
                                <p><strong>Name:</strong> {session.user.name}</p>
                                <p><strong>Email:</strong> {session.user.email}</p>
                                <p><strong>ID:</strong> {session.user.id || "NOT SET"}</p>
                                <p><strong>Role in Session:</strong> <span className={session.user.role === "admin" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{session.user.role || "NOT SET ❌"}</span></p>
                            </div>
                        </div>
                    )}

                    {/* Database User */}
                    {dbUser && (
                        <div className="mb-6 p-4 bg-purple-50 rounded">
                            <h2 className="font-bold text-lg mb-2">3. Database User Data</h2>
                            <div className="space-y-1">
                                <p><strong>Name:</strong> {dbUser.name}</p>
                                <p><strong>Email:</strong> {dbUser.email}</p>
                                <p><strong>Role in DB:</strong> <span className={dbUser.role === "admin" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{dbUser.role}</span></p>
                            </div>
                        </div>
                    )}

                    {/* Diagnosis */}
                    <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded">
                        <h2 className="font-bold text-lg mb-2">4. Diagnosis</h2>
                        {!session ? (
                            <p className="text-red-600">❌ You are not logged in. Please login first.</p>
                        ) : session.user.role === "admin" ? (
                            <p className="text-green-600">✅ Your session has admin role! You should be able to access /admin</p>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-red-600">❌ Admin role NOT in session</p>
                                {dbUser?.role === "admin" ? (
                                    <div className="mt-2 p-3 bg-white rounded">
                                        <p className="font-bold mb-2">✅ Database has admin role</p>
                                        <p className="text-sm">The issue: Your session was created before the role was set.</p>
                                        <p className="text-sm font-bold mt-2">Solution: Logout and login again to refresh the session.</p>
                                    </div>
                                ) : (
                                    <p className="text-red-600">❌ Database also doesn't have admin role</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Database Stats */}
                    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded">
                        <h2 className="font-bold text-lg mb-2">DB. Database Connection Stats</h2>
                        {dbStats ? (
                            <div className="space-y-2">
                                <p><strong>Database Name:</strong> <span className="font-mono text-blue-600">{dbStats.database}</span></p>
                                <p><strong>Collections Found:</strong> {dbStats.collections?.join(", ") || "None"}</p>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    {dbStats.documentCounts && Object.entries(dbStats.documentCounts).map(([name, count]) => (
                                        <div key={name} className="p-2 bg-white rounded border border-gray-100">
                                            <span className="text-sm font-medium">{name}:</span> <span className="font-bold">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>Loading DB stats...</p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <h2 className="font-bold text-lg mb-2">5. Actions</h2>

                        {session && (
                            <button
                                onClick={() => signOut({ callbackUrl: '/login' })}
                                className="w-full py-3 px-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
                            >
                                🚪 Logout and Go to Login
                            </button>
                        )}

                        {session?.user?.role === "admin" && (
                            <button
                                onClick={() => router.push('/admin')}
                                className="w-full py-3 px-6 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700"
                            >
                                🎯 Try Accessing Admin Dashboard
                            </button>
                        )}
                    </div>

                    {/* Raw Data */}
                    <details className="mt-6">
                        <summary className="cursor-pointer font-bold">Show Raw Session Data</summary>
                        <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto text-xs">
                            {JSON.stringify(session, null, 2)}
                        </pre>
                    </details>
                </div>
            </div>
        </div>
    );
}
