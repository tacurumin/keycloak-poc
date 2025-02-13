import * as S from "./Input.styles";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export const Input = ({
  name,
  id,
  hasError,
  maxLength,
  labelText,
  value,
  onChange,
  type = "text",
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string | undefined>(type);

  return (
    <S.InputWrapper>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        name={name}
        className={hasError ? "error" : ""}
        type={inputType}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />

      {type === "password" && showPassword && (
        <IoMdEyeOff
          className="icon"
          size={20}
          onClick={() => {
            setInputType(type);
            setShowPassword(!showPassword);
          }}
        />
      )}
      {type === "password" && !showPassword && (
        <IoMdEye
          className="icon"
          size={20}
          onClick={() => {
            setInputType("text");
            setShowPassword(!showPassword);
          }}
        />
      )}
    </S.InputWrapper>
  );
};

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelText?: string;
  hasError?: boolean;
}
