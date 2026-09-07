const fs=require('fs');
const path=require('path');
const crypto=require('crypto');

const root=process.cwd();
const indexPath=path.join(root,'index.html');
const coreScripts=['app.js','content.js'];
const enhancementScripts=[
  'question-engine.js',
  'question-bank-full.js',
  'curriculum-expansion.js',
  'question-bank-fixes.js',
  'question-bank-complete.js',
  'exam-content-upgrade.js',
  'question-engine-v4.js',
  'question-engine-v5.js',
  'curriculum-ui.js',
  'difficulty-ui.js',
  'question-engine-bind.js',
  'past.js',
  'curriculum-subject-sync.js'
];

function bundleFiles(files){
  return files.map(file=>`\n/* --- ${file} --- */\n${fs.readFileSync(path.join(root,file),'utf8')}\n`).join('');
}
function writeBundle(prefix,files){
  const source=bundleFiles(files);
  const hash=crypto.createHash('sha256').update(source).digest('hex').slice(0,12);
  const name=`${prefix}.${hash}.js`;
  fs.writeFileSync(path.join(root,name),source,'utf8');
  return name;
}

const coreName=writeBundle('app.core',coreScripts);
const enhancementName=writeBundle('app.enhance',enhancementScripts);

let html=fs.readFileSync(indexPath,'utf8');
const allScripts=[...coreScripts,...enhancementScripts,'question-bank-audit.js'];
const escaped=allScripts.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
const scriptPattern=new RegExp(`<script(?:\\s+defer)?\\s+src=["'](?:${escaped})["']\\s*><\\/script>`, 'g');
html=html.replace(scriptPattern,'');
const loader=`<script defer src="${coreName}"></script><script>
(()=>{
 let loaded=false;
 const load=()=>{
   if(loaded)return;
   loaded=true;
   const s=document.createElement('script');
   s.src='${enhancementName}';
   s.defer=true;
   document.head.appendChild(s);
 };
 // Keep Home completely free of the large question/curriculum bundle.
 // Load the enhancement bundle only after the user actually leaves Home.
 document.addEventListener('click',e=>{
   if(e.target.closest('[data-go]:not([data-go="home"])'))load();
 },{capture:true,passive:true});
})();
</script>`;
html=html.replace('</body>',`${loader}</body>`);
fs.writeFileSync(indexPath,html,'utf8');
console.log(`KPSS-Mobil static build: core=${coreName}, enhancement=${enhancementName}`);
