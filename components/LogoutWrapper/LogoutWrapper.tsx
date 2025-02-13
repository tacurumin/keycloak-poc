"use client";
import * as S from "./LogoutWrapper.styles";
import { signOut } from "next-auth/react";
import { IUserOptions } from "@/providers/types";
import { getRoleComponent } from "./utils";
import { LogoRedirect } from "../LogoRedirect/LogoRedirect";

type Props = {
  user?: IUserOptions;
};

export default function Logout({ user }: Props) {
  return (
    <S.Container>
      <S.ContentWrapper>
        <LogoRedirect />

        <S.DataContainer>
          <h1>
            Bem vindo, <b>{`${user?.givenName || user?.preferredUsername}!`}</b>
          </h1>

          {user?.group && user?.roles && (
            <p className="company-and-access-level">
              {user?.group[0] || ""}
              {getRoleComponent(user.roles)}
            </p>
          )}

          <S.Button type="submit" onClick={() => signOut()}>
            Sair
          </S.Button>
        </S.DataContainer>
      </S.ContentWrapper>
    </S.Container>
  );
}
