"""產生旁白語音（edge-tts）並組成單一音軌 audio/narration.mp3 與時間軸 timeline.js。

用法：python3 tools/build_audio.py
需要：pip install edge-tts、ffmpeg、node（讀取 deck.js）
"""
import asyncio, hashlib, json, os, subprocess, sys, wave

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "tools", ".tts_cache")
os.makedirs(CACHE, exist_ok=True)

# 雲端環境的 HTTPS proxy 使用自有 CA；本機執行時不影響
if os.path.exists("/root/.ccr/ca-bundle.crt"):
    import certifi
    certifi.where = lambda: "/root/.ccr/ca-bundle.crt"
import edge_tts

VOICES = {
    "A": dict(voice="zh-TW-YunJheNeural", rate="+4%", pitch="+0Hz"),   # Allan Lo：台灣男聲
    "R": dict(voice="zh-TW-HsiaoYuNeural", rate="+10%", pitch="+25Hz"),  # 阿拉蕾：活潑女聲
}
SR = 24000
LEAD, GAP, TAIL = 0.6, 0.3, 1.0  # 每頁開頭、句間、每頁結尾留白（秒）

deck = json.loads(subprocess.check_output(
    ["node", "-e", "process.stdout.write(JSON.stringify(require(process.argv[1])))", os.path.join(ROOT, "deck.js")]))


async def tts(text, cfg, out):
    for attempt in range(4):
        try:
            await edge_tts.Communicate(text, cfg["voice"], rate=cfg["rate"], pitch=cfg["pitch"]).save(out)
            return
        except Exception as e:  # 網路偶發錯誤重試
            print("retry", attempt, e, file=sys.stderr)
            await asyncio.sleep(2 ** attempt)
    raise RuntimeError("TTS failed: " + text)


def pcm_of(mp3):
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", mp3, "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"])
    # 去掉頭尾靜音（簡易門檻）
    import array
    a = array.array("h", raw)
    thr = 300
    s = next((i for i, v in enumerate(a) if abs(v) > thr), 0)
    e = len(a) - next((i for i, v in enumerate(reversed(a)) if abs(v) > thr), 0)
    s = max(0, s - int(0.03 * SR)); e = min(len(a), e + int(0.08 * SR))
    return a[s:e].tobytes()


async def main():
    jobs = []
    for sc in deck["scenes"]:
        for ln in sc["lines"]:
            cfg = VOICES[ln["s"]]
            text = ln.get("tts") or ln["t"]
            key = hashlib.md5(json.dumps([text, cfg], ensure_ascii=False).encode()).hexdigest()[:16]
            ln["_mp3"] = os.path.join(CACHE, key + ".mp3")
            if not os.path.exists(ln["_mp3"]) or os.path.getsize(ln["_mp3"]) == 0:
                jobs.append(tts(text, cfg, ln["_mp3"]))
    sem = asyncio.Semaphore(4)
    async def run(j):
        async with sem:
            await j
    await asyncio.gather(*(run(j) for j in jobs))

    pcm = bytearray()
    silence = lambda sec: b"\x00\x00" * int(sec * SR)
    t = lambda: len(pcm) / 2 / SR
    timeline = []
    for sc in deck["scenes"]:
        scene = {"id": sc["id"], "start": round(t(), 3), "lines": []}
        pcm += silence(LEAD)
        for i, ln in enumerate(sc["lines"]):
            if i: pcm += silence(GAP)
            st = t(); pcm += pcm_of(ln["_mp3"])
            scene["lines"].append({"s": ln["s"], "start": round(st, 3), "end": round(t(), 3)})
        pcm += silence(TAIL)
        scene["end"] = round(t(), 3)
        timeline.append(scene)

    wav = os.path.join(CACHE, "narration.wav")
    with wave.open(wav, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(bytes(pcm))
    subprocess.check_call(["ffmpeg", "-v", "error", "-y", "-i", wav, "-c:a", "libmp3lame", "-b:a", "64k",
                           os.path.join(ROOT, "audio", "narration.mp3")])
    with open(os.path.join(ROOT, "timeline.js"), "w", encoding="utf-8") as f:
        f.write("// 由 tools/build_audio.py 自動產生，請勿手動修改\n")
        f.write("const TIMELINE = " + json.dumps({"duration": round(t(), 3), "scenes": timeline}, ensure_ascii=False) + ";\n")
        f.write('if (typeof module !== "undefined") module.exports = TIMELINE; else window.TIMELINE = TIMELINE;\n')
    print("total %.1fs, %d scenes" % (t(), len(timeline)))

asyncio.run(main())
