import { useState } from "react";
import Image from "next/image";
import {
  ExternalLink,
  Layers,
  MonitorSmartphone,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { useWindow } from "@/hooks/useWindow";
import { useSearch } from "@/hooks/useSearch";
import { app, devices, stacks, os } from "@/config/apps";
import { SearchBar } from "@/components/ui/custom/SearchBar";
import { PreviewBanner } from "@/components/ui/custom/PreviewBanner";
import { NavMenu } from "@/components/ui/custom/NavMenu";

const AppCenter = () => {
  const { currentUrl, viewMode, navigateTo, goHome } = useWindow();
  const search = useSearch(app);

  const featuredApp = app.filter((app) => app.isFeatured === true);

  const activeApp = app.find((app) => app.url === currentUrl);

  const [selectedDevices, setselectedDevices] = useState<string[]>([]);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);
  const [selectedOs, setSelectedOs] = useState<string[]>([]);

  const filteredApp = app.filter((app) => {
    const deviceMatch =
      selectedDevices.length === 0 ||
      app.appTags.device.some((d) => selectedDevices.includes(d));

    const stackMatch =
      selectedStacks.length === 0 ||
      app.appTags.stack.some((s) => selectedStacks.includes(s));

    const osMatch =
      selectedOs.length === 0 ||
      app.appTags.os.some((o) => selectedOs.includes(o));

    return deviceMatch && stackMatch && osMatch;
  });

  const isFiltering =
    selectedDevices.length > 0 ||
    selectedStacks.length > 0 ||
    selectedOs.length > 0 ||
    search.query.trim() !== "";

  const resetFilters = () => {
    setselectedDevices([]);
    setSelectedStacks([]);
    setSelectedOs([]);
    search.setQuery("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      {/* Browse and Search Tab */}
      <div className="flex items-center justify-between w-full px-4 py-2 bg-[#ecebe7] dark:bg-popover border-b border-zinc-200/50 dark:border-border shrink-0">
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
            className="w-full bg-zinc-50 dark:bg-background border border-zinc-200 dark:border-border rounded-lg flex items-center shadow-sm text-zinc-400 select-none transition-all focus-within:border-zinc-400 dark:focus-within:border-zinc-500"
            inputClassName="text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
            itemToStringValue={(item) => item.name}
          />
        </div>

        {/* Nav Menu */}
        <div className="flex-1 flex justify-end items-center gap-3">
          <NavMenu buttonName="OS">
            <div className="flex flex-col gap-2">
              {os.map((os) => (
                <Label key={os} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedOs.includes(os)}
                    onCheckedChange={(checked) => {
                      setSelectedOs((prev) =>
                        checked ? [...prev, os] : prev.filter((g) => g !== os),
                      );
                    }}
                  />
                  {os}
                </Label>
              ))}
            </div>
          </NavMenu>

          <NavMenu buttonName="Device">
            <div className="flex flex-col gap-2">
              {devices.map((device) => (
                <Label key={device} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedDevices.includes(device)}
                    onCheckedChange={(checked) => {
                      setselectedDevices((prev) =>
                        checked
                          ? [...prev, device]
                          : prev.filter((g) => g !== device),
                      );
                    }}
                  />
                  {device}
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
      </div>

      {/* Main Window Canvas Viewport */}
      <div className="flex-1 w-full bg-white dark:bg-popover overflow-y-auto">
        {viewMode === "homepage" || !activeApp ? (
          /* ================= HOMEPAGE VIEW ================= */
          <div className="max-w-2xl mx-auto items-stretch px-6 py-8 flex flex-col gap-8">
            {isFiltering && filteredApp.length === 0 && (
              <p className="text-sm text-zinc-500 image-center justify-center flex">
                No results found.
              </p>
            )}
            {!isFiltering && (
              // Carousel
              <PreviewBanner
                items={featuredApp}
                enableAutoplay
                hasCounter={false}
                enableCounterDesc={false}
                enableImagePreview={false}
                renderItem={(app) => (
                  <div
                    className="relative flex h-80 w-full bg-zinc-950 border dark:border-text-foreground rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => navigateTo(app.url)}
                  >
                    {/* App Details Sidebar (Centered & Color-Matched) */}
                    <div className="flex flex-col justify-center items-center text-center h-full w-52 bg-sidebar border-r border-zinc-800/50 text-sm text-foreground p-5 shrink-0 z-10">
                      {app.logo.type === "emoji" ? (
                        <span className="text-6xl leading-none mb-3 selection:bg-transparent">
                          {app.logo.value}
                        </span>
                      ) : (
                        <div className="mb-3">
                          <Image
                            src={app.logo.value}
                            alt={`${app.name} icon`}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <h3 className="font-bold text-base text-foreground group-hover:text-amber-500 transition-colors">
                        {app.name}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-500 line-clamp-4 leading-relaxed">
                        {app.desc}
                      </p>
                    </div>

                    {/* Image Container */}
                    <div className="relative flex-1 h-full bg-zinc-950">
                      <Image
                        src={app.featuredImage || "/images/default.png"}
                        alt={app.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}
              />
            )}

            {/* App List */}
            <div className="flex flex-col gap-6 max-w-2xl">
              {filteredApp.map((app) => {
                return (
                  <div
                    key={app.name}
                    className="flex items-center justify-between gap-4"
                  >
                    <Button
                      variant="window"
                      onClick={() => navigateTo(app.url)}
                      className="size-24 text-lg rounded flex items-center justify-center hover:shadow-sm transition shrink-0 select-none overflow-hidden"
                    >
                      {app.logo.type === "emoji" ? (
                        <span className="text-6xl line-height-none default-flex-center">
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
                    </Button>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex flex-col text-left leading-tight min-w-0 flex-1">
                          <span className="text-xs font-normal text-foreground truncate">
                            {app.appTags.stack.join(" / ")} |{" "}
                            {app.appTags.device.join(", ")}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="link"
                        onClick={() => navigateTo(app.url)}
                        className="h-auto p-0 text-xl text-foreground hover:text-primary hover:underline font-medium leading-tight mb-1 justify-start text-left whitespace-normal"
                      >
                        {app.name}
                      </Button>
                      <p className="text-sm text-zinc-400 leading-snug line-clamp-3 whitespace-normal wrap-break-word">
                        {app.desc}
                      </p>
                    </div>
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
                    <span className="text-6xl line-height-none default-flex-center">
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
                                activeApp.appTags.device.includes(
                                  devices[1],
                                ) ? (
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
                              const hasMobile = activeApp.appTags.os.some(
                                (os) => ["iOS", "Android"].includes(os),
                              );
                              const hasDesktop = activeApp.appTags.os.some(
                                (os) =>
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
                                  <span>
                                    {activeApp.appTags.os.join(" & ")}
                                  </span>
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
                <a
                  href={activeApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
                            priority={index === 0}
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
      </div>
    </div>
  );
};

export default AppCenter;
