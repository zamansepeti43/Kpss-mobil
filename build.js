const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const root=process.cwd();
const indexPath=path.join(root,'index.html');
function write(name,src){const h=crypto.createHash('sha256').update(src).digest('hex').slice(0,12);const file=name+'.'+h+'.js';fs.writeFileSync(path.join(root,file),src);return file}
const core=write('app.core',fs.readFileSync(path.join(root,'content.js'),'utf8'));
const runtime=write('app.runtime',fs.readFileSync(path.join(root,'runtime.js'),'utf8'));
const ux=write('app.ux',fs.readFileSync(path.join(root,'ux-patch.js'),'utf8'));
const pro=write('app.pro',fs.readFileSync(path.join(root,'pro-ui.js'),'utf8'));
const settings=write('app.settings',fs.readFileSync(path.join(root,'settings-patch.js'),'utf8'));
let html=fs.readFileSync(indexPath,'utf8');
html=html.replace(/<script[^>]*src=["'][^"']+["'][^>]*><\/script>/g,'');
html=html.replace(/<script>[^]*?<\/script>/g,'');
html=html.replace('</body>',`<script defer src="${core}"></script><script defer src="${runtime}"></script><script defer src="${ux}"></script><script defer src="${pro}"></script><script defer src="${settings}"></script></body>`);
fs.writeFileSync(indexPath,html);
console.log('KPSS-Mobil lightweight build: '+core+' + '+runtime+' + '+ux+' + '+pro+' + '+settings);