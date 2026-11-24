import { useState, type ComponentProps } from "react";
import { motion } from "framer-motion";

/**
 * Sharp YouTube thumbnails.
 * The site used `hqdefault.jpg` (480x360, 4:3 with black bars) everywhere, which looks soft and
 * upscaled in the larger cards. This tries the 1280x720 `maxresdefault.jpg` first, then 640x480
 * `sddefault.jpg`, then `hqdefault.jpg`, moving down only when a size does not exist for that video.
 */
const QUALITIES = ["maxresdefault", "sddefault", "hqdefault"] as const;

type Props = Omit<ComponentProps<typeof motion.img>, "src" | "alt"> & { id: string; alt: string };

export function YouTubeThumb({ id, alt, onError, onLoad, ...rest }: Props) {
  const [q, setQ] = useState(0);
  const next = () => setQ((i) => Math.min(i + 1, QUALITIES.length - 1));
  return (
    <motion.img
      {...rest}
      src={`https://i.ytimg.com/vi/${id}/${QUALITIES[q]}.jpg`}
      alt={alt}
      onError={(e) => {
        next();
        onError?.(e);
      }}
      onLoad={(e) => {
        // When a size does not exist YouTube can return a tiny grey placeholder; step down if so.
        if (e.currentTarget.naturalWidth <= 200) next();
        onLoad?.(e);
      }}
    />
  );
}
