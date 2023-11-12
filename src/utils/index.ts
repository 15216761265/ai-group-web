import { openErrorMessage } from "@components/CommonTip";
import { AxiosError } from "axios";

export const handleApiError = (error) => {
  if (error instanceof AxiosError) {
    openErrorMessage(error.message);
  } else {
    openErrorMessage("Oops! Error occurred!");
  }
};
