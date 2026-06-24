import { useState } from "react";

export const useWindow = (initialUrl: string = "") => {
  const [currentUrl, setCurrentUrl] = useState<string>(initialUrl);
  const [inputUrl, setInputUrl] = useState<string>(initialUrl);
  const [viewMode, setViewMode] = useState<"homepage" | "iframe">(
    initialUrl ? "iframe" : "homepage",
  );
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const navigateTo = (url: string) => {
    const formattedUrl = url.trim().startsWith("http")
      ? url.trim()
      : `https://${url.trim()}`;
    setCurrentUrl(formattedUrl);
    setInputUrl(formattedUrl);
    setViewMode("iframe");
  };

  const goHome = () => {
    setViewMode("homepage");
    setCurrentUrl("");
    setInputUrl("");
  };

  const refreshPage = () => {
    if (viewMode === "iframe") {
      setRefreshKey((prev) => prev + 1);
    }
  };

  return {
    currentUrl,
    inputUrl,
    setInputUrl,
    viewMode,
    refreshKey,
    navigateTo,
    goHome,
    refreshPage,
  };
};
