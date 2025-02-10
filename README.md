## This is a POC that integrates Keycloak with NextAuth and NextJS using App Route

## Starting Keycloak server

From a terminal, enter the following command to start Keycloak:

```
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.1.1 start-dev
```

This command starts Keycloak exposed on the local port 8080 and creates an initial admin user with the username admin and password admin.

## Getting Started

First, you need to setup your Keycloak enviroment (realm and user). So follow the steps of the official website [Keycloak Setup](https://www.keycloak.org/getting-started/getting-started-docker).

Then, you need to create and setup the enviroment based on example.env file:

```
# Keycloak area:
KEYCLOAK_CLIENT_ID="Keycloak client id"
KEYCLOAK_CLIENT_SECRET="Keycloak client secret"
KEYCLOAK_ISSUER="http://localhost:8080/realms/Your keycloak realm"

# Keycloak public account service:
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID="Keycloak client id (can be the same, just need to setup the account-service)"
NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET="Keycloak client secret"
NEXT_PUBLIC_KEYCLOAK_ISSUER="http://localhost:8080/realms/Your keycloak realm"
NEXT_PUBLIC_KEYCLOAK_REGISTER_URL="http://localhost:8080/admin/realms/Your keycloak realm/users"

# Next auth setup:
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="" # Use the command: openssl rand -base64 32
```

After then .env setup, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Keycloak and Next Auth

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next Auth Documentation](https://next-auth.js.org/getting-started/introduction)
- [Keycloak Documentation](https://www.keycloak.org/documentation)
