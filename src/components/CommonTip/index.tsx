import { message } from "antd";

const openSuccessMessage = (content: string) => {
  message.success(content);
};

const openWarningMessage = (content: string) => {
  message.warning(content);
};

const openErrorMessage = (content: string) => {
  message.error(content);
};

export { openSuccessMessage, openWarningMessage, openErrorMessage };
