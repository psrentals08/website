/** Prefix plain anchors and media URLs for a GitHub Pages project site. */
export function sitePath(path: string) {
  return (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;
}
