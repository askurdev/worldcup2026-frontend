const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "icon-source.svg");
const OUT_DIR = __dirname;

// Standard PWA icon sizes. 192/512 are the manifest minimums;
// the others cover apple-touch-icon and favicon use cases.
const SIZES = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

async function generate() {
  for (const size of SIZES) {
    const outPath = path.join(OUT_DIR, `icon-${size}.png`);
    await sharp(SRC, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Generated ${outPath}`);
  }

  // Maskable icon: render the logo at a reduced size (80% of 512,
  // i.e. 410px) then pad symmetrically to exactly 512x512. This
  // keeps the logo's visual size correct while reserving the outer
  // ~20% safe-zone margin that OS icon masks are allowed to crop,
  // per the PWA maskable-icon spec. (Previous approach padded then
  // re-resized, which incorrectly shrank the logo a second time.)
  const logoSize = 410;
  const padding = (512 - logoSize) / 2; // 51px each side
  await sharp(SRC, { density: 384 })
    .resize(logoSize, logoSize)
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: "#0b3d2e",
    })
    .png()
    .toFile(path.join(OUT_DIR, "icon-maskable-512.png"));
  console.log("Generated maskable icon");

  // apple-touch-icon (no transparency, 180x180 is Apple's recommended size)
  await sharp(SRC, { density: 384 })
    .resize(180, 180)
    .flatten({ background: "#0b3d2e" })
    .png()
    .toFile(path.join(OUT_DIR, "apple-touch-icon.png"));
  console.log("Generated apple-touch-icon");
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
