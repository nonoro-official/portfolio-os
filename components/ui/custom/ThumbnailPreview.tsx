"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/Carousel";

interface ThumbnailPreviewProps<T> {
  items: T[];
  renderMainItem: (item: T, index: number) => React.ReactNode;
  renderThumbItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export const ThumbnailPreview = <T,>({
  items,
  renderMainItem,
  renderThumbItem,
  className,
}: ThumbnailPreviewProps<T>) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      {/* Main Feature Display */}
      <Carousel setApi={setMainApi} className="w-full">
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index}>
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
    </div>
  );
};
