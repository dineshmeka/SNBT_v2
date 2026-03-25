const fs = require('fs');
const path = require('path');

const sourceDir = __dirname;
const targetDir = path.join(__dirname, 'www');

const excludes = ['node_modules', 'android', 'ios', 'www', '.git', 'package.json', 'package-lock.json', 'server.js', 'build.js', '.vscode'];

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

const items = fs.readdirSync(sourceDir);

items.forEach(item => {
    if (excludes.includes(item)) return;
    
    const srcPath = path.join(sourceDir, item);
    const destPath = path.join(targetDir, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
        fs.copyFileSync(srcPath, destPath);
    }
});
console.log('Build completed, assets copied to www folder.');
