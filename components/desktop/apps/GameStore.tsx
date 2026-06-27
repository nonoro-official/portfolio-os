import React from "react";
import { ArrowLeft, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useWindow } from "@/hooks/useWindow";
import { useSearch } from "@/hooks/useSearch";
import { games } from "@/config/games";
import { SearchBar } from "@/components/ui/custom/SearchBar";
import { FeaturedBanner } from "@/components/ui/custom/FeaturedBanner";

const GameStore = () => {
  const { currentUrl, viewMode, refreshKey, navigateTo, goHome, refreshPage } =
    useWindow();

  const search = useSearch(games);
  const featuredGames = games.filter((game) => game.isFeatured == true);

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      {/* Top Browser Control Bar */}
      <div className="flex items-center gap-3 px-4 py-1 bg-[#FDFBF7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
        <div className="flex items-center gap-1.5 text-zinc-300">
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
            onClick={refreshPage}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <RotateCw className="size-4" />
          </Button>
          <p>|</p>
        </div>
        <p className="text-2xl font-bold bg-clip-text text-amber-600 select-none shrink-0 py-1">
          Vapor
        </p>
      </div>
      {/* Browse and Search Tab */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#ecebe7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Button
            variant="link"
            onClick={goHome}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <p className="text-sm font-medium text-zinc-600 hover:text-zinc-800">
              Browse
            </p>
          </Button>
          <Button
            variant="link"
            onClick={goHome}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <p className="text-sm font-medium text-zinc-600 hover:text-zinc-800">
              Competitions
            </p>
          </Button>
          <Button
            variant="link"
            onClick={goHome}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <p className="text-sm font-medium text-zinc-600 hover:text-zinc-800">
              Genre
            </p>
          </Button>
          <Button
            variant="link"
            onClick={goHome}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <p className="text-sm font-medium text-zinc-600 hover:text-zinc-800">
              Stack
            </p>
          </Button>
        </div>
        {/* Search Bar */}
        <SearchBar
          value={search.query}
          onChange={search.setQuery}
          items={games}
          placeholder="Search the store..."
          onSelect={(game) => navigateTo(game.url)}
          className="flex-1 bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-lg flex items-center shadow-sm text-zinc-400 select-none transition-all focus-within:border-zinc-400 dark:focus-within:border-zinc-500 mr-4"
          inputClassName="text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
          itemToStringValue={(item) => item.name}
        />
      </div>

      {/* Main Window Canvas Viewport */}
      <div className="flex-1 w-full bg-white dark:bg-popover overflow-y-auto">
        {viewMode === "homepage" ? (
          /* ================= GOOGLE HOMEPAGE CUSTOM INDEX ================= */
          <div className="max-w-2xl mx-auto items-stretch px-6 py-8 flex flex-col gap-8">
            {/* Carousel */}
            <FeaturedBanner
              items={featuredGames}
              renderItem={(game) => (
                <div className="flex justify-center items-center h-80 min-w-30 bg-zinc-500 rounded-xl text-white font-semibold">
                  {game.preview || game.name}
                </div>
              )}
            />
            <div className="flex flex-col gap-6 max-w-2xl">
              {games.map((site) => {
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
                    {/* Left Side: Preview */}
                    <Button
                      variant="window"
                      onClick={() => navigateTo(site.url)}
                      className="size-24 bg-zinc-100 rounded-xl flex items-center justify-center text-3xl border border-zinc-200/60 hover:shadow-sm transition shrink-0 select-none overflow-hidden"
                    >
                      {site.preview}
                    </Button>
                    <div className="flex-1 min-w-0 flex flex-col">
                      {/* 1. Header: Breadcrumb */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex flex-col text-left leading-tight min-w-0 flex-1">
                          <span className="text-xs font-normal text-foreground truncate">
                            {site.gameTags.stack.join(" / ")} |{" "}
                            {site.gameTags.genre.join(", ")}
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
                      <p className="text-sm text-zinc-400 leading-snug line-clamp-3 whitespace-normal wrap-break-word">
                        {site.desc}{" "}
                        <a
                          href={displayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-block whitespace-nowrap ml-1 cursor-pointer font-normal"
                          onClick={(e) => e.stopPropagation()} // Keeps click from firing navigateTo
                        >
                          {site.isFeatured ? "Read More" : ""}
                        </a>
                      </p>
                    </div>
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

export default GameStore;
