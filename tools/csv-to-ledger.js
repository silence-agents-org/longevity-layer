#!/usr/bin/env node
// Convert downloads/01-tracking-template.csv format into ledger JSON. Local only. Not medical advice.
// Usage: node tools/csv-to-ledger.js my-tracking.csv > ledger.json
const fs = require('fs'); const f = process.argv[2];
if (!f) { console.error('usage: node tools/csv-to-ledger.js file.csv > ledger.json'); process.exit(1); }
const [head, ...rows] = fs.readFileSync(f, 'utf8').trim().split(/\r?\n/); const h = head.split(',').map(s => s.trim());
const i = n => h.indexOf(n);
const out = rows.map(r => r.split(',')).filter(c => c[i('date')] && !isNaN(parseFloat(c[i('value')])))
  .map(c => ({ date: c[i('date')].trim(), signal: c[i('signal')].trim(), value: parseFloat(c[i('value')]), source: (c[i('source')] || 'manual').trim() }));
process.stdout.write(JSON.stringify(out, null, 1) + '\n');
