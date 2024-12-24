// components/ClientSessionProvider.tsx
"use client"; // This ensures it's treated as a client-side component

import { SessionProvider } from "next-auth/react"; // Import SessionProvider

export default function ClientSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
