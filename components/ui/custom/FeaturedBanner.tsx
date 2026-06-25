import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/Carousel";

interface FeaturedBannerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const FeaturedBanner = <T,>({
  items,
  renderItem,
}: FeaturedBannerProps<T>) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setActiveItemIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="flex justify-center items-center h-80 min-w-30 bg-zinc-500">
              {renderItem(item, index)}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
