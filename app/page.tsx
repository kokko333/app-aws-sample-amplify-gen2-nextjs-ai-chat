"use client"; // クライアントサイドで実行される

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

export default function App() {
  const { user, signOut } = useAuthenticator();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-white p-8">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h1 className="mb-4 text-center text-4xl font-bold text-purple-600">APP HOME</h1>
        <p className="mb-8 text-center text-gray-700">
          Welcome, <span className="font-semibold">{user?.signInDetails?.loginId}</span>
        </p>

        <div className="mb-6 flex gap-4">
          <Link href="/chat/new" className="flex-1">
            <button className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-600">
              💬 Chat
            </button>
          </Link>
          <Link href="/todo" className="flex-1">
            <button className="w-full rounded-lg bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-green-600">
              ✓ Todo
            </button>
          </Link>
        </div>

        <button
          onClick={signOut}
          className="w-full rounded-lg bg-gray-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-gray-600"
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
