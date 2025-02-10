import { JwtPayload } from "jwt-decode";
import { DefaultSession, DefaultUser } from "next-auth";

// Extended types do correctly get the JWT info.
export interface IUserOptions {
  name?: string;
  givenName?: string;
  preferredUsername?: string;
  email?: string;
  group?: string[];
  roles?: string[];
}

declare module "next-auth" {
  export interface Session extends DefaultSession {
    id?: string;
    accessToken?: string;
    idToken?: string;
    user?: IUserOptions;
  }

  export interface User extends DefaultUser {
    id?: string;
    idToken?: string;
    accessToken?: string;
    user?: IUserOptions;
  }
}

declare module "next-auth/jwt" {
  export interface JWT {
    accessToken?: string;
    idToken?: string;
    sub?: string;
    iat?: number;
    exp?: number;
    user?: IUserOptions;
  }
}

export interface JwtPayloadEnhanced extends JwtPayload {
  name?: string;
  preferred_username?: string;
  given_name?: string;
  email?: string;
  group?: string[];
  realm_access?: {
    roles?: string[];
  };
}
