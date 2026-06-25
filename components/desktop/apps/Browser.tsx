import React from "react";
import { useWindow } from "@/hooks/useWindow";
import { ArrowLeft, Home, RotateCw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
            onClick={goHome}
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputUrl.trim()) navigateTo(inputUrl);
          }}
          className="flex-1 relative flex items-center"
        >
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Googly or type a URL..."
            className="w-full bg-white dark:bg-background border border-zinc-200 text-zinc-700 dark:text-foreground rounded pl-8 pr-3 py-1 text-xs outline-none focus:border-zinc-400 dark:border-border focus:ring-1 focus:ring-zinc-400/20 transition"
          />
          <Search className="size-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
        </form>
      </div>

      {/* Main Window Canvas Viewport */}
      <div className="flex-1 w-full bg-white dark:bg-popover overflow-y-auto">
        {viewMode === "homepage" ? (
          /* ================= GOOGLE HOMEPAGE CUSTOM INDEX ================= */
          <div className="max-w-2xl mx-auto px-6 py-4 flex flex-col">
            <div className="w-full flex items-center gap-4 mb-6 border-b border-zinc-200 dark:border-border pb-4">
              <h1 className="text-4xl font-extrabold bg-clip-text text-amber-600 select-none shrink-0 py-1">
                Googly
              </h1>
              <div className="flex-1 bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-full flex items-center px-4 py-2.5 shadow-sm text-sm text-zinc-400 select-none">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (inputUrl.trim())
                      navigateTo(
                        inputUrl.startsWith("http")
                          ? inputUrl
                          : `https://${inputUrl}`,
                      );
                  }}
                  className="flex-1 relative flex items-center"
                >
                  <Search className="size-4 text-zinc-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={inputUrl}
                    placeholder="My Web Projects"
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full bg-transparent outline-none text-foreground"
                  />
                  <X
                    className="size-4 text-zinc-400 absolute right-2 cursor-pointer hover:text-zinc-600 transition"
                    onClick={() => setInputUrl("")}
                  />
                </form>
              </div>
            </div>

            <div className="flex flex-col gap-6 max-w-2xl">
              {websites.map((site) => {
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
                      {/* 1. Header: Icon & Breadcrumb */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm p-1 bg-zinc-100 rounded-full flex items-center justify-center size-6 select-none shrink-0">
                          {site.icon}
                        </span>
                        <div className="flex flex-col text-left leading-tight min-w-0 flex-1">
                          <span className="text-xs font-normal text-foreground truncate">
                            {site.stack}
                          </span>
                          <span className="text-[10px] text-zinc-500 break-all whitespace-normal">
                            {displayUrl}
                          </span>
                        </div>
                      </div>

                      {/* 2. Title Link */}
                      <Button
                        variant="link"
                        onClick={() => navigateTo(site.url)}
                        // Added h-auto, p-0, text-xl, and critically: justify-start text-left
                        className="h-auto p-0 text-xl text-foreground hover:text-primary hover:underline font-medium leading-tight mb-1 justify-start text-left whitespace-normal"
                      >
                        {site.name}
                      </Button>

                      {/* 3. Description Snippet with Inline Read More */}
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-3 whitespace-normal wrap-break-word">
                        {site.desc}{" "}
                        <a
                          href={displayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-block whitespace-nowrap ml-1 cursor-pointer font-normal"
                          onClick={(e) => e.stopPropagation()} // Keeps click from firing navigateTo
                        >
                          {site.hasReadMore ? "Read More" : ""}
                        </a>
                      </p>
                    </div>

                    {/* Right Side: Google-style square snippet thumbnail */}
                    <Button
                      variant="window"
                      onClick={() => navigateTo(site.url)}
                      className="size-24 bg-zinc-100 rounded-xl flex items-center justify-center text-3xl border border-zinc-200/60 hover:shadow-sm transition shrink-0 select-none overflow-hidden"
                    >
                      {site.preview}
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
