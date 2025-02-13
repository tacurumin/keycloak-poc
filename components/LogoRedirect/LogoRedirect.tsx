import Image from "next/image";
import logo from "../../public/logo.png";
import { redirect } from "next/navigation";

type Props = {
  to?: string;
};

export const LogoRedirect = ({ to }: Props) => {
  return (
    <Image
      src={logo}
      alt={"LB Bank Logo"}
      style={{ cursor: "pointer" }}
      width={175}
      height={64}
      priority
      onClick={() => redirect(to ? to : "/")}
    />
  );
};
