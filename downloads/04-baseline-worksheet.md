# 04 · Personal baseline worksheet: noise vs. real change

**Not medical advice.** A statistics worksheet for your own records. It doesn't tell you what's healthy, and it doesn't predict anything. Printable version: [`04-baseline-worksheet.html`](04-baseline-worksheet.html).

Daily readings like resting heart rate, HRV and sleep duration bounce around from day to day. The aim here is to learn **how big your normal bounce is** before you call anything a change.

## Step 1 · Fix the conditions
Same device, same time (e.g. on waking), same position. HRV is especially sensitive to conditions and length of the recording ([S5](SOURCES.md)). Write down your conditions:

`Signal: ________ Device/source: ________ When: ________ Position: ________`

## Step 2 · Collect a baseline (≥ 4 weeks, ordinary weeks)
| Signal | Days (n) | Mean | SD (day-to-day) | 7-day mean range seen |
|---|---|---|---|---|
| Resting HR | | | | |
| HRV (state SDNN or RMSSD) | | | | |
| Sleep hours | | | | |

Skip days marked `ill`, `travel`, `alcohol` in context, or analyse them separately.

## Step 3 · How much change is bigger than noise?
- **Typical error.** Day-to-day SD within a stable period is your noise ([S3](SOURCES.md) covers reliability and typical error in measurement).
- **Average before you compare.** Weekly averages are steadier than single days. People monitoring HRV in sport use rolling 7-day averages for this reason ([S6](SOURCES.md)).
- **Rule of thumb you can write down:** a weekly mean that sits outside *baseline mean ± 2 × (daily SD ÷ √7)* for 2+ weeks is worth a note. That's a statement about your data, not about your health.

`My threshold for weekly ________: ______ ± ______`

## Step 4 · Two devices? Bland-Altman in plain words
For each overlap day write B − A. **Bias** = mean of those differences. **Limits of agreement** = bias ± 1.96 × SD of the differences ([S2](SOURCES.md)). If the limits are wide, the devices can't be swapped, no matter how well they correlate.

## Step 5 · Slow drifts: CUSUM in plain words
A CUSUM adds up small deviations from your baseline so a slow, steady shift becomes visible ([S4](SOURCES.md)).
1. Pick k = 0.5 × SD (ignore wiggles smaller than this).
2. Each day: `S⁺ = max(0, S⁺ + (x − mean − k))`, `S⁻ = max(0, S⁻ + (mean − x − k))`.
3. If S⁺ or S⁻ goes above h = 4–5 × SD, note "sustained shift from date ___". Reset both to 0 and set a new baseline.

| Day | x | x − mean | S⁺ | S⁻ |
|---|---|---|---|---|
| | | | | |

## Step 6 · Before calling it a change, check
- [ ] Same source the whole time? (else see [02](02-device-switch-checklist.md))
- [ ] Same measurement conditions?
- [ ] Bigger than my threshold for 2+ weeks?
- [ ] Any context (season, travel, illness, schedule) that explains it?

If something worries you about your health, talk to a clinician. This worksheet can't help with that.
