const fs=require('fs');
const path=require('path');
const file=path.join(process.cwd(),'index.html');
let html=fs.readFileSync(file,'utf8');
html=html.replace(/<script(?![^>]*\bdefer\b)([^>]*)\ssrc=/g,'<script defer$1 src=');
fs.writeFileSync(file,html,'utf8');
console.log('KPSS-Mobil static build: deferred script loading enabled');
