import chapters from "./chapters.json";

export { chapters };
export type Chapter = (typeof chapters)[number];

/** Previous/next chapter by chapterNumber order. */
export function getAdjacentChapters(chapterNumber: number) {
  const sorted = [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber);
  const idx = sorted.findIndex(c => c.chapterNumber === chapterNumber);
  return {
    previous: idx > 0 ? sorted[idx - 1] : null,
    next: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}
