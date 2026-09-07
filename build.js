const fs=require('fs');
const path=require('path');
const crypto=require('crypto');

const root=process.cwd();
const indexPath=path.join(root,'index.html');
const scripts=[
  'app.js',
  'content.js',
  'question-engine.js',
  'question-bank-full.js',
  'curriculum-expansion.js',
  'question-bank-fixes.js',
  'question-bank-audit.js',
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

const parts=scripts.map(file=>{
  const source=fs.readFileSync(path.join(root,file),'utf8');
  return `\n/* --- ${file} --- */\n${source}\n`;
});
const bundle=parts.join('');
const hash=crypto.createHash('sha256').update(bundle).digest('hex').slice(0,12);
const bundleName=`app.bundle.${hash}.js`;
fs.writeFileSync(path.join(root,bundleName),bundle,'utf8');

let html=fs.readFileSync(indexPath,'utf8');
const escaped=scripts.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
const scriptPattern=new RegExp(`<script(?:\\s+defer)?\\s+src=["'](?:${escaped})["']\\s*><\\/script>`, 'g');
html=html.replace(scriptPattern,'');
html=html.replace('</body>',`<script defer src="${bundleName}"></script></body>`);

// Production gets one deferred JS request instead of 16 separate files.
fs.writeFileSync(indexPath,html,'utf8');
console.log(`KPSS-Mobil static build: ${scripts.length} JS files bundled into ${bundleName}`);
