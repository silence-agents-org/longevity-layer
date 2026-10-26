#!/usr/bin/env node
// Zero-dependency local server. Binds to 127.0.0.1 only.
const http=require('http'),fs=require('fs'),path=require('path');
const port=+process.env.PORT||4173,T={'.html':'text/html','.js':'text/javascript','.json':'application/json','.md':'text/plain'};
http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';const f=path.join(__dirname,path.normalize(p));
 if(!f.startsWith(__dirname)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end('not found')}
 s.writeHead(200,{'content-type':(T[path.extname(f)]||'application/octet-stream')+'; charset=utf-8'});fs.createReadStream(f).pipe(s)})
.listen(port,'127.0.0.1',()=>console.log(`Long-Horizon Pattern Ledger: http://127.0.0.1:${port}  (Ctrl+C to stop)`));
