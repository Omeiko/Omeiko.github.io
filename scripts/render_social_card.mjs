import { promises as fs } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const svgPath = path.join(root, "assets", "images", "social-card.svg");
const crestPath = path.join(root, "pics", "image.png");
const temporaryDirectory = path.join(root, "tmp");
const temporaryPath = path.join(temporaryDirectory, "social-card-embedded.svg");

const [source, crest] = await Promise.all([
  fs.readFile(svgPath, "utf8"),
  fs.readFile(crestPath)
]);
const dataUrl = `data:image/png;base64,${crest.toString("base64")}`;
const embedded = source.replaceAll("../../pics/image.png", dataUrl);

await fs.mkdir(temporaryDirectory, { recursive: true });
await fs.writeFile(temporaryPath, embedded, "utf8");
console.log(temporaryPath);
