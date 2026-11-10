// Copies only the homepage build. Never copies local plans, credentials, or drafts.
import { cp, mkdir, readdir, rm, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const dest = path.join(root, 'assets/homepage')
await mkdir(dest, { recursive: true })
for (const file of await readdir(dest)) {
  if (/^(index-[\w-]+\.(js|css)|(guitar|photography|yoga)\.jpg|chrome-form\.svg)$/.test(file)) await rm(path.join(dest, file))
}
await cp(path.join(here, 'dist/assets/homepage'), dest, { recursive: true })
const entry = await readFile(path.join(here, 'dist/index.html'), 'utf8')
const script = entry.match(/src="(\.\/assets\/homepage\/[^"\s]+\.js)"/)?.[1]
if (!script) throw new Error('Missing compiled launch entry')

const demoPath = path.join(root, 'learn.html')
let demo = await readFile(demoPath, 'utf8')
demo = demo.replace(/\n?<!-- skillpath-launch:start -->[\s\S]*?<!-- skillpath-launch:end -->\n?/, '')
const launch = `
<!-- skillpath-launch:start -->
<div data-skillpath-launch style="position:fixed;inset:0;z-index:2147483647;background:#b9b7a8"></div>
<script defer src="${script}"></script>
<script>
// Fail open if the launch bundle is unavailable; the Demo remains usable.
setTimeout(function () {
  var launch = document.querySelector('[data-skillpath-launch]');
  if (!launch) return;
  launch.remove();
  var phone = document.querySelector('[data-launch-inert]');
  if (phone) { phone.removeAttribute('inert'); phone.removeAttribute('data-launch-inert'); }
}, 4000);
</script>
<!-- skillpath-launch:end -->
`
demo = demo.replace('<body>', '<body>' + launch)
await writeFile(demoPath, demo)
await writeFile(path.join(root, 'index.html'), `<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="theme-color" content="#d8d5c5"><title>SkillPath</title><style>html,body{margin:0;background:#d8d5c5}</style><script>location.replace(new URL('./learn.html'+location.search+location.hash,location.href).href)</script><noscript><meta http-equiv="refresh" content="0;url=./learn.html"></noscript></head><body></body></html>
`)
console.log('Launch page integrated into Demo (learn.html). Root entry opens the same Demo.')
