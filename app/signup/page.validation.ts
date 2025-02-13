import { useState } from "react";

// TO DO: CHANGE TO USEFORM OR ANOTHER FORM LIBRARY
export interface ISignupProps {
  //  Company data:
  cnpj: string;
  socialName: string;

  //  Personal data:
  cpf: string;
  name: string;
  password: string;
  email: string;
}

export const DEFAULT_VALUES = {
  cnpj: "",
  socialName: "",
  cpf: "",
  name: "",
  password: "",
  email: "",
};

export const useFormValidation = () => {
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  function validateForm(formData: ISignupProps) {
    setIsValid(false);
    const auxErrors: string[] = [];

    const fieldKeys: string[] = Object.keys(formData);
    const fieldValues: string[] = Object.values(formData);

    fieldKeys.forEach((key, i) => {
      fieldValues.forEach((value, j) => {
        if (i === j && value.length === 0) auxErrors.push(key);
      });
    });

    // DEBUG:
    //console.log(auxErrors);
    setFieldErrors(auxErrors);
    if (auxErrors.length === 0) setIsValid(true);
  }

  function hasError(fieldKey: string) {
    console.log(fieldErrors);
    console.log(fieldKey);
    return fieldErrors.includes(fieldKey);
  }

  return { validateForm, hasError, fieldErrors, isValid };
};
