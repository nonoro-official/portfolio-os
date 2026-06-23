"use client";
import React, { useState } from "react";
import { ArrowLeft, Home, RotateCw, Search } from "lucide-react";

const SEARCH_RESULTS = [
  {
    name: "Roll Your Reps",
    url: "https://roll-your-reps.vercel.app",
    desc: "PATHFIT 4 Final - Sports Advocacy Campaign",
    icon: "🛍️",
  },
  {
    name: "VND",
    url: "https://nonoro-official.github.io/vnd.github.io/",
    desc: "Visual Novel Development Club Website. This is a website about a video game that was developed in a school club I joined in 11th grade! The website was made for an assignment in my web design and scripting class. The video game is a visual novel dating simulator about supernatural characters in a magic school.",
    icon: "💬",
  },
  {
    name: "Personal Website",
    url: "https://nonoro-official.github.io/noahpenaranda-personalwebsite.github.io/",
    desc: "Personal website made for college.",
    icon: "📊",
  },
  {
    name: "Portfolio",
    url: "https://nonoro-official.github.io/portfolio/",
    desc: "Original portfolio website. Based from the personal website.",
    icon: "🌐",
  },
];

const Browser = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");
  const [viewMode, setViewMode] = useState<"homepage" | "iframe">("homepage");

  const [refreshKey, setRefreshKey] = useState<number>(0);

  const navigateTo = (url: string) => {
    setCurrentUrl(url);
    setInputUrl(url);
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

  return (
    <div className="w-full h-full flex flex-col bg-[#FDFBF7] text-zinc-800 font-sans select-text">
      {/* Top Browser Control Bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#EADBB6]/40 border-b border-zinc-200/50 shrink-0">
        <div className="flex items-center gap-1.5 text-zinc-600">
          <button
            onClick={goHome}
            disabled={viewMode === "homepage"}
            className="p-1 hover:bg-zinc-200/50 rounded disabled:opacity-30 transition"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            onClick={goHome}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <Home className="size-4" />
          </button>
          <button
            onClick={refreshPage}
            className="p-1 hover:bg-zinc-200/50 rounded transition"
          >
            <RotateCw className="size-4" />
          </button>
        </div>

        {/* Address Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputUrl.trim())
              navigateTo(
                inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`,
              );
          }}
          className="flex-1 relative flex items-center"
        >
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Googly or type a URL..."
            className="w-full bg-white border border-zinc-200 text-zinc-700 rounded pl-8 pr-3 py-1 text-xs outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 transition"
          />
          <Search className="size-3.5 text-zinc-400 absolute left-2.5 pointer-events-none" />
        </form>
      </div>

      {/* Main Window Canvas Viewport */}
      <div className="flex-1 w-full bg-white overflow-y-auto">
        {viewMode === "homepage" ? (
          /* ================= GOOGLE HOMEPAGE CUSTOM INDEX ================= */
          <div className="max-w-2xl mx-auto px-6 py-4 flex flex-col">
            <div className="w-full flex items-center gap-4 mb-6 border-b border-zinc-200 pb-4">
              <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-amber-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent select-none shrink-0 py-1">
                Googly
              </h1>
              <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-full flex items-center px-4 py-2.5 shadow-sm text-sm text-zinc-400 select-none">
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
                    placeholder="View my websites..."
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full bg-transparent outline-none text-foreground"
                  />
                </form>
              </div>
            </div>

            <div className="w-full gap-4">
              {SEARCH_RESULTS.map((site) => (
                <button
                  key={site.name}
                  onClick={() => navigateTo(site.url)}
                  className="group text-left p-4 flex items-start gap-3 w-full"
                >
                  <span className="text-2xl p-2 shadow-inner group-hover:scale-105">
                    {site.icon}
                  </span>
                  <div className="truncate">
                    <h3 className="font-semibold text-zinc-800 text-sm group-hover:text-amber-700 ">
                      {site.name}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate mt-1">
                      {site.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ================= LIVE EMBEDDED IFRAME VIEW ================= */
          <iframe
            key={refreshKey}
            src={currentUrl}
            title="Live Website Runner"
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms"
            allow="autoplay; fullscreen"
          />
        )}
      </div>
    </div>
  );
};

export default Browser;
