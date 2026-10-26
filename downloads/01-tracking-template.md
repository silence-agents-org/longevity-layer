# 01 · Long-horizon self-tracking template

**Not medical advice.** This is a record-keeping template. It does not diagnose, predict or recommend anything.

Files: [`01-tracking-template.csv`](01-tracking-template.csv) for a spreadsheet, [`01-tracking-template.html`](01-tracking-template.html) to print (open it, then File → Print → Save as PDF).

## Why these columns
Multi-year records usually break at the **source**, not at the value. So every row says where the number came from.

| Column | Rule |
|---|---|
| `date` | ISO `YYYY-MM-DD`. One row per signal per day. |
| `signal` | Stable lowercase name. Never rename mid-series. |
| `value` | Number only. |
| `unit` | Write it every time. Unit changes are silent breaks. |
| `source` | Device, app or "manual". **A new watch = a new source name**, even if it's the same brand. |
| `context` | Conditions that affect the reading: `morning`, `post-travel`, `ill`, `late-meal`. |
| `note` | Free text. |

## Using it with the ledger
`date, signal, value, source` map directly to the ledger fields. Convert with `node tools/csv-to-ledger.js your.csv > ledger.json`, then **Import** in the app. Everything stays local.
