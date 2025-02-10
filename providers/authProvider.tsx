import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadEnhanced } from "./types";

export const authOptions: NextAuthOptions = {
  providers: [
    // NextAuth do have a specific Keycloak Provider. But in order to have a custom Signin page
    // without changing the Keycloak theme, I decided to use the CredentialsProvides instead.
    CredentialsProvider({
      id: "keycloak",
      name: "Keycloak",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Perform a REST request to the Keycloak API to get the JWT:
        const res = await fetch(
          `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.KEYCLOAK_CLIENT_ID ?? "",
              client_secret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
              username: credentials?.username ?? "",
              password: credentials?.password ?? "",
              grant_type: "password",
            }),
          }
        );

        const data = await res.json();
        //console.log(data);

        if (res.ok && data.access_token) {
          const decodedJWT = jwtDecode<JwtPayloadEnhanced>(data.access_token);
          // DEBUG:
          //console.log(decodedJWT);

          // The information stored here, will be returned in the "User" object
          // in the callback section.
          return {
            id: decodedJWT.sub ?? "",
            idToken: decodedJWT.jti,
            accessToken: data.access_token,
            user: {
              name: decodedJWT.name,
              givenName: decodedJWT.given_name,
              preferredUsername: decodedJWT.preferred_username,
              email: decodedJWT.email,
              group: decodedJWT.group,
              roles: decodedJWT.realm_access?.roles,
            },
          };
        }

        return null; // Authentication failed
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Custom signin page (App Routing)
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.idToken = user.idToken;
        token.accessToken = user.accessToken;
        token.user = {
          name: user.user?.name,
          givenName: user.user?.givenName,
          preferredUsername: user.user?.preferredUsername,
          email: user.user?.email,
          group: user.user?.group,
          roles: user.user?.roles,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.id = token.sub;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.user = {
        name: token.user?.name,
        givenName: token.user?.givenName,
        preferredUsername: token.user?.preferredUsername,
        email: token.user?.name,
        roles: token.user?.roles,
        group: token.user?.group,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
