const L=require('./ledger.js'),assert=require('assert');
const pts=L.demo().map(e=>({t:new Date(e.date).getTime(),v:e.value,src:e.source}));
const s=L.segments(pts);assert.strictEqual(s.length,2);assert.strictEqual(s[1].flag,'drift-candidate');
const sl=L.slope(pts.filter(p=>p.src==='device_a'));assert(sl>0.1&&sl<0.5,'slope '+sl);
console.log('ok: 2 segments, step',s[1].step.toFixed(2),'flagged; within-source slope/yr',sl.toFixed(2));
const rep=L.report(L.demo());assert(rep.includes('drift-candidate')&&rep.includes('## energy'));console.log('ok: report export');
