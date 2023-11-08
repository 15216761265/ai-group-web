import Logo from "@assets/react.svg?react";
import Paint from "@assets/paint.svg?react";
import Home from "@assets/home.svg?react";
import Chat from "@assets/chat.svg?react";
import Create from "@assets/create.svg?react";
import Dashboard from "@assets/dashboard.svg?react";
import Library from "@assets/library.svg?react";
import Integration from "@assets/integration.svg?react";
import MyAccount from "@assets/myAccount.svg?react";
import BackHome from "@assets/backHome.svg?react";

type Props = {
  className?: string;
};

export const LogoIcon: React.FC<Props> = ({ className = "" }) => {
  return <Logo className={className} />;
};

export const PaintIcon: React.FC<Props> = ({ className = "" }) => {
  return <Paint className={className} />;
};

export const HomeIcon: React.FC<Props> = ({ className = "" }) => {
  return <Home className={className} />;
};

export const ChatIcon: React.FC<Props> = ({ className = "" }) => {
  return <Chat className={className} />;
};

export const CreateIcon: React.FC<Props> = ({ className = "" }) => {
  return <Create className={className} />;
};

export const DashboardIcon: React.FC<Props> = ({ className = "" }) => {
  return <Dashboard className={className} />;
};

export const LibraryIcon: React.FC<Props> = ({ className = "" }) => {
  return <Library className={className} />;
};

export const IntegrationIcon: React.FC<Props> = ({ className = "" }) => {
  return <Integration className={className} />;
};

export const MyAccountIcon: React.FC<Props> = ({ className = "" }) => {
  return <MyAccount className={className} />;
};

export const BackHomeIcon: React.FC<Props> = ({ className = "" }) => {
  return <BackHome className={className} />;
};
