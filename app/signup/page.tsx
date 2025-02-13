/* eslint-disable react-hooks/exhaustive-deps */
// pages/auth/signup.tsx
"use client";
import * as S from "./page.styles";
import { useEffect, useState } from "react";
import { MdApartment, MdOutlinePersonAddAlt } from "react-icons/md";
import {
  DEFAULT_VALUES,
  ISignupProps,
  useFormValidation,
} from "./page.validation";
import { LogoRedirect } from "@/components/LogoRedirect/LogoRedirect";
import { useCreateOrganization } from "@/hooks/useCreateOrganization";
import { Input } from "@/components/Input/Input";
import { Button } from "@/components/Button/Button";
import { Stepper } from "@/components/Stepper/Stepper";
import { cnpjMask, cpfMask, removeMask } from "@/utils/utils";

export default function SignUp() {
  // TO DO: CHANGE TO HOOK FORM
  const [formData, setFormData] = useState<ISignupProps>(DEFAULT_VALUES); // Using state for POC reasons
  const { validateForm, hasError, isValid } = useFormValidation();

  const { createOrganization, loading } = useCreateOrganization();

  const [signupStep, setSignupStep] = useState<"CORP" | "PERSON">("CORP"); // Controls the stepper

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    //if (isValid)
    createOrganization({
      cnpj: removeMask(formData.cnpj),
      socialName: formData.socialName,
    });

    setSignupStep("PERSON");
  };

  // Form validation onChange:
  useEffect(() => {
    validateForm(formData);
  }, [formData]);

  return (
    <S.Container>
      <S.ContentWrapper>
        <LogoRedirect />

        <S.FormContainer>
          <h1>Cadastrar</h1>

          <Stepper
            steps={[
              {
                icon: <MdApartment className="icon" size={24} />,
                name: "Dados Corporativos",
                description: "Informacoes basicas relacionadas a sua empresa",
              },
              {
                icon: <MdOutlinePersonAddAlt className="icon" size={24} />,
                name: "Dados Pessoais",
                description:
                  "Informacoes basicas relacionadas ao administrador",
              },
            ]}
            activeStep={signupStep === "CORP" ? 0 : 1}
          />

          <S.FormArea onSubmit={handleSubmit}>
            {signupStep === "CORP" && (
              <>
                <Input
                  id="cnpj"
                  labelText="CNPJ"
                  type="text"
                  hasError={hasError("cnpj")}
                  maxLength={18}
                  value={cnpjMask(formData.cnpj)}
                  onChange={(e) =>
                    setFormData((item) => ({ ...item, cnpj: e.target.value }))
                  }
                />

                <Input
                  id="social-name"
                  labelText="Razao social"
                  hasError={hasError("socialName")}
                  value={formData.socialName}
                  onChange={(e) =>
                    setFormData((item) => ({
                      ...item,
                      socialName: e.target.value,
                    }))
                  }
                />
              </>
            )}

            {signupStep === "PERSON" && (
              <>
                <Input
                  id="cpf"
                  labelText="CPF"
                  hasError={hasError("cpf")}
                  maxLength={14}
                  value={cpfMask(formData.cpf)}
                  onChange={(e) =>
                    setFormData((item) => ({ ...item, cpf: e.target.value }))
                  }
                />

                <Input
                  id="name"
                  labelText="Nome"
                  hasError={hasError("name")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((item) => ({
                      ...item,
                      name: e.target.value,
                    }))
                  }
                />

                <Input
                  id="email"
                  labelText="Email"
                  hasError={hasError("email")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((item) => ({
                      ...item,
                      email: e.target.value,
                    }))
                  }
                />

                <Input
                  id="password"
                  labelText="Senha"
                  type="password"
                  hasError={hasError("password")}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((item) => ({
                      ...item,
                      password: e.target.value,
                    }))
                  }
                />
              </>
            )}

            <Button
              type="submit"
              disabled={loading}
              isLoading={loading}
              text="Cadastrar"
            />
          </S.FormArea>
        </S.FormContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}
