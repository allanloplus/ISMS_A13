// 每頁截一張圖做版面檢查：node tools/snap.mjs <outdir>
import { chromium } from "playwright";
import path from "path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = process.argv[2] || "snaps";
const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto("file://" + root + "/index.html?render");
await page.evaluate(() => document.fonts.ready);
const T = await page.evaluate(() => window.TIMELINE);
for (const [i, s] of T.scenes.entries()) {
  const lt = s.lines[s.lines.length - 1];
  const t = (lt.start + lt.end) / 2;
  await page.evaluate((t) => window.renderAt(t), t);
  await page.screenshot({ path: `${out}/s${String(i).padStart(2, "0")}_${s.id}.png` });
}
await browser.close();
