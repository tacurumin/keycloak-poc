"use client";
import * as S from "./LogoutWrapper.styles";
import { signOut } from "next-auth/react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { IUserOptions } from "@/providers/types";
import { getRoleName } from "./utils";

type Props = {
  user?: IUserOptions;
};

export default function Logout({ user }: Props) {
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

        <S.DataContainer>
          <h1>Bem vindo!</h1>
          <h2>
            <b>{user?.givenName || user?.preferredUsername}</b>
            {" acessou com sucesso a plataforma!"}
          </h2>

          {user?.group && (
            <h2>
              {"Voce faz parte da organizacao: "}
              <b>{user?.group[0] || ""}</b>
            </h2>
          )}

          {user?.roles && (
            <h2>
              {"Seu nivel de acesso e: "}
              <b>{getRoleName(user.roles)}</b>
            </h2>
          )}

          <S.Button type="submit" onClick={() => signOut()}>
            Sair
          </S.Button>
        </S.DataContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}
