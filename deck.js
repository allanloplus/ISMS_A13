/*
 * ISO/IEC 27001:2022 運作能力屬性「持續性 Continuity」動畫教學簡報
 * 講者：A = Q版 Allan Lo 講師（台灣男聲）；R = 助教阿拉蕾（台灣女聲）
 *
 * 每個 scene：
 *   chapter : 頁首章節標籤
 *   html    : 版面內容；元素加上 data-s="n" 代表在第 n 句台詞開始時出場，
 *             data-a 指定出場動畫（pop / up / left / right / fade / grow）
 *   lines   : 台詞。s = 講者、t = 字幕、tts = 語音用文字（念法與字幕不同時才填）、
 *             e = 表情（jump / shock / happy）
 */
const DECK = {
  title: "ISO 27001:2022 持續性 Continuity",
  scenes: [
    /* ───────────── 開場 ───────────── */
    {
      id: "intro",
      chapter: "開場",
      html: `
<div class="title-wrap">
  <div class="kicker" data-s="0" data-a="up">ISO/IEC 27001:2022 · 控制屬性「運作能力」</div>
  <h1 class="mega" data-s="0" data-a="pop">持續性 <span class="en">Continuity</span></h1>
  <div class="ctl-row" data-s="1" data-a="up">
    <span class="pill p529">5.29</span><span class="pill p530">5.30</span>
    <span class="pill p813">8.13</span><span class="pill p814">8.14</span><span class="pill p86">8.6</span>
  </div>
  <div class="three">
    <div class="tri c1" data-s="3" data-a="pop"><b>①</b>ISMS 作業重點</div>
    <div class="tri c2" data-s="3" data-a="pop"><b>②</b>稽核查核重點</div>
    <div class="tri c3" data-s="3" data-a="pop"><b>③</b>常見缺失</div>
  </div>
</div>`,
      lines: [
        { s: "A", t: "哈囉大家好！我是 Allan Lo，Allan 老師。今天帶大家看 ISO 27001 2022 年版，控制屬性中「運作能力」的「持續性 Continuity」。" },
        { s: "R", t: "老師好～我是助教阿拉蕾！持續性？是說我可以一直吃點心、不要中斷嗎？", e: "jump" },
        { s: "A", t: "哈哈，有一點像喔！持續性是讓公司的資訊服務，遇到天災、停電、勒索病毒，也能不中斷，或者很快恢復。" },
        { s: "A", t: "今天分三段：ISMS 作業重點、稽核查核重點、常見缺失，中間還有實際的管理案例。準備好了嗎？" },
        { s: "R", t: "準備好了！出發～咻～！", e: "jump" },
      ],
    },

    /* ───────────── 控制屬性暖身 ───────────── */
    {
      id: "attributes",
      chapter: "暖身：控制屬性",
      html: `
<h2 class="h2" data-s="0" data-a="left">27002:2022 每個控制都有 5 種「屬性標籤」</h2>
<div class="attr-row">
  <div class="attr" data-s="0" data-a="pop"><i>🛡️</i>控制型式<small>預防/偵測/矯正</small></div>
  <div class="attr" data-s="0" data-a="pop"><i>🔐</i>資安特性<small>C / I / A</small></div>
  <div class="attr" data-s="0" data-a="pop"><i>🌐</i>網宇安全概念<small>識別/保護/偵測/回應/復原</small></div>
  <div class="attr hot" data-s="1" data-a="pop"><i>⚙️</i>運作能力<small>15 類 ★ 持續性</small></div>
  <div class="attr" data-s="0" data-a="pop"><i>🏛️</i>安全領域<small>治理/保護/防禦/韌性</small></div>
</div>
<div class="balls" data-s="2" data-a="up">
  <div class="ball">5.29<small>中斷期間之資訊安全</small></div>
  <div class="ball">5.30<small>營運持續之ICT備妥性</small></div>
  <div class="ball">8.13<small>資訊備份</small></div>
  <div class="ball">8.14<small>資訊處理設施之多備</small></div>
  <div class="ball">8.6<small>容量管理</small></div>
</div>`,
      lines: [
        { s: "A", t: "先暖身一下。2022 年版的 27002，每一個控制措施都貼了五種屬性標籤：控制型式、資安特性、網宇安全概念、運作能力，還有安全領域。" },
        { s: "A", t: "其中「運作能力」一共分十五類，今天的主角是「持續性」。" },
        { s: "A", t: "持續性主要串起五個控制：5.29、5.30、8.13、8.14，還有 8.6 容量管理。", tts: "持續性主要串起五個控制：五點二九、五點三零、八點一三、八點一四，還有八點六容量管理。" },
        { s: "R", t: "喔～就像集滿五顆龍珠，就可以召喚神龍！", e: "jump" },
        { s: "A", t: "沒錯！五顆都要到齊，營運持續這條神龍才召喚得出來。" },
      ],
    },

    /* ───────────── 流程總覽（重繪使用者提供的流程圖） ───────────── */
    {
      id: "flow",
      chapter: "流程總覽",
      html: `
<div class="flow">
  <div class="fnode n529" data-s="0" data-a="pop"><div class="ficon">⛈️🌋🌪️</div><b>5.29</b>中斷期間<br>之資訊安全</div>
  <div class="farrow a1" data-s="0" data-a="grow"><span>目標</span></div>
  <div class="fnode n530" data-s="0" data-a="pop"><div class="ficon">⏱️⚙️💡</div><b>5.30</b>營運持續之<br>ICT備妥性</div>
  <div class="farrow a2 green" data-s="1" data-a="grow"><span>規劃</span></div>
  <div class="fplan" data-s="1" data-a="up">
    <div><i>⏰</i>復原時間目標</div>
    <div><i>🔗</i>服務相依性</div>
    <div><i>👥</i>角色職責</div>
  </div>
  <div class="farrow a3 grey" data-s="2" data-a="grow"><span>實作</span></div>
  <div class="fring r813" data-s="2" data-a="pop"><div class="ficon">🗄️</div><b>8.13</b>資訊備份</div>
  <div class="fring r814" data-s="2" data-a="pop"><div class="ficon">🖥️</div><b>8.14</b>資訊處理<br>設施之多備</div>
  <div class="fcap" data-s="2" data-a="right"><i>📊</i><b>8.6</b> 容量管理</div>
  <div class="floop" data-s="3" data-a="fade">
    <div class="loop-right"><span>維<br>護</span></div>
    <div class="loop-bottom"><span>測試</span></div>
    <div class="loop-left"></div>
  </div>
</div>`,
      lines: [
        { s: "A", t: "來看這張流程圖。起點是 5.29「中斷期間之資訊安全」，它設定目標：就算發生中斷，資安水準也不能掉。", tts: "來看這張流程圖。起點是五點二九「中斷期間之資訊安全」，它設定目標：就算發生中斷，資安水準也不能掉。" },
        { s: "A", t: "接著由 5.30「營運持續之 ICT 備妥性」來規劃：復原時間目標、服務相依性、角色職責，三件事要先想清楚。", tts: "接著由五點三零「營運持續之 ICT 備妥性」來規劃：復原時間目標、服務相依性、角色職責，三件事要先想清楚。" },
        { s: "A", t: "然後實作：8.13 資訊備份、8.14 資訊處理設施之多備，再加上 8.6 容量管理，確保資源一直夠用。", tts: "然後實作：八點一三資訊備份、八點一四資訊處理設施之多備，再加上八點六容量管理，確保資源一直夠用。" },
        { s: "A", t: "最後一定要維護、並且測試，再回饋到 5.29，形成一個 PDCA 的循環。", tts: "最後一定要維護、並且測試，再回饋到五點二九，形成一個 PDCA 的循環。" },
        { s: "R", t: "我懂了！規劃、實作、測試、改善，一直轉圈圈～就像我在操場跑步一樣！", e: "jump" },
      ],
    },

    /* ───────────── 第一部分 ───────────── */
    {
      id: "part1",
      chapter: "第一部分",
      layout: "chapter",
      html: `
<div class="chap c1" data-s="0" data-a="pop">
  <div class="chap-no">PART 1</div>
  <div class="chap-title">ISMS 作業重點</div>
  <div class="chap-sub">組織要「做什麼」才算落實？</div>
</div>`,
      lines: [
        { s: "R", t: "第一關：ISMS 作業重點！老師，組織到底要做哪些事？", e: "jump" },
        { s: "A", t: "好，我們一個控制一個控制來看，每一個都有顧問實務上的眉角。" },
      ],
    },
    {
      id: "p1-529",
      chapter: "作業重點 ① 5.29 中斷期間之資訊安全",
      html: `
<div class="ctl-head"><span class="pill p529 big">5.29</span><div><h2>中斷期間之資訊安全</h2><p>組織應規劃如何在中斷期間，維持資訊安全於適當等級。</p></div></div>
<ul class="bul">
  <li data-s="0" data-a="left"><i>📘</i>BCP / DRP 中要有「資安章節」，不是只寫業務怎麼恢復</li>
  <li data-s="1" data-a="left"><i>🔑</i>緊急帳號、臨時權限：誰核准？用多久？事後收回並檢視日誌</li>
  <li data-s="2" data-a="left"><i>🏢</i>備援站 / 替代作業環境的控制，要與正常環境同等（防毒、日誌、加密）</li>
  <li data-s="2" data-a="left"><i>✅</i>復原後檢查：系統完整性確認、異常清查、回到正常程序</li>
</ul>
<div class="sticker" data-s="3" data-a="pop">🚪 停電≠門禁全開！</div>`,
      lines: [
        { s: "A", t: "5.29 的重點是：營運持續計畫裡面，要明確寫出「中斷期間資安怎麼維持」，不能只寫業務怎麼恢復。", tts: "五點二九的重點是：營運持續計畫裡面，要明確寫出「中斷期間資安怎麼維持」，不能只寫業務怎麼恢復。" },
        { s: "A", t: "例如緊急時開的臨時帳號、臨時權限，誰核准？用多久？事後有沒有收回、有沒有檢視操作日誌？" },
        { s: "A", t: "還有切換到備援站或臨時作業環境時，防毒、日誌、加密這些控制要跟平常一樣，不能因為趕時間就全部關掉。" },
        { s: "R", t: "就像停電的時候，門禁不能直接打開，讓大家自由進出，對吧？" },
        { s: "A", t: "答對了！阿拉蕾加十分！", e: "happy" },
      ],
    },
    {
      id: "p1-530",
      chapter: "作業重點 ② 5.30 營運持續之ICT備妥性",
      html: `
<div class="ctl-head"><span class="pill p530 big">5.30</span><div><h2>營運持續之 ICT 備妥性</h2><p>ICT 備妥性應依營運持續目標及 ICT 持續要求，予以規劃、實作、維護及測試。</p></div></div>
<div class="bia">
  <div class="bia-step" data-s="0" data-a="pop"><b>BIA</b>營運衝擊分析</div>
  <div class="bia-arrow" data-s="0" data-a="grow">➜</div>
  <div class="bia-step" data-s="0" data-a="pop"><b>RTO</b>多久要恢復</div>
  <div class="bia-step" data-s="1" data-a="pop"><b>RPO</b>最多掉多少資料</div>
</div>
<div class="dep" data-s="2" data-a="up">
  <span class="dep-t">服務相依性</span>
  <span class="chip">ERP</span>→<span class="chip">資料庫</span>→<span class="chip">網路</span>→<span class="chip">AD / DNS</span>→<span class="chip">雲端 / 供應商</span>
</div>
<div class="roles" data-s="4" data-a="up">
  <span class="dep-t">角色職責</span>
  <span class="chip o">宣告災難</span><span class="chip o">執行切換</span><span class="chip o">對外溝通</span><span class="chip o">演練</span>
</div>`,
      lines: [
        { s: "A", t: "5.30 的核心是 BIA，營運衝擊分析。從業務需求推出 RTO 復原時間目標。", tts: "五點三零的核心是 BIA，營運衝擊分析。從業務需求推出 RTO，復原時間目標。" },
        { s: "A", t: "還有 RPO 復原點目標，就是最多可以掉多少資料。例如 RPO 四小時，備份至少四小時就要做一次。", tts: "還有 RPO，復原點目標，就是最多可以掉多少資料。例如 RPO 四小時，備份至少四小時就要做一次。" },
        { s: "R", t: "那「服務相依性」又是什麼呢？" },
        { s: "A", t: "好問題！ERP 要能用，背後要有資料庫、網路、AD、DNS，甚至雲端廠商。只救 ERP 主機，其他沒救，系統還是不會動！" },
        { s: "A", t: "最後是角色職責：誰宣告災難、誰執行切換、誰對外溝通，都要寫清楚，並且排進年度演練。" },
      ],
    },
    {
      id: "p1-813",
      chapter: "作業重點 ③ 8.13 資訊備份",
      html: `
<div class="ctl-head"><span class="pill p813 big">8.13</span><div><h2>資訊備份</h2><p>資訊、軟體及系統之備份，應依議定之主題特定政策維護並定期測試。</p></div></div>
<div class="policy" data-s="0" data-a="up">
  <span>備份政策：</span><span class="chip">範圍</span><span class="chip">頻率</span><span class="chip">保存期限</span><span class="chip">加密</span><span class="chip">存放地點</span>
</div>
<div class="rule32110">
  <div class="n" data-s="1" data-a="pop"><b>3</b>份資料</div>
  <div class="n" data-s="1" data-a="pop"><b>2</b>種媒體</div>
  <div class="n" data-s="1" data-a="pop"><b>1</b>份異地</div>
  <div class="n" data-s="1" data-a="pop"><b>1</b>份離線/不可變</div>
  <div class="n" data-s="1" data-a="pop"><b>0</b>還原錯誤</div>
</div>
<div class="quote" data-s="3" data-a="pop">「沒有還原過的備份，只能叫做<span>希望</span>。」</div>`,
      lines: [
        { s: "A", t: "8.13 資訊備份，先要有備份政策：備什麼、多久備一次、保存多久、要不要加密、放在哪裡。", tts: "八點一三資訊備份，先要有備份政策：備什麼、多久備一次、保存多久、要不要加密、放在哪裡。" },
        { s: "A", t: "業界常用「3-2-1-1-0」原則：三份資料、兩種媒體、一份異地、一份離線或不可變，還原驗證零錯誤。", tts: "業界常用三二一一零原則：三份資料、兩種媒體、一份異地、一份離線或不可變，還原驗證零錯誤。" },
        { s: "R", t: "3-2-1-1-0……聽起來好像火箭發射倒數耶！", tts: "三二一一零……聽起來好像火箭發射倒數耶！", e: "jump" },
        { s: "A", t: "對！備份做好才能安心發射。還有重點中的重點：備份一定要定期「還原測試」。沒有還原過的備份，只能叫做希望。" },
      ],
    },
    {
      id: "p1-814",
      chapter: "作業重點 ④ 8.14 資訊處理設施之多備",
      html: `
<div class="ctl-head"><span class="pill p814 big">8.14</span><div><h2>資訊處理設施之多備</h2><p>資訊處理設施應以足夠之多備實作，以滿足可用性要求。</p></div></div>
<div class="spof" data-s="0" data-a="pop"><span class="x">⚠️ SPOF</span> 先找出「單點故障」</div>
<div class="redun">
  <div data-s="1" data-a="up"><i>🔥</i>防火牆 HA</div>
  <div data-s="1" data-a="up"><i>📡</i>雙電信線路</div>
  <div data-s="1" data-a="up"><i>🔌</i>雙電源 + UPS</div>
  <div data-s="1" data-a="up"><i>☁️</i>雲端多可用區</div>
</div>
<div class="warnbar" data-s="2" data-a="left">多備 ≠ 買兩台就好 → 要測試切換、設定與修補要同步</div>`,
      lines: [
        { s: "A", t: "8.14 資訊處理設施之多備，第一步是找出單點故障，然後依照可用性需求來設計多備。", tts: "八點一四資訊處理設施之多備，第一步是找出單點故障，然後依照可用性需求來設計多備。" },
        { s: "A", t: "例如防火牆做 HA、兩家電信線路、雙電源加上 UPS，雲端服務則使用多個可用區。" },
        { s: "A", t: "要注意，多備不是買兩台就好！要實際測試切換，而且備援那台的設定、修補也要同步更新。" },
        { s: "R", t: "就像我有兩副眼鏡，可是備用那副度數不對，掉了也是看不到嘛！", e: "happy" },
      ],
    },
    {
      id: "p1-86",
      chapter: "作業重點 ⑤ 8.6 容量管理",
      html: `
<div class="ctl-head"><span class="pill p86 big">8.6</span><div><h2>容量管理</h2><p>資源之使用應依當前及預期之容量要求，予以監視及調整。</p></div></div>
<div class="gauges">
  <div class="gauge" data-s="0" data-a="pop"><div class="g-bar"><span style="--v:62%"></span></div>CPU</div>
  <div class="gauge" data-s="0" data-a="pop"><div class="g-bar"><span style="--v:71%"></span></div>記憶體</div>
  <div class="gauge" data-s="0" data-a="pop"><div class="g-bar hot"><span style="--v:92%"></span></div>磁碟</div>
  <div class="gauge" data-s="0" data-a="pop"><div class="g-bar"><span style="--v:48%"></span></div>頻寬</div>
  <div class="gauge" data-s="0" data-a="pop"><div class="g-bar warn"><span style="--v:84%"></span></div>授權數</div>
</div>
<div class="thr" data-s="0" data-a="up"><span class="y">80% 預警</span><span class="r">90% 告警</span></div>
<div class="trend" data-s="1" data-a="left">📈 趨勢分析 + 業務活動（週年慶、新系統上線）→ 提前擴充</div>
<div class="trend people" data-s="3" data-a="left">👤 人力也是容量：關鍵人員只有一位 = 單點故障</div>`,
      lines: [
        { s: "A", t: "8.6 容量管理，要監控 CPU、記憶體、磁碟、頻寬，甚至授權數量，並且設定告警門檻。", tts: "八點六容量管理，要監控 CPU、記憶體、磁碟、頻寬，甚至授權數量，並且設定告警門檻。" },
        { s: "A", t: "再依照業務成長做趨勢分析、提前擴充。像電商週年慶，流量可能一下子暴增十倍。" },
        { s: "R", t: "那「人力」也算是容量嗎？" },
        { s: "A", t: "算！如果某個系統只有一位工程師會維護，他請假就沒人會修，這也是容量和持續性的風險喔。" },
      ],
    },

    /* ───────────── 第二部分 ───────────── */
    {
      id: "part2",
      chapter: "第二部分",
      layout: "chapter",
      html: `
<div class="chap c2" data-s="0" data-a="pop">
  <div class="chap-no">PART 2</div>
  <div class="chap-title">稽核查核重點</div>
  <div class="chap-sub">稽核員會「看什麼、問什麼」？</div>
</div>`,
      lines: [
        { s: "R", t: "第二關：稽核查核重點！老師換上稽核員的帽子囉～", e: "jump" },
        { s: "A", t: "好，現在我是驗證公司的稽核員，來看看我們會看什麼、問什麼。" },
      ],
    },
    {
      id: "p2-trace",
      chapter: "稽核手法：一條線追到底",
      html: `
<h2 class="h2" data-s="0" data-a="left">🔎 稽核手法：一條線追到底（Audit Trail）</h2>
<div class="trail">
  <div class="t" data-s="1" data-a="pop"><b>BIA</b>RTO / RPO</div><em data-s="1" data-a="grow">➜</em>
  <div class="t" data-s="1" data-a="pop"><b>備份排程</b>頻率是否對得上</div><em data-s="1" data-a="grow">➜</em>
  <div class="t" data-s="1" data-a="pop"><b>還原測試</b>實際花多久</div><em data-s="1" data-a="grow">➜</em>
  <div class="t" data-s="1" data-a="pop"><b>演練報告</b>是否達 RTO</div><em data-s="1" data-a="grow">➜</em>
  <div class="t" data-s="1" data-a="pop"><b>矯正措施</b>10.2 有結案</div>
</div>
<div class="methods" data-s="3" data-a="up">
  <span>📄 文件審查</span><span>🗣️ 訪談</span><span>👀 現場觀察</span><span>🎯 抽樣佐證</span>
</div>`,
      lines: [
        { s: "A", t: "我當稽核員時，最常用的招式叫做「一條線追到底」。" },
        { s: "A", t: "從 BIA 的 RTO、RPO 開始，追到備份排程、還原測試紀錄、演練報告，最後看演練發現的缺失有沒有矯正、有沒有結案。" },
        { s: "R", t: "哇～好像名偵探柯南，真相只有一個！", e: "jump" },
        { s: "A", t: "對！文件、訪談、現場觀察、抽樣，每個數字都要互相對得起來，才代表真的有落實。" },
      ],
    },
    {
      id: "p2-table",
      chapter: "查核清單：要看的證據 & 稽核提問",
      html: `
<table class="audit">
  <thead><tr><th>控制</th><th>要看的證據</th><th>稽核員常問</th></tr></thead>
  <tbody>
    <tr data-s="0" data-a="left"><td><span class="pill p529">5.29</span></td><td>BCP 資安章節、緊急帳號申請與收回紀錄</td><td>「災害時誰能開緊急帳號？事後怎麼收回？」</td></tr>
    <tr data-s="0" data-a="left"><td><span class="pill p530">5.30</span></td><td>BIA、RTO/RPO、ICT 演練計畫與報告</td><td>「上次演練實際花多久？有達到 RTO 嗎？」</td></tr>
    <tr data-s="1" data-a="left" class="hl"><td><span class="pill p813">8.13</span></td><td>備份政策、備份日誌、還原測試紀錄</td><td>「請抽一筆最近的還原測試給我看。」</td></tr>
    <tr data-s="0" data-a="left"><td><span class="pill p814">8.14</span></td><td>架構圖、HA 切換測試紀錄</td><td>「哪裡還有單點故障？上次切換是何時？」</td></tr>
    <tr data-s="3" data-a="left" class="hl"><td><span class="pill p86">8.6</span></td><td>監控儀表板、告警紀錄、容量規劃報告</td><td>「磁碟用到幾 % 告警？通知給誰？」</td></tr>
  </tbody>
</table>`,
      lines: [
        { s: "A", t: "這張表大家可以截圖起來。每個控制，我列出要看的證據，還有稽核員最常問的問題。" },
        { s: "A", t: "像 8.13，我一定會說：「請抽一筆最近的還原測試給我看」，而且我會挑重要系統，不讓你挑最簡單的那一台。", tts: "像八點一三，我一定會說：「請抽一筆最近的還原測試給我看」，而且我會挑重要系統，不讓你挑最簡單的那一台。" },
        { s: "R", t: "老師好壞喔～", e: "shock" },
        { s: "A", t: "這不是壞，這叫做抽樣的代表性！8.6 的話，我會請他直接打開監控畫面，問磁碟用到幾趴會告警、告警通知給誰。", tts: "這不是壞，這叫做抽樣的代表性！八點六的話，我會請他直接打開監控畫面，問磁碟用到幾趴會告警、告警通知給誰。" },
      ],
    },
    {
      id: "p2-tips",
      chapter: "稽核小撇步",
      html: `
<h2 class="h2" data-s="0" data-a="left">💡 Allan 老師的稽核小撇步</h2>
<div class="tips">
  <div class="tip" data-s="0" data-a="pop"><b>1</b><span>RPO 寫 4 小時，備份卻一天一次？<em>→ 數字對不上</em></span></div>
  <div class="tip" data-s="1" data-a="pop"><b>2</b><span>資產清冊 ⇄ 備份清單 交叉比對<em>→ 抓出漏備系統</em></span></div>
  <div class="tip" data-s="2" data-a="pop"><b>3</b><span>演練情境有沒有「勒索軟體」？<em>→ 最常見的中斷是駭客</em></span></div>
  <div class="tip" data-s="3" data-a="pop"><b>4</b><span>備份失敗告警 → 有沒有處理紀錄？<em>→ 告警沒人看等於沒告警</em></span></div>
</div>`,
      lines: [
        { s: "A", t: "再分享幾個小撇步。第一，RPO 寫四小時，備份卻一天才做一次，這就對不上。" },
        { s: "A", t: "第二，拿資產清冊去比對備份清單，常常會發現有系統根本沒有在備份。" },
        { s: "A", t: "第三，看演練情境有沒有包含勒索軟體。現在最常見的中斷，不是地震，而是駭客。" },
        { s: "A", t: "第四，備份失敗的告警信，有沒有人處理、有沒有紀錄。告警沒人看，就等於沒有告警。" },
        { s: "R", t: "筆記筆記～我全部都抄下來了！", e: "happy" },
      ],
    },

    /* ───────────── 第三部分 ───────────── */
    {
      id: "part3",
      chapter: "第三部分",
      layout: "chapter",
      html: `
<div class="chap c3" data-s="0" data-a="pop">
  <div class="chap-no">PART 3</div>
  <div class="chap-title">常見缺失</div>
  <div class="chap-sub">稽核現場最常開的不符合事項</div>
</div>`,
      lines: [
        { s: "R", t: "第三關：常見缺失！這是大家最愛的單元～", e: "jump" },
        { s: "A", t: "對，前車之鑑，後事之師。我把這幾年稽核最常開的缺失整理給大家。" },
      ],
    },
    {
      id: "p3-top",
      chapter: "常見缺失 TOP 7",
      html: `
<div class="ng-grid">
  <div class="ng" data-s="0" data-a="pop"><b>1</b>只有備份，從未做還原測試<span class="pill p813">8.13</span></div>
  <div class="ng" data-s="0" data-a="pop"><b>2</b>RTO / RPO 拍腦袋訂，沒有 BIA 依據<span class="pill p530">5.30</span></div>
  <div class="ng" data-s="1" data-a="pop"><b>3</b>備份與正式環境同網域，一起被勒索加密<span class="pill p813">8.13</span></div>
  <div class="ng" data-s="3" data-a="pop"><b>4</b>BCP 只有業務面，沒有資安面<span class="pill p529">5.29</span></div>
  <div class="ng" data-s="3" data-a="pop"><b>5</b>HA 建了卻從未切換測試、仍有單點故障<span class="pill p814">8.14</span></div>
  <div class="ng" data-s="3" data-a="pop"><b>6</b>沒有容量門檻，磁碟滿了才知道<span class="pill p86">8.6</span></div>
  <div class="ng" data-s="3" data-a="pop"><b>7</b>演練有做，缺失沒有追蹤改善<span class="pill pgr">10.2</span></div>
</div>`,
      lines: [
        { s: "A", t: "常見缺失第一名：只有備份，從來沒有還原測試。第二名：RTO、RPO 是拍腦袋訂出來的，找不到 BIA 依據。" },
        { s: "A", t: "第三名最恐怖：備份放在同一個網域，勒索病毒一來，正本跟備份一起被加密，真的欲哭無淚。" },
        { s: "R", t: "嗚嗚……好可怕喔！", e: "shock" },
        { s: "A", t: "另外，BCP 沒有資安面、HA 建好從沒切換過、磁碟滿了才發現，還有演練缺失沒有追蹤改善，也都非常常見。" },
      ],
    },
    {
      id: "p3-write",
      chapter: "不符合事項怎麼寫",
      html: `
<h2 class="h2" data-s="0" data-a="left">✍️ 不符合事項的寫法：三要素</h2>
<div class="three-el">
  <div class="el e1" data-s="0" data-a="pop"><b>依據</b>標準條文 / 內部規定</div>
  <div class="el e2" data-s="0" data-a="pop"><b>證據</b>看到的客觀事實</div>
  <div class="el e3" data-s="0" data-a="pop"><b>落差</b>哪裡不符合</div>
</div>
<div class="ncr" data-s="1" data-a="up">
  <div class="ncr-h">📝 範例</div>
  <p><mark class="m1">依據 ISO/IEC 27001:2022 附錄 A 8.13 及公司〈備份管理程序〉第 5 條「每半年執行還原測試」</mark>，
  <mark class="m2">抽查 ERP 系統 2025 年備份紀錄，未見任何還原測試紀錄</mark>，
  <mark class="m3">與程序要求不符</mark>。</p>
</div>`,
      lines: [
        { s: "A", t: "稽核員開缺失，要寫清楚三件事：依據什麼要求、看到什麼客觀證據、落差在哪裡。" },
        { s: "A", t: "像這樣：依據附錄 A 8.13 和公司備份程序，抽查 ERP 過去一年的備份紀錄，沒有還原測試紀錄，所以不符合。", tts: "像這樣：依據附錄 A 八點一三和公司備份程序，抽查 ERP 過去一年的備份紀錄，沒有還原測試紀錄，所以不符合。" },
        { s: "R", t: "有依據、有證據、有落差，三樣都齊全！", e: "happy" },
        { s: "A", t: "對！這樣寫，受稽單位才會心服口服，也知道要怎麼改。" },
      ],
    },

    /* ───────────── 管理實務案例 ───────────── */
    {
      id: "case1",
      chapter: "實務案例一：製造業勒索事件",
      html: `
<h2 class="h2" data-s="0" data-a="left">🏭 案例一：某製造業 週五晚上的勒索病毒</h2>
<div class="timeline">
  <div class="ev" data-s="0" data-a="left"><b>週五 22:00</b>檔案伺服器、ERP 被加密</div>
  <div class="ev bad" data-s="1" data-a="left"><b>週五 23:30</b>NAS 備份在同網域，管理員帳號被盜 → 一起被加密</div>
  <div class="ev bad" data-s="3" data-a="left"><b>週一</b>只剩兩週前的磁帶，產線停擺 3 天，補登資料 2 週</div>
</div>
<div class="fix" data-s="4" data-a="up">
  <div class="fix-h">✅ 改善措施</div>
  <span class="chip g">離線 / 不可變備份</span><span class="chip g">備份網段隔離 + 獨立帳號 MFA</span><span class="chip g">每季還原演練</span><span class="chip g">BCP 納入勒索情境</span>
</div>`,
      lines: [
        { s: "A", t: "來看實際的管理案例。某製造業，週五晚上被勒索病毒攻擊，檔案伺服器和 ERP 全部被加密。" },
        { s: "A", t: "IT 心想還好有備份，結果 NAS 備份放在同一個網域，管理員帳號又被盜，備份也一起被加密了。" },
        { s: "R", t: "啊！那、那怎麼辦？", e: "shock" },
        { s: "A", t: "最後只剩兩週前的磁帶，產線停了三天，業務補登資料補了整整兩個禮拜。" },
        { s: "A", t: "改善做法：導入離線或不可變備份，備份網段隔離、使用獨立帳號加上多因子驗證，每季做還原演練，BCP 也加入勒索情境。這次管理層終於願意給預算了。" },
      ],
    },
    {
      id: "case2",
      chapter: "實務案例二：電商週年慶當機",
      html: `
<h2 class="h2" data-s="0" data-a="left">🛒 案例二：某電商 週年慶當機 2 小時</h2>
<div class="case2">
  <div class="c2box" data-s="0" data-a="pop"><i>📣</i>行銷部沒通知 IT<br>流量暴增</div>
  <div class="c2arrow" data-s="0" data-a="grow">➜</div>
  <div class="c2box bad" data-s="0" data-a="pop"><i>💾</i>DB 日誌塞爆磁碟<br><span class="pill p86">8.6</span></div>
  <div class="c2arrow" data-s="1" data-a="grow">➜</div>
  <div class="c2box bad" data-s="1" data-a="pop"><i>🧱</i>資料庫只有一台<br><span class="pill p814">8.14</span></div>
</div>
<div class="fix" data-s="3" data-a="up">
  <div class="fix-h">✅ 改善措施</div>
  <span class="chip g">行銷行事曆納入容量規劃</span><span class="chip g">活動前壓力測試</span><span class="chip g">資料庫 HA</span><span class="chip g">80% 預警 / 90% 告警</span>
</div>`,
      lines: [
        { s: "A", t: "案例二，某電商週年慶，行銷部沒有先通知 IT，流量暴增，資料庫的日誌把磁碟塞爆，網站停了兩個小時。" },
        { s: "A", t: "偏偏資料庫只有一台，沒有多備。這就是 8.6 和 8.14 同時出問題。", tts: "偏偏資料庫只有一台，沒有多備。這就是八點六和八點一四同時出問題。" },
        { s: "R", t: "行銷部跟 IT 要多聊天啦！", e: "jump" },
        { s: "A", t: "沒錯！改善做法：把行銷活動行事曆納入容量規劃，活動前做壓力測試，資料庫建置 HA，並設定百分之八十預警、百分之九十告警。" },
      ],
    },

    /* ───────────── 小測驗 ───────────── */
    {
      id: "quiz",
      chapter: "阿拉蕾小測驗",
      html: `
<div class="quiz">
  <div class="q" data-s="0" data-a="pop">❓ RPO 定 <b>1 小時</b>，但備份<b>每天晚上</b>才做一次，稽核員會怎麼判？</div>
  <div class="opts">
    <div class="opt" data-s="1" data-a="up"><b>A</b>符合</div>
    <div class="opt" data-s="1" data-a="up"><b>B</b>觀察事項</div>
    <div class="opt ans" data-s="1" data-a="up"><b>C</b>不符合</div>
  </div>
  <div class="countdown" data-s="1" data-a="fade">3 · 2 · 1 !</div>
  <div class="explain" data-s="2" data-a="up">✔ 備份頻率達不到 RPO → 5.30 / 8.13 規劃未落實<br><small>（除非另有交易日誌複寫等機制，可補足 1 小時 RPO）</small></div>
</div>`,
      lines: [
        { s: "R", t: "換我考大家！RPO 定一小時，可是備份每天晚上才做一次，請問稽核員會怎麼判？", e: "jump" },
        { s: "R", t: "A 符合，B 觀察事項，C 不符合。倒數三秒：三、二、一！" },
        { s: "A", t: "答案是 C！備份頻率根本達不到 RPO，代表 5.30 和 8.13 的規劃沒有落實。除非另外有資料庫交易日誌複寫之類的機制，可以補足一小時的 RPO。", tts: "答案是 C！備份頻率根本達不到 RPO，代表五點三零和八點一三的規劃沒有落實。除非另外有資料庫交易日誌複寫之類的機制，可以補足一小時的 RPO。" },
        { s: "R", t: "答對的同學，給自己拍拍手！", e: "happy" },
      ],
    },

    /* ───────────── 總結 ───────────── */
    {
      id: "summary",
      chapter: "總結",
      html: `
<h2 class="h2" style="margin-bottom:12px" data-s="0" data-a="left">🎯 今日重點回顧</h2>
<ul class="sum">
  <li data-s="0" data-a="left"><span class="pill p529">5.29</span>中斷期間，資安不打折</li>
  <li data-s="0" data-a="left"><span class="pill p530">5.30</span>BIA 定 RTO / RPO，相依性與角色要清楚</li>
  <li data-s="1" data-a="left"><span class="pill p813">8.13</span>有備份更要還原測試，至少一份離線</li>
  <li data-s="1" data-a="left"><span class="pill p814">8.14</span>消除單點故障，多備也要演練切換</li>
  <li data-s="1" data-a="left"><span class="pill p86">8.6</span>監控、門檻、趨勢，提早擴充</li>
</ul>
<div class="motto" data-s="2" data-a="pop">沒有測試過的持續計畫，只是一份美麗的文件。</div>`,
      lines: [
        { s: "A", t: "最後總結：5.29 中斷期間資安不打折；5.30 用 BIA 訂出 RTO、RPO，弄清楚相依性和角色。", tts: "最後總結：五點二九，中斷期間資安不打折；五點三零，用 BIA 訂出 RTO、RPO，弄清楚相依性和角色。" },
        { s: "A", t: "8.13 有備份更要還原測試；8.14 消除單點故障並演練切換；8.6 監控門檻與趨勢，提早擴充。", tts: "八點一三，有備份更要還原測試；八點一四，消除單點故障並演練切換；八點六，監控門檻與趨勢，提早擴充。" },
        { s: "A", t: "記住一句話：沒有測試過的持續計畫，只是一份美麗的文件。" },
        { s: "R", t: "謝謝老師！我們下次見，拜拜～", e: "jump" },
        { s: "A", t: "謝謝大家，我是 Allan Lo，我們下次見！", e: "happy" },
      ],
    },
  ],
};

if (typeof module !== "undefined") module.exports = DECK;
else window.DECK = DECK;
