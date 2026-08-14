import { useState } from "react";

export function usePreviewNav(
  count: number,
  onIndexChange?: (index: number) => void,
) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const open = (index: number) => setPreviewIndex(index);
  const close = () => setPreviewIndex(null);

  const navigate = (direction: "prev" | "next") => {
    if (previewIndex === null) return;

    const next =
      direction === "prev"
        ? Math.max(0, previewIndex - 1)
        : Math.min(count - 1, previewIndex + 1);

    if (next === previewIndex) return;

    setPreviewIndex(next);
    onIndexChange?.(next);
  };

  return { previewIndex, open, close, navigate };
}
