// scripts/publish-docs.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  execSync(cmd, { stdio: 'inherit' });
}

const root = process.cwd();
const buildDir = path.join(root, 'build');
const docsDir  = path.join(root, 'docs');

// 1) Ensure build exists (npm run build already ran via package.json)
if (!fs.existsSync(buildDir)) {
  console.error('❌ build/ not found. Run `npm run build` first.');
  process.exit(1);
}

// 2) Clean docs/
if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}
fs.mkdirSync(docsDir);

// 3) Copy build -> docs (use cpSync if available; otherwise fallback)
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.cpSync) {
  fs.cpSync(buildDir, docsDir, { recursive: true });
} else {
  copyRecursive(buildDir, docsDir);
}

// 4) Git add/commit/push (commit may be empty — handle gracefully)
try {
  run('git add docs');
  // If nothing changed, commit will fail — so ignore errors.
  try {
    run('git commit -m "Publish to docs"');
  } catch (e) {
    console.log('ℹ️ No changes to commit.');
  }
  run('git push');
  console.log('✅ Published to /docs. GitHub Pages will update shortly.');
} catch (err) {
  console.error('❌ Git operation failed. Is the repo connected (git remote -v)?');
  process.exit(1);
}
