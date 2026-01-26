"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { cn } from "@/lib/utils";

interface ProfileProps {
  className?: string;
}

export default function Profile({ className }: ProfileProps) {
  const { user } = useAuthenticator(context => [context.user]);
  const username = user?.signInDetails?.loginId ?? "";

  return <div className={cn("mb-3 text-sm font-medium", className)}>{username}</div>;
}
