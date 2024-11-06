/* eslint-disable no-undef */
import { message } from "antd";
import { Translation } from "react-i18next";

export const showToastSuccess = (messageData, dynamicOBj) => {
  message.destroy();
  message.success(
    <Translation>{(t) => <>{t(messageData, dynamicOBj)}</>}</Translation>
  );
};

export const showToastError = (messageData, dynamicOBj) => {
  message.destroy();
  message.error(
    <Translation>{(t) => <>{t(messageData, dynamicOBj)}</>}</Translation>
  );
};

export const getBaseURL = () => {
  return process.env.VITE_BASE_URL;
};
