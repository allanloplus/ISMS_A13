# ISO/IEC 27001:2022 持續性 Continuity｜動畫教學簡報

以控制屬性「運作能力 → 持續性」串起 **5.29、5.30、8.13、8.14、8.6**，從三個面向講解：

1. **ISMS 作業重點**：組織要做什麼
2. **稽核查核重點**：稽核員看什麼、問什麼（一條線追到底、查核清單、抽樣小撇步）
3. **常見缺失**：TOP 7 與不符合事項寫法

另含兩個管理實務案例（製造業勒索事件、電商週年慶當機）、阿拉蕾小測驗與總結。
講者為 Q 版 Allan Lo 講師（台灣男聲 `zh-TW-YunJheNeural`）與助教阿拉蕾（`zh-TW-HsiaoYuNeural`），約 10 分鐘。

## 檔案

| 檔案 | 說明 |
|---|---|
| `video/ISMS_Continuity_持續性.mp4` | 成品影片（1280×720，含旁白與字幕） |
| `index.html` | 互動播放器：可暫停、跳頁、開關字幕、全螢幕（空白鍵 / ← → / C / F） |
| `deck.js` | 投影片內容與台詞（**要改內容就改這裡**） |
| `講稿.md` | 逐頁講稿（含時間碼） |
| `audio/narration.mp3`、`timeline.js` | 旁白音軌與時間軸（自動產生） |
| `docs/流程圖_原圖.png` | 原始流程圖參考 |

## 播放

直接用瀏覽器開啟 `index.html` 即可（或 `npx http-server .`）。

## 修改後重新產生

```bash
pip install edge-tts            # 需要 ffmpeg、node、playwright
python3 tools/build_audio.py    # 依 deck.js 產生語音、narration.mp3、timeline.js
node tools/snap.mjs snaps       # （選用）每頁截圖檢查版面
node tools/render_video.mjs 24 4  # 逐格渲染 → video/*.mp4
```

台詞欄位：`s` 講者（A=Allan、R=阿拉蕾）、`t` 字幕、`tts` 念法（如「8.13」念成「八點一三」）、`e` 表情（jump/shock/happy）。

> 角色為自繪 SVG Q 版造型；阿拉蕾造型為致敬風格，若用於商業課程，建議改為自有角色或取得授權。
