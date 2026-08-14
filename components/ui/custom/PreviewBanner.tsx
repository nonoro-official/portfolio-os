import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/Carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ImagePreview } from "@/components/ui/custom/ImagePreview";
import { usePreviewNav } from "@/hooks/usePreviewNav";

interface PreviewBannerProps<T> {
  items: T[];
  renderItem: (
    item: T,
    index: number,
    actions: { openPreview: () => void },
  ) => React.ReactNode;
  enableAutoplay?: boolean;
  hasCounter?: boolean;
  enableCounterDesc?: boolean;
  imageDesc?: string[];
  enableImagePreview?: boolean;
  renderPreview?: (item: T) => React.ReactNode;
}

export const PreviewBanner = <T,>({
  items,
  renderItem,
  enableAutoplay = true,
  hasCounter = true,
  enableCounterDesc = true,
  imageDesc = [],
  enableImagePreview = false,
  renderPreview,
}: PreviewBannerProps<T>) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const preview = usePreviewNav(items.length);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    if (hasCounter) {
      setCount(api.scrollSnapList().length);
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
      if (hasCounter) {
        setCount(api.scrollSnapList().length);
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, hasCounter]);

  const handleNavigate = preview.navigate;

  const activeIndex = preview.previewIndex ?? current;

  return (
    <>
      <Carousel
        setApi={setApi}
        plugins={enableAutoplay ? [Autoplay({ delay: 3000 })] : []}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className="relative">
              {renderItem(item, index, {
                openPreview: () => {
                  preview.open(index);
                },
              })}
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasCounter && (
          <div className="flex flex-col items-center gap-2 py-3">
            {enableCounterDesc && imageDesc.length > 0 && (
              <p className="text-sm text-muted-foreground transition-all">
                {imageDesc[activeIndex] ?? "Image Preview"}
              </p>
            )}

            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <Button
                  key={index}
                  className={cn(
                    "rounded-full p-0 transition-all duration-500",
                    index === current
                      ? "bg-primary h-2 w-5"
                      : "bg-muted-foreground h-2 w-2 opacity-30",
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        )}
        {items.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {enableImagePreview && (
        <ImagePreview
          items={items}
          previewIndex={preview.previewIndex}
          onClose={() => preview.close()}
          onNavigate={handleNavigate}
          renderPreview={renderPreview}
          imageDesc={imageDesc}
          totalCount={count || items.length}
        />
      )}
    </>
  );
};
