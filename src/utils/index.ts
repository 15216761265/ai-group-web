import { openErrorMessage } from "@components/CommonTip";
import { RcFile } from "antd/es/upload";
import { AxiosError } from "axios";

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    openErrorMessage("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    openErrorMessage("Image must smaller than 2MB!");
  }
  return false;
};

export const setCookies = (name, value, daysToExpire = 1) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieString =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";

  document.cookie = cookieString;
};

export const getCookies = (name) => {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    if (cookie[0] === name) {
      return decodeURIComponent(cookie[1]);
    }
  }

  return null;
};

export const handleApiError = (error) => {
  if (error instanceof AxiosError) {
    openErrorMessage(error.message);
  } else {
    openErrorMessage("Oops! Error occurred!");
  }
};
