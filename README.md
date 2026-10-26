# longevity-layer · Long-Horizon Pattern Ledger

A small local-first, rule-based tool for looking at self-reported daily signals over years. It separates two views:

- **Slow trend**: gradual movement inside one measurement source (rolling mean + per-source yearly slope).
- **Measurement drift**: a step that lines up exactly with a change of device, app or logging method (flagged when the step exceeds 2 SD of the previous segment).

No cloud, no accounts, no network calls. Data stays in your browser (localStorage); export/import as JSON.

**Not medical advice.** No diagnosis, no predictions, no health or lifespan claims.

## Quickstart

```bash
git clone https://github.com/silence-agents-org/longevity-layer && cd longevity-layer
node serve.js        # open http://127.0.0.1:4173
```

Or open `index.html` directly in a browser. Click **Load demo data** to see a 1,000-day series with a device switch at day 600.

```bash
node test.js         # deterministic rule checks
```

## Rules (deterministic)
1. Entries are grouped into consecutive segments by `source`.
2. Step = mean(segment) − mean(previous segment). Flag `drift-candidate` if |step| > 2 × SD(previous).
3. Slow trend = least-squares slope per year, computed within each source only.
4. Rolling window (default 90 days) is display only.

## Upgrade path
Free today: JSON export and a Markdown report. A Pro tier (yearly PDF report) is planned; no checkout yet. See [UPGRADE.md](UPGRADE.md).

## Research
Open questions with public sources: [research/](research/README.md).

## License
Apache-2.0
