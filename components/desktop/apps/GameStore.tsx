import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindow } from "@/hooks/useWindow";
import { useStoreFilters } from "@/hooks/useStoreFilters";
import { useSearch } from "@/hooks/useSearch";
import { usePreviewNav } from "@/hooks/usePreviewNav";
import { competitions, games, genres, stacks } from "@/config/games";
import { SearchBar } from "@/components/ui/custom/SearchBar";
import { PreviewBanner } from "@/components/ui/custom/PreviewBanner";
import { ThumbnailPreview } from "@/components/ui/custom/ThumbnailPreview";
import { FilterMenu } from "@/components/ui/custom/FilterMenu";
import { ImagePreview } from "@/components/ui/custom/ImagePreview";
import { StoreListItem } from "@/components/ui/custom/StoreListItem";
import { AppShell } from "@/components/ui/custom/AppShell";
import { Toolbar } from "@/components/ui/custom/Toolbar";
import { useDesktopContext } from "@/context/DesktopContext";

const GameStore = () => {
  const { currentUrl, viewMode, navigateTo, goHome, refreshPage } = useWindow();

  const search = useSearch();
  const store = useStoreFilters({
    items: games,
    query: search.query,
    facets: {
      competition: (g) => g.gameTags.competition,
      genre: (g) => g.gameTags.genre,
      stack: (g) => g.gameTags.stack,
    },
  });

  const resetFilters = () => {
    store.reset();
    search.setQuery("");
  };

  const resetHome = () => {
    goHome();
    search.setQuery("");
  };

  const featuredGames = games.filter((game) => game.isFeatured === true);
  const activeGame = games.find((game) => game.url === currentUrl);

  const preview = usePreviewNav(store.filtered.length);

  const { isMobile } = useDesktopContext();

  return (
    <AppShell
      toolbar={
        !isMobile ? (
          <Toolbar
            canGoBack={viewMode !== "homepage"}
            showHome={false}
            showDivider
            onBack={resetHome}
            onRefresh={refreshPage}
          >
            <p
              className="text-2xl font-bold bg-clip-text text-amber-600 select-none shrink-0 py-1 cursor-pointer"
              onClick={resetHome}
            >
              Vapor
            </p>
          </Toolbar>
        ) : (
          <SearchBar
            value={search.query}
            onChange={search.setQuery}
            items={games}
            placeholder="Search the store..."
            onSelect={(game) => navigateTo(game.url)}
            className="w-full"
            itemToStringValue={(item) => item.name}
          />
        )
      }
      subBar={
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex items-center justify-center md:justify-start gap-1.5 w-full md:w-auto shrink-0 overflow-x-auto no-scrollbar">
            <Button
              variant="link"
              onClick={() => {
                goHome();
                resetFilters();
              }}
              className="p-1 hover:bg-zinc-200/50 rounded transition text-sm shrink-0"
            >
              Browse
            </Button>
            <FilterMenu
              label="Competition"
              options={competitions}
              selected={store.selected.competition ?? []}
              onToggle={(value, checked) =>
                store.toggle("competition", value, checked)
              }
            />
            <FilterMenu
              label="Genre"
              options={genres}
              selected={store.selected.genre ?? []}
              onToggle={(value, checked) =>
                store.toggle("genre", value, checked)
              }
            />
            <FilterMenu
              label="Stack"
              options={stacks}
              selected={store.selected.stack ?? []}
              onToggle={(value, checked) =>
                store.toggle("stack", value, checked)
              }
            />
          </div>
          {!isMobile && (
            <SearchBar
              value={search.query}
              onChange={search.setQuery}
              items={games}
              placeholder="Search the store..."
              onSelect={(game) => navigateTo(game.url)}
              className="flex-1 w-full"
              itemToStringValue={(item) => item.name}
            />
          )}
        </div>
      }
    >
      {viewMode === "homepage" || !activeGame ? (
        /* ================= HOMEPAGE VIEW ================= */
        <div className="max-w-2xl mx-auto items-stretch px-6 py-8 flex flex-col">
          {search.query && search.query.trim().length === 0 && (
            <p className="text-sm text-zinc-500 items-center justify-center flex mb-4">
              No results found.
            </p>
          )}
          {!search.query && (
            <div className="mb-2">
              <PreviewBanner
                items={featuredGames}
                enableAutoplay
                hasCounter
                renderItem={(game, index) => (
                  <div
                    className="relative flex flex-col md:flex-row h-auto md:h-80 w-full bg-zinc-800 rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => navigateTo(game.url)}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-48 md:h-full md:flex-1 bg-zinc-950">
                      <Image
                        src={game.featuredImage || "/images/default.png"}
                        alt={game.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    </div>

                    {/* Details Bar */}
                    <div className="flex flex-col justify-center w-full md:w-50 h-auto md:h-full bg-zinc-900 border-t md:border-t-0 md:border-l border-zinc-800 dark:bg-zinc-50 dark:border-zinc-400 text-sm text-zinc-200 dark:text-zinc-800 p-4 shrink-0">
                      <h3 className="font-bold text-base text-zinc-50 dark:text-zinc-800 group-hover:text-amber-500 transition-colors">
                        {game.name}
                      </h3>
                      <p className="mt-2 md:mt-3 text-xs text-zinc-400 dark:text-zinc-600 line-clamp-2 md:line-clamp-4 leading-relaxed">
                        {game.desc}
                      </p>
                    </div>
                  </div>
                )}
              />
            </div>
          )}

          {/* Game List */}
          <div className="flex flex-col max-w-2xl">
            {store.filtered.map((game, index) => {
              return (
                <div
                  key={game.name}
                  className="flex items-center justify-between gap-4"
                >
                  <StoreListItem
                    align="center"
                    title={game.name}
                    onTitleClick={() => navigateTo(game.url)}
                    mediaPosition="start"
                    tagLine={`${game.gameTags.stack.join(" / ")} | ${game.gameTags.genre.join(", ")}`}
                    description={
                      <p className="text-sm text-zinc-400 leading-snug line-clamp-3 whitespace-normal wrap-break-word">
                        {game.desc}
                      </p>
                    }
                    media={
                      game.preview ? (
                        <Button
                          variant="window"
                          onClick={() => preview.open(index)}
                          className="size-36 rounded flex items-center justify-center hover:shadow-sm transition shrink-0 select-none overflow-hidden bg-transparent"
                        >
                          <Image
                            src={game.preview}
                            alt={`${game.name} preview`}
                            width={128}
                            height={128}
                            className="object-contain"
                          />
                        </Button>
                      ) : undefined
                    }
                  />

                  <ImagePreview
                    items={store.filtered}
                    previewIndex={preview.previewIndex}
                    onClose={preview.close}
                    onNavigate={preview.navigate}
                    renderPreview={(g) =>
                      g?.preview ? (
                        <Image
                          src={g.preview}
                          alt={`${g.name} full preview`}
                          fill
                          className="object-contain p-4"
                          fetchPriority="high"
                        />
                      ) : null
                    }
                    imageDesc={store.filtered.map((g) => `${g.name} Preview`)}
                    totalCount={store.filtered.length}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ================= GAME DETAIL PAGE ================= */
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-4">
          {/* Game Name Header */}
          <div>
            <p className="text-xs text-zinc-400">
              {activeGame.gameTags.stack.join(" / ")} •{" "}
              {activeGame.gameTags.genre.join(", ")}
            </p>
            <h1 className="text-3xl mt-0.5 font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {activeGame.name}
            </h1>
          </div>

          {/* Game Preview & Detail Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full -mt-2">
            {/* Left Column: Media Track (Takes up 7 slots) */}
            <div className="md:col-span-7 w-full block">
              <ThumbnailPreview
                items={activeGame.media || []}
                enableImagePreview={true}
                imageDesc={(activeGame.media || []).map(
                  (_, i) => `${activeGame.name} Media ${i + 1}`,
                )}
                renderPreview={(mediaItem) => {
                  if (mediaItem.type === "video") {
                    return (
                      <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4">
                        <video
                          src={mediaItem.src}
                          controls
                          playsInline
                          preload="metadata"
                          className="h-full w-full max-w-full max-h-full object-contain"
                        />
                      </div>
                    );
                  }
                  return (
                    <Image
                      src={mediaItem.src}
                      alt="Full Preview"
                      fill
                      className="object-contain p-4"
                      fetchPriority="high"
                    />
                  );
                }}
                renderMainItem={(media, index) => (
                  <div className="relative aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                    {media.type === "video" ? (
                      <video
                        src={media.src}
                        controls
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={media.src}
                        alt="Preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                        fetchPriority={index === 0 ? "high" : "auto"}
                      />
                    )}
                  </div>
                )}
                renderThumbItem={(media) => (
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={media.thumbSrc || media.src}
                      alt="Thumb"
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                )}
              />
            </div>

            {/* Right Column: About & Buttons (Takes up 5 slots) */}
            <div className="md:col-span-5 flex flex-col gap-3 w-full">
              {/* About */}
              <div className="flex flex-col gap-3 p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-xl min-h-68.5">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                  {activeGame.about}
                </p>
                {activeGame.webTech && activeGame.webTech.length > 0 && (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    Built with: {activeGame.webTech.join(", ")}
                  </p>
                )}
                {activeGame.award && (
                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    Award/s: {activeGame.award.join(", ")}
                  </p>
                )}
              </div>
              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-2 w-full">
                <Button
                  variant="outline"
                  onClick={() => {
                    goHome();
                    search.setQuery("");
                  }}
                  className="text-sm"
                >
                  Back to Store
                </Button>
                <Button
                  asChild
                  className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center gap-2 text-sm"
                >
                  <a
                    href={activeGame.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Game
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default GameStore;
