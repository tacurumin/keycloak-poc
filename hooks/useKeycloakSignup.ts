import { ISignupProps } from "@/app/signup/page.validation";
import { redirect } from "next/navigation";
import { useState } from "react";

interface IServiceToken extends ISignupProps {
  serviceToken: string;
}

export const serviceTokenRequest = async () => {
  return fetch(
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
};

export const performUserSignupRequest = async ({
  cnpj,
  socialName,
  cpf,
  name,
  email,
  password,
  serviceToken,
}: IServiceToken) => {
  return fetch(`${process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_ISSUER}/users`, {
    method: "POST",
    mode: `cors`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceToken}`,
    },
    body: JSON.stringify({
      username: cpf,
      groups: [`${cnpj};${socialName}`],
      email,
      emailVerified: true, // Verify user email
      firstName: name,
      //lastName: socialName,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: password,
          temporary: false, // Make the password permanent
        },
      ],
    }),
  });
};

export const useKeycloakSignup = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const signUp = async ({
    cnpj,
    socialName,
    cpf,
    name,
    email,
    password,
  }: ISignupProps) => {
    setLoading(true); // Loading starts

    //  Used to store the service token
    let serviceToken: string = "";

    //  Getting the service token:
    const getServiceToken = await serviceTokenRequest(); // Request a service token
    const serviceTokenData = await getServiceToken.json();

    if (getServiceToken.ok && serviceTokenData.access_token) {
      serviceToken = serviceTokenData.access_token; // Store the service token
    } else {
      setLoading(false);
      setError(true); // Signup attempt failed
      return;
    }

    // Perform a signup:
    const performSignup = await performUserSignupRequest({
      cnpj,
      socialName,
      cpf,
      name,
      email,
      password,
      serviceToken,
    });

    // DEBUG:
    //const signupData = await performSignup.json();
    //console.log(signupData);

    if (performSignup.ok) {
      setLoading(false);
      setError(false);
      redirect("/signin"); // Signin redirection
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return { signUp, loading, error };
};
