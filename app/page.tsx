"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

export default function App() {
  const { user, signOut } = useAuthenticator();

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-purple-600 mb-4 text-center">APP HOME</h1>
        <p className="text-gray-700 mb-8 text-center">
          Welcome, <span className="font-semibold">{user?.signInDetails?.loginId}</span>
        </p>

        <div className="flex gap-4 mb-6">
          <Link href="/chat" className="flex-1">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md">
              💬 Chat
            </button>
          </Link>
          <Link href="/todo" className="flex-1">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md">
              ✓ Todo
            </button>
          </Link>
        </div>

        <button
          onClick={signOut}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
