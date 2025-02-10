// pages/auth/signin.tsx
"use client";
import * as S from "./page.styles";
import { useState } from "react";
import { signIn } from "next-auth/react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    const result = await signIn("keycloak", {
      redirect: false, // Prevent automatic redirection
      username,
      password,
      callbackUrl: "http://localhost:3000",
    });
    setLoading(false);

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
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {error && <p style={{ color: "red" }}>{error}</p>}

            <S.Button type="submit" disabled={loading}>
              {loading ? <S.Spinner /> : "Entrar"}
            </S.Button>
          </S.FormArea>
          <S.Button
            className="secondary"
            type="submit"
            onClick={() => redirect("/signup")}
          >
            Cadastrar
          </S.Button>
        </S.FormContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}
