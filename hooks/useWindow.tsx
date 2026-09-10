import { useState, useEffect } from "react";
import { useDesktopContext } from "@/context/DesktopContext";

export const useWindow = (windowId?: string, initialUrl: string = "") => {
  const { windows, pushWindowHistory } = useDesktopContext();

  const currentWindow = windows.find((w) => w.id === windowId);
  const activeUrl = currentWindow?.url ?? initialUrl;

  const [currentUrl, setCurrentUrl] = useState<string>(activeUrl);
  const [inputUrl, setInputUrl] = useState<string>(activeUrl);
  const [viewMode, setViewMode] = useState<"homepage" | "iframe">(
    activeUrl ? "iframe" : "homepage",
  );
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Sync internal view state whenever popWindowHistory updates currentWindow.url
  useEffect(() => {
    if (currentWindow?.url !== undefined) {
      const newUrl = currentWindow.url;
      setCurrentUrl(newUrl);
      setInputUrl(newUrl);
      setViewMode(newUrl ? "iframe" : "homepage");
    }
  }, [currentWindow?.url]);

  const navigateTo = (url: string) => {
    const formattedUrl = url.trim().startsWith("http")
      ? url.trim()
      : `https://${url.trim()}`;

    setCurrentUrl(formattedUrl);
    setInputUrl(formattedUrl);
    setViewMode("iframe");

    if (windowId) {
      pushWindowHistory(windowId, formattedUrl);
    }
  };

  const goHome = () => {
    setViewMode("homepage");
    setCurrentUrl("");
    setInputUrl("");

    if (windowId) {
      pushWindowHistory(windowId, "");
    }
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
