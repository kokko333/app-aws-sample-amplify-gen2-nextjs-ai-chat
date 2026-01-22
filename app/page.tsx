"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

export default function App() {
  const { user, signOut } = useAuthenticator();

  return (
    <main>
      <h1>APP HOME</h1>
      <p>Welcome, {user?.signInDetails?.loginId}</p>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <Link href="/chat">
          <button>💬 Chat</button>
        </Link>
        <Link href="/todo">
          <button>✓ Todo</button>
        </Link>
      </div>

      <button onClick={signOut} style={{ marginTop: "2rem" }}>
        Sign out
      </button>
    </main>
  );
}
