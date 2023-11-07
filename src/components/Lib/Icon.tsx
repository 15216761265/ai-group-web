import Logo from "@assets/react.svg?react";

type Props = {
  className?: string;
};

export const LogoIcon: React.FC<Props> = ({ className = "" }) => {
  return <Logo className={className} />;
};
