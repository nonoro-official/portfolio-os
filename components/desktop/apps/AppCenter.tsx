import Image from "next/image";
import {
  ExternalLink,
  Layers,
  MonitorSmartphone,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindow } from "@/hooks/useWindow";
import { useStoreFilters } from "@/hooks/useStoreFilters";
import { useSearch } from "@/hooks/useSearch";
import { app, devices, stacks, os } from "@/config/apps";
import { SearchBar } from "@/components/ui/custom/SearchBar";
import { PreviewBanner } from "@/components/ui/custom/PreviewBanner";
import { FilterMenu } from "@/components/ui/custom/FilterMenu";
import { StoreListItem } from "@/components/ui/custom/StoreListItem";
import { AppShell } from "@/components/ui/custom/AppShell";

const AppCenter = () => {
  const { currentUrl, viewMode, navigateTo, goHome } = useWindow();

  const search = useSearch();

  const store = useStoreFilters({
    items: app,
    query: search.query,
    facets: {
      os: (a) => a.appTags.os,
      device: (a) => a.appTags.device,
      stack: (a) => a.appTags.stack,
    },
  });

  const resetFilters = () => {
    store.reset();
    search.setQuery("");
  };

  const featuredApp = app.filter((app) => app.isFeatured === true);
  const activeApp = app.find((app) => app.url === currentUrl);

  return (
    <AppShell
      subBar={
        <div className="flex items-center justify-between w-full gap-2">
          {/* Title */}
          <div className="flex-1 flex justify-start">
            <Button
              variant="link"
              onClick={() => {
                goHome();
                resetFilters();
              }}
              className="p-1 hover:bg-zinc-200/50 rounded transition"
            >
              <p className="text-2xl font-bold bg-clip-text text-amber-600 select-none shrink-0 py-1 cursor-pointer">
                AppHub
              </p>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex-2 flex justify-center max-w-xl w-full mx-4">
            <SearchBar
              value={search.query}
              onChange={search.setQuery}
              items={app}
              placeholder="Search the store..."
              onSelect={(app) => navigateTo(app.url)}
              itemToStringValue={(item) => item.name}
            />
          </div>

          {/* Nav Menu */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <FilterMenu
              label="OS"
              options={os}
              selected={store.selected.os ?? []}
              onToggle={(value, checked) => store.toggle("os", value, checked)}
            />
            <FilterMenu
              label="Device"
              options={devices}
              selected={store.selected.device ?? []}
              onToggle={(value, checked) =>
                store.toggle("device", value, checked)
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
        </div>
      }
    >
      {viewMode === "homepage" || !activeApp ? (
        /* ================= HOMEPAGE VIEW ================= */
        <div className="max-w-2xl mx-auto items-stretch px-6 py-8 flex flex-col gap-8">
          {search.query && search.query.trim().length === 0 && (
            <p className="text-sm text-zinc-500 items-center justify-center flex">
              No results found.
            </p>
          )}
          {!search.query && (
            // Carousel
            <PreviewBanner
              items={featuredApp}
              enableAutoplay
              hasCounter={false}
              enableCounterDesc={false}
              enableImagePreview={false}
              renderItem={(app) => (
                <div
                  className="relative flex flex-col-reverse md:flex-row h-auto md:h-80 w-full bg-zinc-950 border dark:border-foreground rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => navigateTo(app.url)}
                >
                  {/* App Details Sidebar (Centered & Color-Matched) */}
                  <div className="flex flex-col justify-center items-center text-center w-full md:w-52 h-auto md:h-full bg-sidebar border-t md:border-t-0 md:border-r border-zinc-800/50 text-sm text-foreground p-4 md:p-5 shrink-0 z-10">
                    {app.logo.type === "emoji" ? (
                      <span className="text-4xl md:text-6xl leading-none mb-2 md:mb-3 selection:bg-transparent">
                        {app.logo.value}
                      </span>
                    ) : (
                      <div className="mb-2 md:mb-3">
                        <Image
                          src={app.logo.value}
                          alt={`${app.name} icon`}
                          width={80}
                          height={80}
                          className="object-contain w-12 h-12 md:w-auto md:h-auto"
                        />
                      </div>
                    )}
                    <h3 className="font-bold text-base text-foreground group-hover:text-amber-500 transition-colors">
                      {app.name}
                    </h3>
                    <p className="mt-1 md:mt-2 text-xs text-zinc-500 line-clamp-2 md:line-clamp-4 leading-relaxed">
                      {app.desc}
                    </p>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full h-48 md:h-full md:flex-1 bg-zinc-950">
                    <Image
                      src={app.featuredImage || "/images/default.png"}
                      alt={app.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              )}
            />
          )}

          {/* App List */}
          <div className="flex flex-col gap-8 max-w-2xl">
            {store.filtered.map((app) => {
              return (
                <div
                  key={app.name}
                  className="flex items-center justify-between gap-4"
                >
                  <StoreListItem
                    align="start"
                    title={app.name}
                    onTitleClick={() => navigateTo(app.url)}
                    mediaPosition="start"
                    tagLine={`${app.appTags.stack.join(" / ")} | ${app.appTags.device.join(", ")}`}
                    description={
                      <p className="text-sm text-zinc-400 leading-snug line-clamp-3 whitespace-normal wrap-break-word">
                        {app.desc}
                      </p>
                    }
                    media={
                      <div className="size-24 bg-zinc-100 rounded-xl flex items-center justify-center text-3xl border border-zinc-200/60 hover:shadow-sm transition shrink-0 select-none overflow-hidden">
                        {app.logo.type === "emoji" ? (
                          <span className="text-6xl leading-none default-flex-center">
                            {app.logo.value}
                          </span>
                        ) : (
                          <Image
                            src={app.logo.value}
                            alt={`${app.name} icon`}
                            width={96}
                            height={96}
                            className="object-contain"
                          />
                        )}
                      </div>
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ================= SOFTWARE DETAIL PAGE ================= */
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-4">
              {/* App Preview Box */}
              <div className="size-24 bg-zinc-100 rounded-xl flex items-center justify-center text-3xl border border-zinc-200/60 hover:shadow-sm transition shrink-0 select-none overflow-hidden">
                {activeApp.logo.type === "emoji" ? (
                  <span className="text-6xl leading-none default-flex-center">
                    {activeApp.logo.value}
                  </span>
                ) : (
                  <Image
                    src={activeApp.logo.value}
                    alt={`${activeApp.name} icon`}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                )}
              </div>
              {/* App Text Details */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {activeApp.name}
                  {/* Tags */}
                  <div className="flex items-center gap-4 mt-2 mb-2 w-full">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400  px-2 py-1 rounded">
                        <Layers className="size-4 text-zinc-500" />
                        {activeApp.appTags.stack.map((stack) => (
                          <span
                            key={stack}
                            className="text-xs text-zinc-700 dark:text-zinc-300"
                          >
                            {stack}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 px-2 py-1 rounded">
                        {activeApp.appTags.device.length > 0 && (
                          <span
                            key="device"
                            className="text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-1"
                          >
                            {activeApp.appTags.device.length === 1 &&
                            activeApp.appTags.device.includes(devices[0]) ? (
                              <>
                                <Monitor className="size-4 text-zinc-500" />
                                <span>Desktop</span>
                              </>
                            ) : activeApp.appTags.device.length === 1 &&
                              activeApp.appTags.device.includes(devices[1]) ? (
                              <>
                                <Smartphone className="size-4 text-zinc-500" />
                                <span>Mobile</span>
                              </>
                            ) : (
                              <>
                                <MonitorSmartphone className="size-4 text-zinc-500" />
                                <span>
                                  {activeApp.appTags.device.join(" & ")}
                                </span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {(() => {
                          const osCount = activeApp.appTags.os.length;

                          // More than 3 operating systems
                          if (osCount > 3) {
                            return (
                              <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                <MonitorSmartphone className="size-3.5 text-zinc-500" />
                                <span>Cross-Platform</span>
                              </div>
                            );
                          }

                          // Between 2 and 3 operating systems (Join into ONE badge)
                          if (osCount > 1 && osCount <= 3) {
                            // Determine a combined icon if mixed, or fallback
                            const hasMobile = activeApp.appTags.os.some((os) =>
                              ["iOS", "Android"].includes(os),
                            );
                            const hasDesktop = activeApp.appTags.os.some((os) =>
                              ["Windows", "macOS", "Linux"].includes(os),
                            );
                            const JointIcon =
                              hasMobile && hasDesktop
                                ? MonitorSmartphone
                                : hasMobile
                                  ? Smartphone
                                  : Monitor;

                            return (
                              <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                                <JointIcon className="size-3.5 text-zinc-500" />
                                <span>{activeApp.appTags.os.join(" & ")}</span>
                              </div>
                            );
                          }

                          // Exactly 1 operating system (Render specific badge)
                          return activeApp.appTags.os.map((os) => {
                            let IconComponent = MonitorSmartphone;
                            if (["Windows", "macOS", "Linux"].includes(os))
                              IconComponent = Monitor;
                            if (["iOS", "Android"].includes(os))
                              IconComponent = Smartphone;

                            return (
                              <div
                                key={os}
                                className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded"
                              >
                                <IconComponent className="size-3.5 text-zinc-500" />
                                <span>{os}</span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>
                </h2>
              </div>
            </div>
            <Button
              asChild
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center gap-2 text-sm"
            >
              <a href={activeApp.url} target="_blank" rel="noopener noreferrer">
                Download
                <ExternalLink className="size-4" />
              </a>
            </Button>
          </div>

          {/* App Preview & Detail Columns Layout */}
          <div className="flex flex-1 gap-6 items-center justify-center w-full flex-wrap">
            {/* Preview */}
            <div className="justify-center shrink flex-1 flex gap-3 max-w-2xl mx-auto">
              <PreviewBanner
                items={activeApp.media}
                enableAutoplay={false}
                hasCounter
                enableCounterDesc
                imageDesc={activeApp.media.map((item) => item.imgDesc || "")}
                enableImagePreview={true}
                renderItem={(mediaItem, index, { openPreview }) => (
                  <div
                    className="relative flex h-80 w-full bg-zinc-800 rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => navigateTo(activeApp.url)}
                  >
                    {mediaItem.type === "image" ? (
                      <div
                        className="relative flex-1 h-full bg-zinc-950 cursor-zoom-in"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPreview();
                        }}
                      >
                        <Image
                          src={mediaItem.src}
                          alt={mediaItem.imgDesc || activeApp.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 60vw"
                          className="object-contain"
                          fetchPriority={index === 0 ? "high" : "auto"}
                        />
                      </div>
                    ) : (
                      <div className="relative flex-1 h-full bg-zinc-950">
                        <video
                          src={mediaItem.src}
                          poster={mediaItem.thumbSrc}
                          className="h-full w-full object-contain"
                          muted
                          playsInline
                          loop
                          autoPlay
                          onClick={(e) => {
                            e.stopPropagation();
                            openPreview();
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
                renderPreview={(media) =>
                  media.type === "image" ? (
                    <Image
                      src={media.src}
                      alt={media.imgDesc || activeApp.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <video
                      src={media.src}
                      controls
                      autoPlay
                      className="h-full w-full object-contain"
                    />
                  )
                }
              />
            </div>
          </div>
          {/* About App */}
          <div className="flex p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-xl mb-2 min-h-50 h-auto">
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-md font-semibold uppercase tracking-wider text-zinc-600">
                {activeApp.desc}
              </h3>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {activeApp.about}
              </p>
              {activeApp.fullStack &&
                (() => {
                  const allTech = [
                    ...(activeApp.fullStack.language || []),
                    ...(activeApp.fullStack.frontend || []),
                    ...(activeApp.fullStack.backend || []),
                    ...(activeApp.fullStack.database || []),
                  ];
                  return allTech.length > 0 ? (
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                      Built with: {allTech.join(", ")}
                    </p>
                  ) : null;
                })()}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default AppCenter;
