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
import { Button } from "../Button";

interface PreviewBannerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  enableAutoplay?: boolean;
  hasCounter?: boolean;
  enableCounterDesc?: boolean;
  imageDesc?: string[];
}

export const PreviewBanner = <T,>({
  items,
  renderItem,
  enableAutoplay = true,
  hasCounter = true,
  enableCounterDesc = true,
  imageDesc = [],
}: PreviewBannerProps<T>) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    if (hasCounter) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, hasCounter]);

  return (
    <Carousel
      setApi={setApi}
      plugins={enableAutoplay ? [Autoplay({ delay: 3000 })] : []}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="relative">
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>

      {hasCounter && (
        <div className="flex flex-col items-center gap-2 py-3">
          {enableCounterDesc && imageDesc.length > 0 && (
            <p className="text-sm text-muted-foreground transition-all">
              {imageDesc[current]}
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
