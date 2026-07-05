"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/Carousel";
import { ImagePreview } from "@/components/ui/custom/ImagePreview";

interface ThumbnailPreviewProps<T> {
  items: T[];
  renderMainItem: (item: T, index: number) => React.ReactNode;
  renderThumbItem: (item: T, index: number) => React.ReactNode;
  imageDesc?: string[];
  enableImagePreview?: boolean;
  renderPreview?: (item: T) => React.ReactNode;
  className?: string;
}

export const ThumbnailPreview = <T,>({
  items,
  renderMainItem,
  renderThumbItem,
  imageDesc = [],
  enableImagePreview = false,
  renderPreview,
  className,
}: ThumbnailPreviewProps<T>) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi],
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  const handleNavigate = (direction: "prev" | "next") => {
    if (previewIndex === null) return;

    let nextIndex = previewIndex;
    if (direction === "prev" && previewIndex > 0) {
      nextIndex = previewIndex - 1;
    }
    if (direction === "next" && previewIndex < items.length - 1) {
      nextIndex = previewIndex + 1;
    }

    setPreviewIndex(nextIndex);
    // Sync the background slider with our modal navigation!
    mainApi?.scrollTo(nextIndex);
  };

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      {/* Main Feature Display */}
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              // Clicking the main item opens the preview modal at its current index
              onClick={() => enableImagePreview && setPreviewIndex(index)}
              className={cn(enableImagePreview && "cursor-zoom-in")}
            >
              {renderMainItem(item, index)}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnail Track */}
      <Carousel
        setApi={setThumbApi}
        opts={{
          containScroll: "keepSnaps",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 flex-row">
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/5 cursor-pointer pl-2 sm:basis-1/6"
              onClick={() => onThumbClick(index)}
            >
              <div
                className={cn(
                  "rounded-lg relative aspect-square overflow-hidden border-2 transition-all",
                  index === selectedIndex
                    ? "border-amber-500 opacity-100 shadow-sm"
                    : "border-transparent opacity-50 hover:opacity-80",
                )}
              >
                {renderThumbItem(item, index)}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {enableImagePreview && (
        <ImagePreview
          items={items}
          previewIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onNavigate={handleNavigate}
          renderPreview={renderPreview}
          imageDesc={imageDesc}
          totalCount={items.length}
        />
      )}
    </div>
  );
};
