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
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

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

  const handleNavigate = (direction: "prev" | "next") => {
    if (previewIndex === null) return;

    if (direction === "prev" && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }

    if (direction === "next" && previewIndex < items.length - 1) {
      setPreviewIndex(previewIndex + 1);
    }
  };

  const activeIndex = previewIndex ?? current;

  return (
    <Dialog
      open={previewIndex !== null}
      onOpenChange={(open) => {
        if (!open) setPreviewIndex(null);
      }}
    >
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
                  setPreviewIndex(index);
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
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-none h-[95vh] sm:max-h-none p-4 bg-background border border-border rounded-xl shadow-2xl flex flex-col gap-4 overflow-hidden">
          {previewIndex !== null && (
            <div className="relative w-full flex-1 min-h-0 bg-muted/30 rounded-lg overflow-hidden group">
              {renderPreview ? renderPreview(items[previewIndex]) : null}

              {/* Left Nav Button */}
              {items.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-xs shadow-md transition-all hover:bg-background"
                  disabled={previewIndex === 0}
                  onClick={() => handleNavigate("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous image</span>
                </Button>
              )}

              {/* Right Nav Button */}
              {items.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 backdrop-blur-xs shadow-md transition-all hover:bg-background"
                  disabled={previewIndex === items.length - 1}
                  onClick={() => handleNavigate("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next image</span>
                </Button>
              )}
            </div>
          )}

          {/* Description & Counter */}
          {imageDesc && imageDesc.length > 0 && (
            <div className="flex flex-col gap-1 px-2 pb-2 border-t border-border pt-3 justify-center items-center text-center">
              <p className="text-base font-medium text-foreground">
                {previewIndex !== null
                  ? (imageDesc[previewIndex] ?? "Image Preview")
                  : "Image Preview"}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {previewIndex !== null ? previewIndex + 1 : 0} of{" "}
                {count || items.length}
              </p>
            </div>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
};
