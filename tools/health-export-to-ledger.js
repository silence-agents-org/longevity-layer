#!/usr/bin/env node
// Convert an Apple Health export.xml into longevity-layer ledger JSON. Runs locally, no network.
// Usage: node tools/health-export-to-ledger.js path/to/export.xml > ledger.json
// Output: one entry per day per signal per source: {date, signal, value, source}
// Quantity signals = daily mean. sleep_hours = sum of "asleep" intervals, assigned to the wake-up date.
// Not medical advice.
const fs = require('fs'), readline = require('readline');
const file = process.argv[2];
if (!file) { console.error('usage: node tools/health-export-to-ledger.js export.xml > ledger.json'); process.exit(1); }
const MAP = {
  HKQuantityTypeIdentifierRestingHeartRate: 'resting_hr',
  HKQuantityTypeIdentifierHeartRateVariabilitySDNN: 'hrv_sdnn',
  HKQuantityTypeIdentifierStepCount: null, // summed, see SUM
  HKQuantityTypeIdentifierBodyMass: 'body_mass',
  HKQuantityTypeIdentifierRespiratoryRate: 'respiratory_rate',
  HKQuantityTypeIdentifierVO2Max: 'vo2max_estimate'
};
const SUM = { HKQuantityTypeIdentifierStepCount: 'steps' };
const attr = (s, k) => { const m = s.match(new RegExp(' ' + k + '="([^"]*)"')); return m ? m[1] : null; };
const acc = new Map(); // key -> {sum,n,mode}
const add = (date, signal, source, v, mode) => {
  const k = date + '\u0000' + signal + '\u0000' + source; const a = acc.get(k) || { sum: 0, n: 0, mode };
  a.sum += v; a.n++; acc.set(k, a);
};
const rl = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
rl.on('line', line => {
  if (line.indexOf('<Record ') < 0) return;
  const type = attr(line, 'type'); const src = (attr(line, 'sourceName') || 'unknown').replace(/&amp;/g, '&');
  const start = attr(line, 'startDate'), end = attr(line, 'endDate');
  if (type === 'HKCategoryTypeIdentifierSleepAnalysis') {
    const val = attr(line, 'value') || '';
    if (!/Asleep/.test(val)) return; // skip InBed / Awake
    const h = (Date.parse(end.replace(' ', 'T').replace(' ', '')) - Date.parse(start.replace(' ', 'T').replace(' ', ''))) / 36e5;
    if (h > 0 && h < 24) add(end.slice(0, 10), 'sleep_hours', src, h, 'sum');
    return;
  }
  const v = parseFloat(attr(line, 'value')); if (isNaN(v)) return;
  if (SUM[type]) return add(start.slice(0, 10), SUM[type], src, v, 'sum');
  if (MAP[type]) add(start.slice(0, 10), MAP[type], src, v, 'mean');
});
rl.on('close', () => {
  const out = [];
  for (const [k, a] of acc) { const [date, signal, source] = k.split('\u0000');
    out.push({ date, signal, value: +(a.mode === 'sum' ? a.sum : a.sum / a.n).toFixed(2), source }); }
  out.sort((x, y) => x.date < y.date ? -1 : x.date > y.date ? 1 : 0);
  process.stdout.write(JSON.stringify(out, null, 1) + '\n');
  console.error(out.length + ' daily entries written. Overlapping sources (phone + watch) are kept separate on purpose.');
});
