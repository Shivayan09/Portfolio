/**
 * Fixed accent grid behind the whole page, faded out towards the bottom with a
 * radial mask so it reads as a halo around the hero rather than wallpaper.
 */
export default function GridField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(204,255,0,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.055) 1px, transparent 1px)",
        backgroundSize: "84px 84px",
        maskImage:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #000 20%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #000 20%, transparent 78%)",
      }}
    />
  );
}
