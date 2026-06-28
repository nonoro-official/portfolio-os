import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, RotateCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { useWindow } from "@/hooks/useWindow";
import { useSearch } from "@/hooks/useSearch";
import { competitions, games, genres, stacks } from "@/config/games";
import { SearchBar } from "@/components/ui/custom/SearchBar";
import { PreviewBanner } from "@/components/ui/custom/PreviewBanner";
import { ThumbnailPreview } from "@/components/ui/custom/ThumbnailPreview";
import { NavMenu } from "@/components/ui/custom/NavMenu";

const GameStore = () => {
  const { currentUrl, viewMode, navigateTo, goHome, refreshPage } = useWindow();
  const search = useSearch(games);

  const featuredGames = games.filter((game) => game.isFeatured === true);

  const activeGame = games.find((game) => game.url === currentUrl);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [selectedComps, setSelectedComps] = useState<string[]>([]);

  const filteredGames = games.filter((game) => {
    const genreMatch =
      selectedGenres.length === 0 ||
      game.gameTags.genre.some((g) => selectedGenres.includes(g));

    const stackMatch =
      selectedStacks.length === 0 ||
      game.gameTags.stack.some((s) => selectedStacks.includes(s));

    const compMatch =
      selectedComps.length === 0 ||
      game.gameTags.competition.some((c) => selectedComps.includes(c));

    return genreMatch && stackMatch && compMatch;
  });

  const isFiltering =
    selectedGenres.length > 0 ||
    selectedStacks.length > 0 ||
    selectedComps.length > 0 ||
    search.query.trim() !== "";

  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedStacks([]);
    setSelectedComps([]);
    search.setQuery("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      {/* Top Browser Control Bar */}
      <div className="flex items-center gap-3 px-4 py-1 bg-[#FDFBF7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Button
            variant="window"
            onClick={() => {
              goHome();
              search.setQuery("");
            }}
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
        <p
          className="text-2xl font-bold bg-clip-text text-amber-600 select-none shrink-0 py-1 cursor-pointer"
          onClick={() => {
            goHome();
            search.setQuery("");
          }}
        >
          Vapor
        </p>
      </div>

      {/* Browse and Search Tab */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#ecebe7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
        <div className="flex items-center gap-1.5">
          <Button
            variant="link"
            onClick={() => {
              goHome();
              resetFilters();
            }}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            Browse
          </Button>
          <NavMenu buttonName="Competitions">
            <div className="flex flex-col gap-2">
              {competitions.map((competition) => (
                <Label
                  key={competition}
                  className="flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={selectedComps.includes(competition)}
                    onCheckedChange={(checked) => {
                      setSelectedComps((prev) =>
                        checked
                          ? [...prev, competition]
                          : prev.filter((g) => g !== competition),
                      );
                    }}
                  />
                  {competition}
                </Label>
              ))}
            </div>
          </NavMenu>
          <NavMenu buttonName="Genre">
            <div className="flex flex-col gap-2">
              {genres.map((genre) => (
                <Label key={genre} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={(checked) => {
                      setSelectedGenres((prev) =>
                        checked
                          ? [...prev, genre]
                          : prev.filter((g) => g !== genre),
                      );
                    }}
                  />
                  {genre}
                </Label>
              ))}
            </div>
          </NavMenu>
          <NavMenu buttonName="Stack">
            <div className="flex flex-col gap-2">
              {stacks.map((stack) => (
                <Label key={stack} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedStacks.includes(stack)}
                    onCheckedChange={(checked) => {
                      setSelectedStacks((prev) =>
                        checked
                          ? [...prev, stack]
                          : prev.filter((g) => g !== stack),
                      );
                    }}
                  />
                  {stack}
                </Label>
              ))}
            </div>
          </NavMenu>
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
        {viewMode === "homepage" || !activeGame ? (
          /* ================= HOMEPAGE VIEW ================= */
          <div className="max-w-2xl mx-auto items-stretch px-6 py-8 flex flex-col gap-8">
            {isFiltering && filteredGames.length === 0 && (
              <p className="text-sm text-zinc-500 image-center justify-center flex">
                No results found.
              </p>
            )}
            {!isFiltering && (
              // Carousel
              <PreviewBanner
                items={featuredGames}
                enableAutoplay
                hasCounter
                renderItem={(game) => (
                  <div
                    className="relative flex h-80 w-full bg-zinc-800 rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => navigateTo(game.url)}
                  >
                    {/* Image Container */}
                    <div className="relative flex-1 h-full bg-zinc-950">
                      <Image
                        src={game.featuredImage || "/images/rover-i/r3.png"} // replace with a default image if none is provided
                        alt={game.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Game Details Sidebar */}
                    <div className="flex flex-col justify-center h-full w-50 bg-zinc-900 border-l border-zinc-800 text-sm text-zinc-200 p-4 shrink-0">
                      <h3 className="font-bold text-base text-white group-hover:text-amber-500 transition-colors">
                        {game.name}
                      </h3>
                      <p className="mt-3 text-xs text-zinc-400 line-clamp-4 leading-relaxed">
                        {game.desc}
                      </p>
                    </div>
                  </div>
                )}
              />
            )}

            {/* Game List */}
            <div className="flex flex-col gap-6 max-w-2xl">
              {filteredGames.map((game) => {
                const displayUrl = game.url
                  .replace("https://", "")
                  .replace("www.", "")
                  .split("/")
                  .filter(Boolean)
                  .join(" › ");

                return (
                  <div
                    key={game.name}
                    className="flex items-start justify-between gap-4"
                  >
                    <Button
                      variant="window"
                      onClick={() => navigateTo(game.url)}
                      className="size-24 bg-zinc-100 rounded-xl flex items-center justify-center text-3xl border border-zinc-200/60 hover:shadow-sm transition shrink-0 select-none overflow-hidden"
                    >
                      {game.preview}
                    </Button>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex flex-col text-left leading-tight min-w-0 flex-1">
                          <span className="text-xs font-normal text-foreground truncate">
                            {game.gameTags.stack.join(" / ")} |{" "}
                            {game.gameTags.genre.join(", ")}
                          </span>
                          <span className="text-[10px] text-zinc-500 break-all whitespace-normal">
                            {displayUrl}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        onClick={() => navigateTo(game.url)}
                        className="h-auto p-0 text-xl text-foreground hover:text-primary hover:underline font-medium leading-tight mb-1 justify-start text-left whitespace-normal"
                      >
                        {game.name}
                      </Button>
                      <p className="text-sm text-zinc-400 leading-snug line-clamp-3 whitespace-normal wrap-break-word">
                        {game.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ================= GAME DETAIL PAGE ================= */
          <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-3">
            {/* Game Name */}
            <div>
              <p className="text-xs text-zinc-400">
                {activeGame.gameTags.stack.join(" / ")} •{" "}
                {activeGame.gameTags.genre.join(", ")}
              </p>
              <h1 className="text-3xl mt-1 font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {activeGame.name}
              </h1>
            </div>
            {/* Game Preview & Detail Columns Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full">
              {/* Left Column (Takes up 7 slots out of 12) */}
              <div className="md:col-span-7 w-full block">
                <ThumbnailPreview
                  items={activeGame.media || []}
                  renderMainItem={(media) => (
                    <div className="relative aspect-video w-full bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                      {media.type === "video" ? (
                        <video
                          src={media.src}
                          autoPlay
                          muted
                          loop
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={media.src}
                          alt="Preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-cover"
                          priority
                        />
                      )}
                    </div>
                  )}
                  renderThumbItem={(media) => (
                    // Wrapped the thumbnail in a forced absolute fill container so it can't collapse
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

              {/* Right Column (Takes up 5 slots out of 12) */}
              <div className="md:col-span-5 flex flex-col justify-between p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-xl h-full min-h-50">
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    About This Game
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-normal break-word">
                    {activeGame.desc}
                  </p>
                </div>
              </div>
            </div>
            {/* Bottom Action Buttons */}
            <div className="flex items-center justify-end gap-3 pb-4 pt-3">
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
        )}
      </div>
    </div>
  );
};

export default GameStore;
