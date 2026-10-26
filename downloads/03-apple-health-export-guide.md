# 03 · Apple Health export → local ledger

**Not medical advice.** How to move your own data into a local file. Nothing is uploaded.

## 1 · Export (iPhone)
Per Apple's iPhone User Guide ([S1](SOURCES.md)): open **Health** → tap your profile picture or initials → **Export All Health Data** → choose how to share/save it (for example, Save to Files). You get `export.zip`. Large histories can take minutes.

Unzip it on your computer. The file you need is `apple_health_export/export.xml`.

> Privacy: this file is your full health history. Keep it on your own disk. Don't email it or paste it into online tools.

## 2 · Convert locally
```bash
git clone https://github.com/silence-agents-org/longevity-layer && cd longevity-layer
node tools/health-export-to-ledger.js ~/Downloads/apple_health_export/export.xml > ledger.json
```
The script reads the XML line by line (works for multi-GB files) and makes **one value per day per signal per source**:

| Health type | Ledger signal | Daily rule |
|---|---|---|
| RestingHeartRate | `resting_hr` | mean |
| HeartRateVariabilitySDNN | `hrv_sdnn` | mean (SDNN, not RMSSD) |
| StepCount | `steps` | sum |
| SleepAnalysis (asleep stages only) | `sleep_hours` | sum, on the wake-up date |
| BodyMass, RespiratoryRate, VO2Max | `body_mass`, `respiratory_rate`, `vo2max_estimate` | mean |

`sourceName` (e.g. your phone vs your watch) is kept as `source`. That's on purpose: phone and watch step counts overlap, and a new watch shows up as a new source. That's what lets the ledger flag device switches ([02](02-device-switch-checklist.md)).

## 3 · Open in the ledger
```bash
node serve.js   # http://127.0.0.1:4173
```
Click **Import**, pick `ledger.json`, choose a signal in the view menu. Data is kept in your browser's localStorage only.

## Manual data
Fill [`01-tracking-template.csv`](01-tracking-template.csv), then `node tools/csv-to-ledger.js my.csv > manual.json` and import it too.
