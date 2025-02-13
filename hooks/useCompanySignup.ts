import { ISignupProps } from "@/app/signup/page.validation";
import { redirect } from "next/navigation";
import { useState } from "react";
import {
  performUserSignupRequest,
  serviceTokenRequest,
} from "./useKeycloakSignup";

type IRoles = {
  clientRole: boolean;
  composite: boolean;
  containerId: string;
  description: string;
  id: string;
  name: string;
};

type ISimpleGroupProps = {
  id: string;
  name: string;
};

type ICreateGroup = {
  cnpj: string;
  socialName: string;
  serviceToken: string;
};

export const createGroupRequest = async ({
  cnpj,
  socialName,
  serviceToken,
}: ICreateGroup) => {
  return fetch(`${process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_ISSUER}/groups`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceToken}`,
    },
    body: JSON.stringify({
      name: `${cnpj};${socialName}`,
    }),
  });
};

export const getRealmRoles = async (serviceToken: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_ISSUER}/roles`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceToken}`,
    },
  });
};

export const assignRolesToGroup = async (
  groupId: string,
  serviceToken: string,
  roles: IRoles[]
) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_ISSUER}/groups/${groupId}/role-mappings/realm`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceToken}`,
      },
      body: JSON.stringify(
        roles.map((role) => {
          return {
            id: role.id,
            name: role.name,
          };
        })
      ),
    }
  );
};

export const getAllGroups = async (serviceToken: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_ISSUER}/groups`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceToken}`,
    },
  });
};

export const useCompanySignup = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const companySignUp = async ({
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

    //  Fetching the valid realm roles:
    const realmRolesRequest = await getRealmRoles(serviceToken);
    let validRoles: IRoles[] = [];

    if (realmRolesRequest.ok) {
      validRoles = (await realmRolesRequest.json()) as IRoles[];
    } else {
      setLoading(false);
      setError(true);
      return;
    }

    //  Creation of the group related with the company:
    const groupRequest = await createGroupRequest({
      cnpj,
      socialName,
      serviceToken,
    });

    // Company creation attempt failed:
    if (!groupRequest.ok) {
      setLoading(false);
      setError(true);
      return;
    }

    //  Gets the ID of the group being created to assign the realm roles:
    const getGroupsRequest = await getAllGroups(serviceToken);
    let groupId: string = "";
    if (getGroupsRequest.ok) {
      const groupList = (await getGroupsRequest.json()) as ISimpleGroupProps[];
      groupId = groupList.filter(
        (group) => group.name === `${cnpj};${socialName}`
      )[0].id;
    } else {
      setLoading(false);
      setError(true);
      return;
    }

    // Assign the fetched roles to the group being created:
    const assignRolesRequest = await assignRolesToGroup(
      groupId,
      serviceToken,
      validRoles
    );

    if (!assignRolesRequest.ok) {
      setLoading(false);
      setError(true);
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

  return { companySignUp, loading, error };
};
