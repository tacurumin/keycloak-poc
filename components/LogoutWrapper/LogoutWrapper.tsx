"use client";
import * as S from "./LogoutWrapper.styles";
import { signOut } from "next-auth/react";
import logo from "../../public/logo.png";
import Image from "next/image";

type Props = {
  username: string;
};

export default function Logout({ username }: Props) {
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
          <h2>{`${username} acessou com sucesso a plataforma!`}</h2>

          <S.Button type="submit" onClick={() => signOut()}>
            Sair
          </S.Button>
        </S.DataContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}
