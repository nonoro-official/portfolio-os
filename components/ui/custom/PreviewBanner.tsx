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

interface FeaturedBannerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  enableAutoplay?: boolean;
  hasCounter?: boolean;
}

export const FeaturedBanner = <T,>({
  items,
  renderItem,
  enableAutoplay = true,
  hasCounter = true,
}: FeaturedBannerProps<T>) => {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    if (hasCounter) {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
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
        <div className="flex justify-center gap-2 py-3">
          {items.map((item, index) => (
            <Button
              key={index}
              className={cn(
                "rounded-full p-0 cursor-pointer transition-all duration-500 ease-in-out",
                index === current
                  ? "bg-primary h-2 w-5 opacity-100"
                  : "bg-muted-foreground h-2 w-2 opacity-30 hover:opacity-50",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
