import { useState } from "react";
import { useWindow } from "@/hooks/useWindow";
import { ArrowLeft, Home, RotateCw } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useSearch } from "@/hooks/useSearch";
import { SearchBar } from "@/components/ui/custom/SearchBar";
import { websites } from "@/config/websites";

const Browser = () => {
  const {
    currentUrl,
    inputUrl,
    setInputUrl,
    viewMode,
    refreshKey,
    navigateTo,
    goHome,
    refreshPage,
  } = useWindow();

  const [filteredSite, setFilteredSite] = useState<(typeof websites)[0] | null>(
    null,
  );
  const search = useSearch(websites);

  // Helper function to handle custom URL submissions or text searches
  const handleUrlSubmit = (query: string) => {
    if (!query) return;

    const cleanQuery = query.trim();

    // Check if they typed a pre-configured website name
    const exactMatch = websites.find(
      (site) => site.name.toLowerCase() === cleanQuery.toLowerCase(),
    );

    if (exactMatch) {
      if (exactMatch.isIFrameBlocked) {
        window.open(exactMatch.url, "_blank", "noopener,noreferrer");
      } else {
        navigateTo(exactMatch.url);
      }
    } else {
      // Otherwise, treat it as a direct URL entry
      navigateTo(cleanQuery);
    }
  };

  const displayedWebsites = filteredSite ? [filteredSite] : websites;

  const [expandedSites, setExpandedSites] = useState<Record<string, boolean>>(
    {},
  );

  const toggleExpanded = (siteName: string) => {
    setExpandedSites((prev) => ({
      ...prev,
      [siteName]: !prev[siteName],
    }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      {/* Top Browser Control Bar */}
      <div className="flex items-center gap-3 px-4 py-1 bg-[#FDFBF7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
        <div className="flex items-center gap-1.5 text-zinc-600">
          <Button
            variant="window"
            onClick={goHome}
            disabled={viewMode === "homepage"}
            className="p-1 hover:bg-zinc-200/50 rounded disabled:opacity-30 transition"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="window"
            onClick={() => {
              goHome();
              setFilteredSite(null);
              search.setQuery("");
            }}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <Home className="size-4" />
          </Button>
          <Button
            variant="window"
            onClick={refreshPage}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <RotateCw className="size-4" />
          </Button>
        </div>

        {/* Address Bar */}
        <div
          className="flex-1 mr-4"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUrlSubmit(inputUrl);
          }}
        >
          <SearchBar
            value={inputUrl}
            onChange={(val) => {
              setInputUrl(val);
              if (!val) setFilteredSite(null); // Clear filter if text is deleted
            }}
            items={websites}
            placeholder="Search Googly or type a URL..."
            onSelect={(item) => {
              setFilteredSite(item);
              setInputUrl(item.name);
            }}
            className="w-full bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-lg flex items-center shadow-sm text-zinc-400 select-none transition-all focus-within:border-zinc-400 dark:focus-within:border-zinc-500"
            inputClassName="text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
            itemToStringValue={(item) => item.name}
          />
        </div>
      </div>

      {/* Main Window Canvas Viewport */}
      <div className="flex-1 w-full bg-white dark:bg-popover overflow-y-auto">
        {viewMode === "homepage" ? (
          /* ================= GOOGLE HOMEPAGE CUSTOM INDEX ================= */
          <div className="max-w-2xl mx-auto px-6 py-4 flex flex-col">
            <div className="w-full flex items-center gap-4 mb-6 border-b border-zinc-200 dark:border-border pb-4">
              <h1
                className="text-4xl font-extrabold bg-clip-text text-amber-600 select-none shrink-0 py-1 cursor-pointer"
                onClick={() => {
                  setFilteredSite(null);
                  search.setQuery("");
                }} // Reset on logo click
              >
                Googly
              </h1>
              <div
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUrlSubmit(search.query);
                }}
              >
                <SearchBar
                  value={search.query}
                  onChange={(val) => {
                    search.setQuery(val);
                    if (!val) setFilteredSite(null);
                  }}
                  items={websites}
                  placeholder="Search websites..."
                  onSelect={(item) => {
                    setFilteredSite(item);
                    search.setQuery(item.name);
                  }}
                  className="w-full bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-full flex items-center shadow-sm text-zinc-400 select-none transition-all focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-500"
                  inputClassName="text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
                />
              </div>
            </div>

            {/* "Show result" or "Clear filter" banner */}
            {filteredSite && (
              <div className="mb-4 text-sm text-zinc-500 flex gap-2 items-center">
                <span>Showing result for {filteredSite.name}</span>
                <Button
                  onClick={() => {
                    setFilteredSite(null);
                    search.setQuery("");
                  }}
                  className="text-amber-600 hover:underline font-medium"
                >
                  Clear filter
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-6 max-w-2xl">
              {displayedWebsites.map((site) => {
                const displayUrl = site.url
                  .replace("https://", "")
                  .replace("www.", "")
                  .split("/")
                  .filter(Boolean)
                  .join(" › ");

                return (
                  <div
                    key={site.name}
                    className="flex items-start justify-between gap-4"
                  >
                    {/* Left Side: Content */}
                    <div className="flex-1 min-w-0 flex flex-col">
                      {/* Header: Icon & Breadcrumb */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className="size-7 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden">
                          {site.icon.type === "emoji" ? (
                            <span className="text-lg">{site.icon.value}</span>
                          ) : (
                            <Image
                              src={site.icon.value}
                              alt={`${site.name} icon`}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex flex-col text-left leading-tight min-w-0 flex-1">
                          <span className="text-xs font-normal text-foreground truncate">
                            {site.stack.join(" - ")}
                          </span>
                          <span className="text-[10px] text-zinc-500 break-all whitespace-normal">
                            {displayUrl}
                          </span>
                        </div>
                      </div>

                      {/* Title Link */}
                      <Button
                        variant="link"
                        onClick={handleUrlSubmit.bind(null, site.name)}
                        className="h-auto p-0 text-xl text-foreground hover:text-primary hover:underline font-medium leading-tight mb-1 justify-start text-left whitespace-normal"
                      >
                        {site.name}
                      </Button>

                      {/* Description Snippet with Inline Read More */}
                      <div className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug">
                        <p
                          className={
                            expandedSites[site.name]
                              ? "whitespace-pre-line"
                              : "line-clamp-3"
                          }
                        >
                          {expandedSites[site.name]
                            ? (site.fullDesc ?? site.desc)
                            : site.desc}
                        </p>

                        {site.hasReadMore && (
                          <Button
                            variant="link"
                            onClick={() => toggleExpanded(site.name)}
                            className="h-auto p-0 mt-1 text-primary hover:underline"
                          >
                            {expandedSites[site.name]
                              ? "Show Less"
                              : "Read More"}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Right Side: Google-style square snippet thumbnail */}
                    <Button
                      variant="window"
                      onClick={handleUrlSubmit.bind(null, site.name)}
                      className="size-36 rounded flex items-center justify-center hover:shadow-sm transition shrink-0 select-none overflow-hidden"
                    >
                      <Image
                        src={site.preview}
                        alt={`${site.name} preview`}
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ================= LIVE EMBEDDED IFRAME VIEW ================= */
          <iframe
            key={refreshKey}
            src={currentUrl}
            title="Live Website Runner"
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            allow="autoplay; fullscreen"
          />
        )}
      </div>
    </div>
  );
};

export default Browser;
