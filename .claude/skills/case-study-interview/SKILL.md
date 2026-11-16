---
name: case-study-interview
description: 用分輪問答「拷問」Tommy，把一個專案挖成有決策、有取捨、可被證實的 case study，再寫進 E3 case study 頁。使用者說「寫／改 case study」「case study 不知道怎麼呈現」「幫我釐清專案細節」「用問答方式整理作品」，或輸入 /case-study-interview 時使用。參數：case study 的 HTML 檔名或專案名稱。
---

# Case study interview

把專案從「我做了什麼」挖到「我怎麼判斷、放棄了什麼、怎麼知道有效」。內容只來自使用者的回答。訪談過程用繁體中文，頁面文案用英文。

範例成品：`us-state-gov-public-records-redesign.html`。

## 鐵則

1. **只寫使用者確認過的事。** 不確定的就問，不要補。使用者答「不清楚」時，頁面就不能寫成「有做」。
2. **舊稿、AI 草稿、履歷裡的說法都要重新驗證。** 例如「Evaluators trust what they can click through」、「workflow became team SOP」、「rules went through a verification step」，這些在範例專案裡都被證實沒有根據。凡是問不出來源的句子，就刪掉或改寫。
3. **不寫因果，只寫對照。** 要寫「這次做法不同」，不要寫「因為 HTML 所以得標」。
4. **對照組優先用自己的過去。** 推測對手怎麼做不能寫。「我們上次用 X，花 N 天，沒拿到」可以寫。
5. **NDA。** 先問能不能公開客戶名稱。接著檢查**圖片裡**會洩漏身分的字（機關名、費用名稱、課程名稱、頁尾），只回報、不擅自改圖。
6. 依 `CLAUDE.md` 與 `DESIGN.md`：只用 E3 token 和元件，圖片只能是真實作品，新的裁圖要記錄在 `assets/home/SOURCES.md`。

## 流程

### 0. 先讀，再診斷
- 讀：目標 case study 頁、`assets/Resume_TommyChi.md`、`DESIGN.md`、這個 case study 的 `assets/<slug>/` 圖片（逐張看，記下每張圖實際在證明什麼）。
- 用 3–5 點指出現況問題，常見的有：
  - 同一組數字出現好幾次
  - 「Action」寫成工作清單，沒有寫出取捨
  - Reflection 是套模板，換到哪個專案都能用
  - 有沒有根據的說法
  - Solution 的項目對應不到 Challenge 或 Research 的問題
  - 限制被寫成 Challenge
- 回答使用者對結構的疑問。見下方〈常見疑問〉。

### 1. 分輪問答（通常 3 輪）
題庫在 [questions.md](questions.md)。每輪規則：
- **編號、分組、最多約 12 題**，每題都要對應骨架中的某一段。
- 開頭說明：「條列回答即可，不確定就寫『不確定』，不要猜。」
- 第一輪問背景、stakes、過程概要、結果。第二輪依答案往細節挖。第三輪補缺口。
- **每輪回答後，先整理再追問**：
  1. 「目前浮現的故事」：主軸、最有力的素材
  2. 「⚠️ 要修正的說法」：跟回答不一致的舊說法
  3. 「真正的決策」：從回答裡找出使用者沒意識到的選擇
  4. 下一輪題目
- 特別追這幾類素材，它們最能讓 case study 精彩：
  - **對照組**：上次怎麼做、結果如何
  - **做錯的地方**：上線或開發後才發現的誤判
  - **刻意沒做的東西**：範圍取捨，以及跟誰對齊
  - **人和 AI 怎麼分工**：誰做什麼、你介入修正了哪類問題
  - **數字怎麼量的**：跟什麼比
- 使用者說「沒什麼決策，只是畫 UI」時，有兩條路：
  - 把隱形的選擇挖出來：先做什麼、交什麼格式、做多深、什麼不做、跟誰確認
  - 或者承認主角是流程，例如 AI 工作流程，不硬包裝

### 2. 對應到骨架，寫進頁面
用下方骨架。寫完後 grep 一下，確認沒有殘留 `SOP`、`TODO`（刻意留的 TODO 除外）、raw hex，以及使用者否認過的說法。

缺少的素材（流程圖、錄影、前後對照圖）**不要用現有的圖硬湊**。在該處留 `<!-- TODO (Tommy): ... -->`，結束時列給使用者。

### 3. 檢查與回報
- 依 `CLAUDE.md`，在 1440、768、375 寬度確認沒有橫向捲動、圖片都有載入。
- 結束時回報：
  - 改了什麼
  - 刪掉哪些沒根據的說法
  - **其他地方仍有同樣錯誤說法的位置**：履歷、首頁、舊版頁。履歷是使用者自己的文件，只回報，不改。
  - NDA 風險
  - 使用者還要提供的素材

## 骨架

範例成品：`us-state-gov-public-records-redesign.html`（2026-11-06 定稿的結構）。

先給結論，再講過程：前三段讓只看 30 秒的人拿到重點，後四段給想看思考過程的人。段落標題用**短的單字**，編號沿用 `two-tone` 的 `<span>NN</span>`。

| # | 區塊 | 回答的問題 | 規則 |
|---|---|---|---|
| — | Hero (`.cs-hero`) + cover | 這是什麼？ | 標題格式：`<動詞> a <系統>: <Challenge A> and <B 的具體成果>`，例如 `Modernizing a State Records Portal: WCAG 2.2 AA and a 6-to-3-Page Checkout`。一眼看出兩個重點，用數字當 hook。避免有歧義的字，例如 `Beyond WCAG` 會被讀成「做到 AAA」 |
| 01 | Overview | 專案簡介 | 一句 lead：概括帶出 Challenge，**不列具體痛點**，痛點留給 Research。`.stat` ×3，各代表一種能力，例如 UX 成果、合規、交付效率。`cs-facts`：My role、Timeline（含現況）、Team（只列人數） |
| 02 | Challenge | 面臨什麼挑戰？ | 第一句寫核心判斷，也就是 The approach，例如「客戶只要求合規，我主動提出改善 UX」。接著 2–3 張 `.card`，每張是一個**需求**，並註明哪個是 brief、哪個是自己主動提出的。**限制和功能需求不是 Challenge**，例如既有技術架構、MFA；它們放進 Design 的 Trade-off |
| 03 | Solution | 結論先給 | 每一項都要對應到某個 Challenge。最有力的證據放滿版當主角（錄影優先），其餘排成同樣大小的一列（`grid md:grid-cols-3`）。圖說：一句粗體結論加一句短說明 |
| 04 | Research | 怎麼發現問題？ | **依 Challenge 分段寫方法**，例如：UX 用 staging 實際走查加截圖標註；WCAG 用工具掃描、人工對照標準、手機實測。最後用編號 `.card` 列出「定義出的問題」，數量和順序跟 Solution 一致 |
| 05 | Design | 怎麼解決？為什麼這樣做？ | 每個問題對應一個 `Key decision N: <一句話決策>`（`.cs-sub`）加 `.decide`。順序跟 Research 一致 |
| 06 | Validation | 怎麼確認有效？ | 用 `.card` 寫實際做過的驗證。**沒做的也要誠實寫**，例如「No usability test」。如果因此漏掉了問題，用 `.cs-sub` 寫出那個缺口漏掉了什麼 |
| 07 | Outcome | 成果與反思 | 一句上線現況。接著用 `.decide` 樣式**逐項**列成果：Solution 的每一項，再加合規和交付各一列。有數字的給數字，沒有的寫實際改變。然後 `.cs-sub` Reflection |

### 串連規則（最重要）

- **Challenge → Research → Solution → Design → Outcome 要能一條一條對上**：每個 Solution 項目都要有 Research 問題、Key decision 和 Outcome 列。發現 Solution 裡有某項沒對應到問題時（例如 Dashboard），要回頭問使用者：「舊版的 X 哪裡有問題？」，不要自己補。
- 各段落順序一致即可，**頁面上不放「Challenge A／B」這類標籤**。
- Overview 和 Outcome 的分工：Overview 是承諾，只放三個代表數字；Outcome 是證據，每一項都要交代。數字可以在兩邊都出現。
- Research 前**不加分隔線**，段落間距維持 `.cs-section` 預設。

### `.decide` 寫法

Design 段落：

```html
<h3 class="cs-sub">Key decision 1: …一句話決策…</h3>
<dl class="decide">
  <div><dt>Problem 1</dt><dd>…（對應 Research 的第 1 張卡）</dd></div>
  <div><dt>What I changed</dt><dd><strong>…</strong></dd></div>
  <div><dt>Why this way</dt><dd>…</dd></div>
  <div><dt>Trade-off</dt><dd>…（放棄了什麼、跟誰對齊，或哪個限制造成的）</dd></div>
</dl>
```

- 有真實的替代方案時，可以加一列 `Instead of`。
- 使用者還沒回答的列**不要放空列**，改留 `<!-- TODO (Tommy): … -->`。

Outcome 段落：`dt` 寫項目名稱（Search and pay、Sign-up、Accessibility、Delivery…），`dd` 用粗體開頭寫結果。

## 圖片原則

圖要**能證明某件事**才放，不是每段都要有圖。

| 需要證明的事 | 適合的素材 |
|---|---|
| 能操作、流程會串接 | 10–20 秒錄影，靜音、自動循環 |
| 角色或系統之間的關係 | 關係圖或流程圖（去識別化） |
| 一致性、design system | 色票或元件狀態的靜態圖 |
| 交接給工程 | 標註規格的畫面 |
| 改善了什麼 | 前後對照 |

Challenge、Validation、Outcome 通常純文字就好，卡片和 `.decide` 已經足以打破單調。Research 最好有一張去識別化的標註截圖，用來證明研究方法。

## 常見疑問（直接用來回答使用者）

- **Overview 和 Outcome 會重複嗎？** Overview 只放三個代表數字給快速瀏覽的人。Outcome 逐項交代每個 Solution 項目的結果、怎麼量的、上線後的狀況。Outcome 寫不出比 Overview 更多的東西，代表 Research 或 Solution 漏了項目。
- **限制要放哪？** 不放 Challenge。限制（既有技術架構、舊帳號沒綁裝置）要放在它真正影響的決策的 Trade-off 裡。
- **Problem 和 Challenge 的差別？** Challenge 是專案層級的需求（合規、改善 UX）。Problem 是 Research 實際找到的具體問題（付款要六頁），每個 Problem 都屬於某個 Challenge。
- **沒有 research，insight 從哪來？** 可以來自 RFP 或文件本身、過去的經驗（上次輸或贏的原因）、限制逼出來的判斷。但一定要是使用者真的這樣想。
- **The approach 寫在哪？** 寫成 Challenge 的第一句粗體，不另開段落。它是使用者自己的核心判斷，例如「客戶只要求 X，我主動提出 Y」。
- **專案重點不清楚怎麼辦？** 列出手上的證據，評估每項的強度（有沒有數字、是不是你的判斷），再問使用者：「這項是客戶要求的，還是你主動提出的？」主動提出的通常就是主軸。
- **Reflection 可以寫 usability test 嗎？** 只有在它對應到這個專案真實的缺口時才寫，例如 Validation 寫了沒做測試、因此漏掉了某個問題。不要寫成通用的 next steps。
