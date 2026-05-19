export const formatDateTime = (
  value?: string | null
) => {
  if (!value) return "-";

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      dateStyle: "short",
      timeStyle: "medium",
      timeZone: "UTC",
    }
  ).format(new Date(value));
};
