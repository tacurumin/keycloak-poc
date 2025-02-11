import { JSX } from "react";
import * as S from "./LogoutWrapper.styles";

export const supportedRoles = [
  "owner-role",
  "admin-role",
  "moderator-role",
  "owner-role",
  "user-role",
];

export const getRoleComponent = (roles: string[]) => {
  let Chip: JSX.Element = <></>;
  roles.some((role) => {
    console.log(role);
    if (role === "owner-roles")
      return (Chip = <S.Chip $backgroundColor="#091255">{"CEO"}</S.Chip>);
    if (role === "admin-roles")
      return (Chip = (
        <S.Chip $backgroundColor="#085567">{"Administrador"}</S.Chip>
      ));
    if (role === "moderator-roles")
      return (Chip = <S.Chip $backgroundColor="#035f20">{"Moderador"}</S.Chip>);
    if (role === "super-user")
      return (Chip = (
        <S.Chip $backgroundColor="#736e05">{"Super usuario"}</S.Chip>
      ));
    if (role === "user")
      return (Chip = <S.Chip $backgroundColor="#642508">{"Usuario"}</S.Chip>);
  });
  return Chip;
};
