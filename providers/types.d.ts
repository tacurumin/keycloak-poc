import { JwtPayload } from "jwt-decode";
import { DefaultSession, DefaultUser } from "next-auth";

// Extended types do correctly get the JWT info.
declare module "next-auth" {
  export interface Session extends DefaultSession {
    id?: string;
    accessToken?: string;
    idToken?: string;
    user?: {
      name?: string;
      preferredUsername?: string;
      email?: string;
    };
  }

  export interface User extends DefaultUser {
    id?: string;
    idToken?: string;
    accessToken?: string;
    user?: {
      name?: string;
      preferredUsername?: string;
      email?: string;
    };
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    accessToken?: string;
    idToken?: string;
    sub?: string;
    iat?: number;
    exp?: number;
    user?: {
      name?: string;
      preferredUsername?: string;
      email?: string;
    };
  }
}

export interface JwtPayloadEnhanced extends JwtPayload {
  name?: string;
  preferred_username?: string;
  email?: string;
}
