// index.html (the game) + updater.js -> www/index.html, then dist/ patch bundle + latest.json
import fs from 'fs'; import crypto from 'crypto'; import archiver from 'archiver';
const version = process.env.APP_VERSION || String(Date.now()), url = process.env.UPDATE_URL || '__UPDATE_URL__';
let h = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('updater.js', 'utf8').replace('__UPDATE_URL__', url);
if (!h.includes('</body>')) throw new Error('index.html has no </body>');
h = h.replace('</body>', '<script>\n' + js + '\n</script>\n</body>');
fs.mkdirSync('www', { recursive: true }); fs.writeFileSync('www/index.html', h);
if (process.argv[2] === 'bundle') {
  fs.mkdirSync('dist', { recursive: true });
  const name = `bundle-${version}.zip`, out = fs.createWriteStream(`dist/${name}`), z = archiver('zip', { zlib: { level: 9 } });
  out.on('close', () => {
    const sum = crypto.createHash('sha256').update(fs.readFileSync(`dist/${name}`)).digest('hex');
    fs.writeFileSync('dist/latest.json', JSON.stringify({ version, url: name, checksum: sum }));
    fs.writeFileSync('dist/index.html', h);
    console.log('bundle', name, fs.statSync(`dist/${name}`).size);
  });
  z.pipe(out); z.directory('www/', false); z.finalize();
}
