import { useState, Fragment } from "react";
import { useWindow } from "@/hooks/useWindow";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import { usePreviewNav } from "@/hooks/usePreviewNav";
import { SearchBar } from "@/components/ui/custom/SearchBar";
import { websites } from "@/config/websites";
import { ImagePreview } from "@/components/ui/custom/ImagePreview";
import { StoreListItem } from "@/components/ui/custom/StoreListItem";
import { AppShell } from "@/components/ui/custom/AppShell";
import { Toolbar } from "@/components/ui/custom/Toolbar";

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

  const search = useSearch();

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

  const preview = usePreviewNav(displayedWebsites.length);

  return (
    <AppShell
      toolbar={
        <>
          <Toolbar
            canGoBack={viewMode !== "homepage"}
            onBack={goHome}
            onHome={() => {
              goHome();
              setFilteredSite(null);
              search.setQuery("");
            }}
            onRefresh={refreshPage}
          >
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
                  if (!val) setFilteredSite(null);
                }}
                items={websites}
                placeholder="Search Googly or type a URL..."
                onSelect={(item) => {
                  setFilteredSite(item);
                  setInputUrl(item.name);
                }}
                itemToStringValue={(item) => item.name}
              />
            </div>
          </Toolbar>
        </>
      }
    >
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
                className="rounded-full focus-within:border-zinc-400 focus-within:ring-0.5 focus-within:ring-zinc-500"
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
          <div className="flex flex-col gap-3 max-w-2xl">
            {displayedWebsites.map((site, index) => {
              const displayUrl = site.url
                .replace("https://", "")
                .replace("www.", "")
                .split("/")
                .filter(Boolean)
                .join(" › ");

              return (
                <Fragment key={site.name}>
                  <StoreListItem
                    title={site.name}
                    onTitleClick={() => handleUrlSubmit(site.name)}
                    mediaPosition="end"
                    tagLine={
                      <div className="flex items-center gap-2">
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
                    }
                    description={
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
                    }
                    footer={
                      site.hasReadMore ? (
                        <Button
                          variant="link"
                          onClick={() => toggleExpanded(site.name)}
                          className="h-auto p-0 mt-1 justify-start text-primary hover:underline"
                        >
                          {expandedSites[site.name] ? "Show Less" : "Read More"}
                        </Button>
                      ) : null
                    }
                    media={
                      site.preview ? (
                        <Button
                          variant="window"
                          onClick={() => preview.open(index)}
                          className="size-36 rounded flex items-center justify-center hover:shadow-sm transition shrink-0 select-none overflow-hidden bg-transparent"
                        >
                          <Image
                            src={site.preview}
                            alt={`${site.name} preview`}
                            width={128}
                            height={128}
                            className="object-contain"
                          />
                        </Button>
                      ) : undefined
                    }
                  />

                  {/* Place the dialog outside of the button, passing ALL your items to it */}
                  <ImagePreview
                    items={displayedWebsites}
                    previewIndex={preview.previewIndex}
                    onClose={() => preview.close()}
                    onNavigate={preview.navigate}
                    renderPreview={(site) =>
                      site?.preview ? (
                        <Image
                          src={site.preview}
                          alt={`${site.name} full preview`}
                          fill
                          className="object-contain p-4"
                        />
                      ) : null
                    }
                    imageDesc={displayedWebsites.map(
                      (site) => `${site.name} Preview`,
                    )}
                    totalCount={displayedWebsites.length}
                  />
                </Fragment>
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
    </AppShell>
  );
};

export default Browser;
