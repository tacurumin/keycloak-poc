import { useState } from "react";

// TO DO: CHANGE TO USEFORM OR ANOTHER FORM LIBRARY
export interface ISignupProps {
  cnpj: string;
  socialName: string;
  password: string;
  email: string;
}

export const DEFAULT_VALUES = {
  cnpj: "",
  socialName: "",
  password: "",
  email: "",
};

export const useFormValidation = () => {
  const [fieldError, setFieldError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  function validateForm({ cnpj, socialName, password, email }: ISignupProps) {
    setFieldError("");
    setIsValid(false);

    if (cnpj.length === 0) {
      setFieldError("Campo CNPJ invalido");
      return;
    }
    if (socialName.length === 0) {
      setFieldError("Campo razao social invalido");
      return;
    }

    if (email.length === 0) {
      setFieldError("Campo email invalido");
      return;
    }

    if (password.length === 0) {
      setFieldError("Campo senha invalido");
      return;
    }

    if (fieldError === "") setIsValid(true);
  }

  return { validateForm, fieldError, isValid };
};

// Input masking:
export const cnpjMask = (value: string) => {
  return value
    .replace(/\D+/g, "") // não deixa ser digitado nenhuma letra
    .replace(/(\d{2})(\d)/, "$1.$2") // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2") // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1"); // captura os dois últimos 2 números, com um - antes dos dois números
};

export const removeMask = (value: string) => {
  console.log(value);
  return value.replace(/\W/g, "");
};
