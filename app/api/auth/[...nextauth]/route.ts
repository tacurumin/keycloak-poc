// src/app/api/auth/[...nextauth]/route.ts
import { authOptions } from "@/providers/authProvider";
import NextAuth from "next-auth";

// I choosed App Routes on the project creation.
// So in order to use NextAuth, we need to export the handler as GET and Post:
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
