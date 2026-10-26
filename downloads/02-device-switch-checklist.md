# 02 · Device-switch checklist: keep multi-year trends comparable

**Not medical advice.** A data-hygiene checklist. It says nothing about what your numbers mean for your health.

A new watch, ring, app or firmware can shift readings by more than years of slow change. Different devices measure the same thing differently, and a correlation between them doesn't show they agree. Bland & Altman ([S2](SOURCES.md)) is the standard reference on this. Consumer sleep wearables vary in how they perform and need to be evaluated per device and per version ([S7](SOURCES.md)).

## Before the switch (old device)
- [ ] Export all data now (Apple Health: see [03](03-apple-health-export-guide.md)). Store the file with the date in its name.
- [ ] Write down: model, firmware/app version, wrist/finger, which hand, strap fit.
- [ ] Note *how* each signal is defined by that device (e.g. Apple Health stores HRV as **SDNN**; many other apps show **RMSSD**. They are different metrics, see [S5](SOURCES.md)). Never merge them into one series.
- [ ] Note the measurement window (overnight average vs. one morning reading).

## Overlap period (both devices) – aim for 14+ days
- [ ] Wear both at the same time, same conditions.
- [ ] Log both with **different `source` names** (`watch_a`, `watch_b`).
- [ ] After the overlap compute, per signal: mean difference (B − A) and the SD of the differences. That's a plain Bland-Altman check: **bias** = mean difference; **limits of agreement** ≈ bias ± 1.96 × SD ([S2](SOURCES.md)).
- [ ] Write the result in the ledger note: "watch_b reads +3 bpm vs watch_a, LoA −2…+8, n=16 days".

## After the switch
- [ ] Keep the new `source` name forever. Don't relabel old data.
- [ ] Compare trends **within** a source. Compare across sources only with the bias written next to the chart.
- [ ] In the ledger, a step exactly at the switch date is flagged as a *drift candidate*. Check it against your bias before you read it as a change.
- [ ] Repeat the overlap after major firmware updates if a step appears.

## No overlap possible?
Mark the switch date, treat the series as two series, and wait for a new baseline (see [04](04-baseline-worksheet.md)) before comparing levels.
