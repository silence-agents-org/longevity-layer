// Long-Horizon Pattern Ledger: deterministic rules, no network calls.
(function(root){
const L={};
L.rolling=(pts,days)=>pts.map((p,i)=>{const t=p.t-days*864e5;let s=0,n=0;for(let j=i;j>=0&&pts[j].t>=t;j--){s+=pts[j].v;n++}return{t:p.t,v:s/n}});
L.segments=(pts)=>{const out=[];for(const p of pts){const l=out[out.length-1];if(!l||l.src!==p.src)out.push({src:p.src,from:p.t,to:p.t,vals:[p.v]});else{l.to=p.t;l.vals.push(p.v)}}
 out.forEach((s,i)=>{s.n=s.vals.length;s.mean=s.vals.reduce((a,b)=>a+b,0)/s.n;s.sd=Math.sqrt(s.vals.reduce((a,b)=>a+(b-s.mean)**2,0)/Math.max(1,s.n-1));s.step=i?s.mean-out[i-1].mean:null;
 s.flag=i&&Math.abs(s.step)>2*Math.max(out[i-1].sd,1e-9)?'drift-candidate':'';});return out};
L.slope=(pts)=>{if(pts.length<2)return 0;const x0=pts[0].t,n=pts.length;let sx=0,sy=0,sxx=0,sxy=0;for(const p of pts){const x=(p.t-x0)/864e5*365/365;sx+=x;sy+=p.v;sxx+=x*x;sxy+=x*p.v}return(n*sxy-sx*sy)/Math.max(1e-9,n*sxx-sx*sx)*365};
L.demo=()=>{const e=[];const s=new Date('2023-01-01').getTime();for(let d=0;d<1000;d++){const t=s+d*864e5;const src=d<600?'device_a':'device_b';const v=6+d*0.0008+(src==='device_b'?0.9:0)+Math.sin(d*1.7)*0.6;e.push({date:new Date(t).toISOString().slice(0,10),signal:'energy',value:+v.toFixed(2),source:src})}return e};
L.report=(E)=>{const out=['# Long-Horizon Pattern Ledger report','','Generated locally. Rule-based. Not medical advice.',''];
 for(const sig of [...new Set(E.map(e=>e.signal))]){const pts=E.filter(e=>e.signal===sig).map(e=>({t:new Date(e.date).getTime(),v:e.value,src:e.source})).sort((a,b)=>a.t-b.t);const segs=L.segments(pts);
  out.push('## '+sig,'','| Source | From | To | n | Mean | Step | Slope/yr |','|---|---|---|---|---|---|---|');
  for(const g of segs)out.push(`| ${g.src} | ${new Date(g.from).toISOString().slice(0,10)} | ${new Date(g.to).toISOString().slice(0,10)} | ${g.n} | ${g.mean.toFixed(2)} | ${g.step==null?'-':g.step.toFixed(2)+(g.flag?' (drift-candidate)':'')} | ${L.slope(pts.filter(p=>p.src===g.src)).toFixed(2)} |`);
  out.push('')}return out.join('\n')};
if(typeof module!=='undefined')module.exports=L;
if(typeof document==='undefined')return;
const K='hpl.entries.v1',$=id=>document.getElementById(id);
let E=JSON.parse(localStorage.getItem(K)||'[]');const save=()=>{localStorage.setItem(K,JSON.stringify(E));render()};
$('dt').value=new Date().toISOString().slice(0,10);
$('add').onclick=()=>{const v=parseFloat($('val').value);if(isNaN(v))return;E.push({date:$('dt').value,signal:$('sig').value.trim()||'signal',value:v,source:$('src').value.trim()||'manual'});save()};
$('demo').onclick=()=>{E=E.concat(L.demo());save()};$('clr').onclick=()=>{if(confirm('Delete all local entries?')){E=[];save()}};
$('exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(E,null,1)],{type:'application/json'}));a.download='ledger.json';a.click()};
$('rep').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([L.report(E)],{type:'text/markdown'}));a.download='ledger-report.md';a.click()};
$('imp').onchange=ev=>{const f=ev.target.files[0];if(!f)return;f.text().then(t=>{E=E.concat(JSON.parse(t));save()})};
$('view').onchange=render;$('win').onchange=render;
function render(){const sigs=[...new Set(E.map(e=>e.signal))];const cur=$('view').value;$('view').innerHTML=sigs.map(s=>`<option${s===cur?' selected':''}>${s}</option>`).join('');
 const sig=$('view').value;const pts=E.filter(e=>e.signal===sig).map(e=>({t:new Date(e.date).getTime(),v:e.value,src:e.source})).sort((a,b)=>a.t-b.t);
 const c=$('cv'),x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);$('seg').innerHTML='';if(!pts.length){$('sum').textContent='No entries yet. Add one or load demo data.';return}
 const segs=L.segments(pts);const r=L.rolling(pts,+$('win').value||90);const t0=pts[0].t,t1=pts[pts.length-1].t||t0+1,vs=pts.map(p=>p.v),lo=Math.min(...vs),hi=Math.max(...vs);
 const X=t=>20+(t-t0)/Math.max(1,t1-t0)*(c.width-40),Y=v=>c.height-20-(v-lo)/Math.max(1e-9,hi-lo)*(c.height-40);
 x.fillStyle='#55534d';pts.forEach(p=>x.fillRect(X(p.t),Y(p.v),2,2));
 x.strokeStyle='#7e9cc9';x.setLineDash([4,4]);segs.slice(1).forEach(s=>{x.beginPath();x.moveTo(X(s.from),10);x.lineTo(X(s.from),c.height-10);x.stroke()});x.setLineDash([]);
 x.strokeStyle='#c9b37e';x.lineWidth=2;x.beginPath();r.forEach((p,i)=>i?x.lineTo(X(p.t),Y(p.v)):x.moveTo(X(p.t),Y(p.v)));x.stroke();
 $('seg').innerHTML=segs.map(s=>`<tr><td>${s.src}</td><td>${new Date(s.from).toISOString().slice(0,10)}</td><td>${new Date(s.to).toISOString().slice(0,10)}</td><td>${s.n}</td><td>${s.mean.toFixed(2)}</td><td class="${s.flag?'d':''}">${s.step==null?'—':s.step.toFixed(2)+(s.flag?' · drift-candidate':'')}</td></tr>`).join('');
 const within=segs.map(s=>L.slope(pts.filter(p=>p.src===s.src))).map(v=>v.toFixed(2)).join(', ');
 $('sum').innerHTML=`${pts.length} entries · <span class="k">slow trend per year within each source: ${within}</span> · <span class="d">${segs.filter(s=>s.flag).length} source change(s) flagged as drift candidates</span>`}
render();
})(this);
