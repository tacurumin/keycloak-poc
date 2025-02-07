// pages/auth/signin.tsx
"use client";
import * as S from "./page.styles";
import { useState } from "react";
import { signIn } from "next-auth/react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await signIn("keycloak", {
      redirect: false, // Prevent automatic redirection
      username,
      password,
      callbackUrl: "http://localhost:3000",
    });

    if (result?.error) {
      setError("Nome de usuario ou senha incorretos");
    } else {
      // Redirect the user to the home page or a protected page
      redirect("/");
    }
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
          <h1>Entrar</h1>
          <h2>Use suas credenciais para acessar a plataforma</h2>
          <S.FormArea onSubmit={handleSubmit}>
            <S.InputWrapper>
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </S.InputWrapper>

            <S.InputWrapper>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </S.InputWrapper>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <S.Button type="submit">Entrar</S.Button>
          </S.FormArea>
        </S.FormContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}
