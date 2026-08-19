import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "../button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImagePreviewProps<T> {
  items: T[];
  previewIndex: number | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  renderPreview?: (item: T) => React.ReactNode;
  imageDesc?: string[];
  totalCount: number;
}

export const ImagePreview = <T,>({
  items,
  previewIndex,
  onClose,
  onNavigate,
  renderPreview,
  imageDesc = [],
  totalCount,
}: ImagePreviewProps<T>) => {
  if (previewIndex === null) return null;

  return (
    <Dialog
      open={previewIndex !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-none h-[95vh] sm:max-h-none p-4 bg-background border border-border rounded-xl shadow-2xl flex flex-col gap-4 overflow-hidden">
        <div className="relative w-full flex-1 min-h-0 bg-muted/30 rounded-lg overflow-hidden group">
          {renderPreview ? renderPreview(items[previewIndex]) : null}

          {/* Left Nav Button */}
          {items.length > 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute z-20 left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/80 text-foreground dark:text-foreground backdrop-blur-xs shadow-md transition-all hover:bg-background"
              disabled={previewIndex === 0}
              onClick={() => onNavigate("prev")}
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
              className="absolute z-20 right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-background/80 text-foreground dark:text-foreground backdrop-blur-xs shadow-md transition-all hover:bg-background"
              disabled={previewIndex === items.length - 1}
              onClick={() => onNavigate("next")}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          )}
        </div>

        {/* Description & Counter */}
        {imageDesc.length > 0 && (
          <div className="flex flex-col gap-1 px-2 pb-2 border-t border-border pt-3 justify-center items-center text-center">
            <p className="text-base font-medium text-foreground">
              {imageDesc[previewIndex] ?? "Image Preview"}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              {previewIndex + 1} of {totalCount}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
