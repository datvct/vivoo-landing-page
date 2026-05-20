export const generateSlug = (title: string): string => {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return "";
  }

  const vietnameseCharMap: Record<string, string> = {
    đ: "d",
    Đ: "d",
  };

  const normalizedTitle = trimmedTitle
    .toLowerCase()
    .replace(/[đĐ]/g, (char) => vietnameseCharMap[char] || char)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return normalizedTitle
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};
