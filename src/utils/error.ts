export const getErrorMessage = (error: any, defaultMessage: string): string => {
  const errorData = error?.response?.data;
  if (!errorData) {
    return error?.message || defaultMessage;
  }

  const msg = errorData.message || errorData.error;
  if (Array.isArray(msg)) {
    return msg.join(", ");
  }

  if (typeof msg === "string") {
    return msg;
  }

  return defaultMessage;
};
