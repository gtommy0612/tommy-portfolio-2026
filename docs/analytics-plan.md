# 量測計畫：GA4 + Microsoft Clarity

目的：知道招募方與接案客戶「從哪來、看了什麼、在哪裡離開、有沒有行動」，作為改版迭代依據。

- **GA4**：量化、漏斗、流量來源、轉換（看趨勢）
- **Microsoft Clarity**：熱點圖、滾動圖、Session 錄影（看原因）

作品集流量小（每週幾十人），**以 Clarity 質化觀察為主、GA4 看方向**，不做 A/B test。

---

## 1. 安裝狀態

所有追蹤邏輯都在 [`assets/js/analytics.js`](../assets/js/analytics.js)，每頁 `<head>` 用一行 `<script ... defer>` 載入。

上線前要做的事：

1. 到 analytics.google.com 建 GA4 property → Web data stream，複製 `G-` 開頭的 Measurement ID
2. 到 clarity.microsoft.com 建 project，複製 Project ID（Settings → Overview）
3. 填入 `analytics.js` 頂部的 `GA_ID`、`CLARITY_ID`。**沒填的話什麼都不會載入。**

開關（加在任何網址後面）：

| 參數 | 作用 |
|---|---|
| `?notrack` | 這個瀏覽器永久不追蹤，**在自己的電腦、手機各開一次** |
| `?track` | 取消 `?notrack` |
| `?forcetrack` | 本機（localhost）也追蹤，開 GA4 debug mode，並在 console 印出每個事件 |

localhost / 127.0.0.1 預設不追蹤。

新增頁面時：在 `<head>` 加 `analytics.js` 那一行即可，連結會自動分類。

---

## 2. 事件規格

連結的點擊依 `href` 自動分類，`location` 依連結所在位置自動判斷：`nav`、`mobile_nav`、`footer`，或所在 `<section>` 的名稱（`data-section` → `id` → `aria-labelledby` 去掉 `-h`）。需要覆寫時在元素上加 `data-location="..."`。

| 事件 | 觸發 | 參數 | Key event |
|---|---|---|---|
| `resume_download` | 點 `Resume_TommyChi.pdf` | `location` | ✅ |
| `contact_click` | mailto / cal.com / LinkedIn / Behance | `method`: email / cal / linkedin / behance；`location` | ✅ |
| `case_study_click` | 點往 case study 的連結 | `case_study`（slug）、`location`（例 works、work、next_project） | |
| `section_view` | 區塊有一半進入畫面（每頁每區一次） | `section`（例 hero、strengths、works、about、contact、services、process、faq） | |
| `case_study_progress` | case study 頁捲到 25 / 50 / 75 / 100% | `case_study`、`percent` | |
| `case_study_read` | case study 頁實際可見停留 ≥ 60 秒 | `case_study`、`seconds` | ✅ |
| `language_switch` | services 頁 EN ↔ 中文 | `to_lang`、`location` | |

每個事件都帶頁面層級參數：`page_type`（home / case_study / services / about）、`audience`（portfolio / services）、`content_lang`（en / zh），case study 頁另帶 `case_study`。

Clarity 也收到 `page_type`、`audience`、`content_lang`、`case_study` 這些 tag，以及 `resume_download`、`contact_click`、`case_study_click`、`case_study_read`、`language_switch` 這些事件，可用來篩選錄影。

---

## 3. 後台設定清單

### GA4

- [ ] Admin → Data streams → Enhanced measurement：開著，但**關掉 Scrolls**（自訂的 `case_study_progress` 比較準）
- [ ] Admin → Custom definitions → 新增 event-scoped custom dimensions：`location`、`method`、`case_study`、`section`、`percent`、`page_type`、`audience`、`content_lang`、`to_lang`
- [ ] Admin → Events → 把 `resume_download`、`contact_click`、`case_study_read` 標成 Key event
- [ ] Admin → Data retention → 改成 14 個月
- [ ] Admin → Data filters → Internal traffic（可選，主要靠 `?notrack`）
- [ ] 用 `?forcetrack` 開網站，在 Admin → DebugView 確認事件有進來

### Clarity

- [ ] Settings → Masking：Balanced
- [ ] Settings → Google Analytics integration：連到上面的 GA4 property
- [ ] 建好 Segments：`page_type = case_study`、`audience = services`、`Device = Mobile`

---

## 4. UTM 命名規則

讓 GA4 分得出「哪個管道帶來的人有讀 case study」。全部小寫、用底線。

| 管道 | 網址範例 |
|---|---|
| 投遞履歷（每家公司一條） | `?utm_source=<company>&utm_medium=job_application&utm_campaign=2026_job_search` |
| LinkedIn 個人頁 | `?utm_source=linkedin&utm_medium=profile` |
| LinkedIn 貼文 | `?utm_source=linkedin&utm_medium=social&utm_content=<post_topic>` |
| Behance 個人頁 | `?utm_source=behance&utm_medium=profile` |
| 履歷 PDF 內的網址 | `?utm_source=resume_pdf&utm_medium=referral` |
| 接案提案 / 報價單 | `/services/?utm_source=<client>&utm_medium=proposal` |

在 GA4 → Reports → Acquisition → Traffic acquisition，把維度切到 Session source / medium 即可看。

---

## 5. 核心漏斗

### Portfolio（招募方）

GA4 → Explore → Funnel exploration，步驟：

1. `page_view`（page_type = home）
2. `section_view`（section = works）
3. `case_study_click`
4. `case_study_progress`（percent = 75）
5. `resume_download` 或 `contact_click`

### Services（接案客戶）

1. `page_view`（audience = services）
2. `section_view`（section = work 或 process）
3. `contact_click`（method = cal 或 email）

---

## 6. 看到什麼 → 改什麼

| 問題 | 看哪個數據 | 可能的改動 |
|---|---|---|
| 首頁的人有沒有往下看到作品？ | `section_view: works` ÷ 首頁 page_view；Clarity 滾動圖 | 低於 60% → hero 太長或沒引導，縮短 hero、強化「View case studies」 |
| 看到作品但沒點？ | `case_study_click` ÷ `section_view: works`；Clarity 熱點 | 熱點落在封面圖卻沒點 → 封面要能點、或標題改成成果導向 |
| Case study 讀到哪就走？ | `case_study_progress` 25→50→75 的掉落；Clarity 滾動圖 | 50% 前大量流失 → 把成果數字移到最前面、縮短背景段 |
| 有沒有真的讀？ | `case_study_read` ÷ case study page_view | 很低但 progress 高 → 只是快速滑過，加小標、多用截圖說明 |
| 哪個履歷按鈕有用？ | `resume_download` 依 `location` 分 | 長期 0 次的位置可以拿掉，有用的位置加強 |
| 哪種聯絡方式有用？ | `contact_click` 依 `method` 分 | email 遠高於其他 → footer 以 email 為主 |
| 有東西看起來能點但不能點？ | Clarity Dead clicks / Rage clicks | 圖片被點 → 加放大；文字被點 → 改成連結或改樣式 |
| 手機體驗有問題？ | 漏斗依 Device category 分；Clarity Mobile segment | 手機轉換明顯偏低 → 檢查 CTA 位置、圖片字太小 |
| 哪個投遞管道最有效？ | UTM source × `case_study_read` | 把時間花在帶來「有讀」訪客的管道 |
| 中文版服務頁有人看嗎？ | `content_lang`、`language_switch` | 很少人切 → 中文版可簡化維護 |

---

## 7. 檢視節奏

- **投遞期，每週一次（30 分鐘）**：Clarity 看 10–20 段錄影（先篩 case study 頁、有 Rage click 的），GA4 看漏斗和流量來源
- **每月一次**：整理成 1–3 個改動，記在下方紀錄表，改完下個月比對
- 改動當天在 GA4 加 Annotation（Reports 圖表上），方便前後比較

### 迭代紀錄

| 日期 | 觀察 | 改動 | 結果（一個月後） |
|---|---|---|---|
| | | | |

---

## 8. 隱私

目前不放 cookie banner：個人網站、Clarity 以 Balanced 遮罩輸入內容、GA4 不收 IP。若之後鎖定歐盟職缺或流量明顯來自歐盟，再加 Google Consent Mode v2 與 Clarity consent API。
