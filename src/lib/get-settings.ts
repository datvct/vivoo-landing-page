export async function getHomeSettings() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");
  try {
    const res = await fetch(`${backendUrl}/site-settings/home`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data?.value || null;
    }
  } catch (error) {
    // Ignore and fallback
  }
  return null;
}

export async function getGeneralSettings() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";
  const backendUrl = apiBase.replace("/api", "");

  try {
    const res = await fetch(`${backendUrl}/site-settings/general`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const result = await res.json();
      return result?.data?.value || null;
    }
  } catch (error) {
    // Ignore and fallback
  }
  return null;
}