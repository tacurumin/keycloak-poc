import { useState } from "react";
import { useGetServiceToken } from "./useGetServiceToken";
import { cnpjMask, removeAccents } from "@/utils/utils";

type IOrganizationData = {
  cnpj: string;
  socialName: string;
};

export const createOrganizationService = async (
  serviceToken: string,
  organization: IOrganizationData
) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_KEYCLOAK_ADMIN_ISSUER}/organizations`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceToken}`,
      },
      body: JSON.stringify({
        name: organization.cnpj,
        alias: organization.socialName.replaceAll(" ", "-"),
        domains: [
          {
            name: removeAccents(organization.socialName)
              .toLowerCase()
              .replaceAll(" ", "-"),
            verified: true,
          },
        ],
        description: `Partner: ${organization.socialName} - CNPJ: ${cnpjMask(
          organization.cnpj
        )}`,
      }),
    }
  );
};

export const useCreateOrganization = () => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { getServiceToken } = useGetServiceToken();

  const createOrganization = async ({
    cnpj,
    socialName,
  }: IOrganizationData) => {
    setLoading(true); // Loading starts
    const serviceToken = await getServiceToken();

    if (serviceToken) {
      const organizationReq = await createOrganizationService(serviceToken, {
        cnpj,
        socialName,
      });

      setLoading(false);
      if (organizationReq.ok) {
        setError(false);
        return;
      } else {
        setError(true);
        return;
      }
    }
  };

  return { createOrganization, loading, error };
};
