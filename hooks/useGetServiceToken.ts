export const useGetServiceToken = () => {
  const getServiceToken = async () => {
    const tokenRequest = await fetch(
      `${process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ?? "",
          client_secret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET ?? "",
          grant_type: "client_credentials",
        }),
      }
    );

    if (tokenRequest.ok) {
      const serviceToken = await tokenRequest.json();
      return serviceToken.access_token as string;
    }
    return "";
  };

  return { getServiceToken };
};
