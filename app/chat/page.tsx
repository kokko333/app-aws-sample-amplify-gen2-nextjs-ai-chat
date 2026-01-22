"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import Link from "next/link";

export default function ChatPage() {
  const { user } = useAuthenticator();

  return (
    <main>
      <h1>Chat Page</h1>
      <p>Welcome, {user?.signInDetails?.loginId}</p>
      <p>Chat functionality will be implemented here.</p>
      <Link href="/">
        <button>← Back to Home</button>
      </Link>
    </main>
  );
}
