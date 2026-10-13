// 逐格渲染動畫並與旁白合成 MP4：node tools/render_video.mjs [fps] [workers]
import { chromium } from "playwright";
import { spawn, execFileSync } from "child_process";
import fs from "fs";
import path from "path";
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const FPS = +(process.argv[2] || 24), W = +(process.argv[3] || 4);
const tmp = path.join(root, "tools", ".render"); fs.mkdirSync(tmp, { recursive: true });
fs.mkdirSync(path.join(root, "video"), { recursive: true });

const browser = await chromium.launch();
const probe = await browser.newPage();
await probe.goto("file://" + root + "/index.html?render");
const DUR = await probe.evaluate(() => window.DURATION); await probe.close();
const N = Math.ceil(DUR * FPS), per = Math.ceil(N / W);
console.log(`duration ${DUR}s, ${N} frames, ${W} workers`);

async function worker(w) {
  const from = w * per, to = Math.min(N, from + per);
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto("file://" + root + "/index.html?render");
  await page.evaluate(() => Promise.all([document.fonts.ready, window.charsReady]));
  const out = path.join(tmp, `seg${w}.mp4`);
  const ff = spawn("ffmpeg", ["-v", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-preset", "medium", "-crf", "24", "-pix_fmt", "yuv420p", "-r", String(FPS), out], { stdio: ["pipe", "inherit", "inherit"] });
  for (let f = from; f < to; f++) {
    await page.evaluate((t) => window.renderAt(t), f / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 90 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (w === 0 && f % (FPS * 30) === 0) console.log(`w0 ${f - from}/${to - from}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on("close", r));
  return out;
}
const segs = await Promise.all([...Array(W).keys()].map(worker));
await browser.close();
fs.writeFileSync(path.join(tmp, "list.txt"), segs.map((s) => `file '${s}'`).join("\n"));
const final = path.join(root, "video", "ISMS_Continuity_持續性.mp4");
execFileSync("ffmpeg", ["-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", path.join(tmp, "list.txt"),
  "-i", path.join(root, "audio", "narration.mp3"), "-c:v", "copy", "-c:a", "aac", "-b:a", "128k", "-shortest",
  "-movflags", "+faststart", final], { stdio: "inherit" });
console.log("done:", final);
