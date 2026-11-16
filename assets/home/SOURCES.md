# Homepage image sources

Every image here is a crop of an existing case-study image. Nothing is generated or stock.

| File | Cropped from | Crop (x, y, w, h in source px) |
|---|---|---|
| bid-application-card.png | ../us-state-gov-ai-bid-prototype/cover.png | 272, 446, 393, 471 (scaled to 584 × 700) |
| records-button-states.png | ../us-state-gov-public-records-redesign/rwd-wcag-design-system.png | 160, 1081, 1021, 661 (scaled to 900 wide) |
| records-contrast-check.png | ../us-state-gov-public-records-redesign/rwd-wcag-design-system.png | 160, 175, 1021, 661 (scaled to 900 wide) |

The hero chips and the Selected work tiles use the case-study images directly.

## Case-study images

| File | Source | De-identified |
|---|---|---|
| ../us-state-gov-public-records-redesign/mobile-before-after.webp | Tommy's before/after composite (old site at 320px in DevTools; new phone layout), 2000 × 1125 | Tommy de-identified it before export: old site in greyscale, with the seal, state and agency names, notice text, body copy and footer links blurred or masked |
| ../us-state-gov-ai-bid-prototype/design-tokens.svg | Drawn from the demo page's own token block (us-state-gov-ai-bid-prototype-demo.html), whose colours were sampled from the recorded prototype clips. Not the bid's original token file, which is not available. The right panel's field and button are redrawn at 1.5× from those values | No brand or client names; form text is placeholder ("First name", "Jane", "Submit") |
| ../us-state-gov-ai-bid-prototype/design-flow.svg | Redrawn from Tommy's Applicant workflow diagram for the bid, simplified to four steps at Tommy's direction (new application; personal details and, if any, a course record; agree and sign; submit to the sheriff) | No state, agency, system or company names and no logos |
| ../us-state-gov-ai-bid-prototype/hero.png | Bid cover composite, 2880 x 1620 transparent: Sheriff payment/card issuance screen behind, Applicant application page in front, in plain browser frames. Built from Tommy's prototype screen exports; used by the case-study hero and the homepage Selected work tile | Demo data only (John Doe, Sheriff Tom, #ID Number placeholders) |

## Demo page

| File | Source | De-identified |
|---|---|---|
| ../../us-state-gov-ai-bid-prototype-demo.html | Applicant flow only, rebuilt for the portfolio from the Applicant walkthrough clip and the Step 1 flow (layout, labels, colours sampled from the clip frames). Not the original prototype code. Happy path only. Embedded in Step 3 with ?embed, which hides the demo's own top bar | "State Agency Portal" as in the clips; sample applicant "Jane Doe"; generic course names; nothing stored or sent |
