import { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from "react";
import * as S from "./Button.styles";

export const Button = ({
  //icon,
  buttonType = "primary",
  isLoading = false,
  type,
  onClick,
  disabled,
  text,
}: Props) => {
  return (
    <S.Button
      className={buttonType}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {isLoading ? <S.Spinner className={buttonType} /> : text}
    </S.Button>
  );
};

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: JSX.Element;
  buttonType?: "primary" | "secondary";
  isLoading?: boolean;
  text?: string;
}
