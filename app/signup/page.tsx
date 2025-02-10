// pages/auth/signin.tsx
"use client";
import * as S from "./page.styles";
import { useState } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {
  DEFAULT_VALUES,
  ISignupProps,
  useFormValidation,
} from "./page.validation";
import { useKeycloakSignup } from "@/hooks/useKeycloackSignup";

export default function SignUp() {
  // TO DO: CHANGE TO HOOK FORM
  const [formData, setFormData] = useState<ISignupProps>(DEFAULT_VALUES); // Using state for POC reasons
  const { validateForm, fieldError, isValid } = useFormValidation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { signUp, loading, error } = useKeycloakSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Form validation:
    validateForm({ ...formData });

    if (isValid) signUp({ ...formData });
  };

  return (
    <S.Container>
      <S.ContentWrapper>
        <Image
          src={logo}
          alt={"LB Bank Logo"}
          width={175}
          height={64}
          priority
        />

        <S.FormContainer>
          <h1>Cadastrar</h1>
          <h2>Informe seus dados para realizar o cadastro na plataforma</h2>
          <S.FormArea onSubmit={handleSubmit}>
            <S.InputWrapper>
              <label htmlFor="username">CNPJ</label>
              <input
                type="text"
                id="username"
                value={formData.cnpj}
                onChange={(e) =>
                  setFormData((item) => ({ ...item, cnpj: e.target.value }))
                }
              />
            </S.InputWrapper>

            <S.InputWrapper>
              <label htmlFor="social-name">Razao social</label>
              <input
                type="text"
                id="social-name"
                value={formData.socialName}
                onChange={(e) =>
                  setFormData((item) => ({
                    ...item,
                    socialName: e.target.value,
                  }))
                }
              />
            </S.InputWrapper>

            <S.InputWrapper>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((item) => ({ ...item, email: e.target.value }))
                }
              />
            </S.InputWrapper>

            <S.InputWrapper>
              <label htmlFor="password">Senha</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((item) => ({ ...item, password: e.target.value }))
                }
              />
              {showPassword ? (
                <IoMdEyeOff
                  className="icon"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoMdEye
                  className="icon"
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </S.InputWrapper>
            {(error || fieldError) && (
              <p style={{ color: "red" }}>
                {fieldError || "Ocorreu um erro ao realizar o cadastro"}
              </p>
            )}

            <S.Button type="submit" disabled={loading}>
              {loading ? <S.Spinner /> : "Cadastrar"}
            </S.Button>
          </S.FormArea>
        </S.FormContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}
