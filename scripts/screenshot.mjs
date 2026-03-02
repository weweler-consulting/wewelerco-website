#!/usr/bin/env node
/**
 * Screenshot-Script für Vorher/Nachher-Slider
 *
 * Usage:
 *   node scripts/screenshot.mjs --url "https://example.com" --out "praxen/dr-name"
 *
 * Erzeugt:
 *   - praxen/dr-name/screenshot-vorher.png  (Hero-Bereich der aktuellen Website)
 *   - praxen/dr-name/screenshot-nachher.png (hero-template.html)
 */

import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// --- Args parsen ---
const args = process.argv.slice(2);
function getArg(name) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

const url = getArg('url');
const outDir = getArg('out');

if (!url || !outDir) {
  console.error('Usage: node scripts/screenshot.mjs --url "https://..." --out "praxen/dr-name"');
  process.exit(1);
}

const outputPath = resolve(ROOT, outDir);
if (!existsSync(outputPath)) {
  mkdirSync(outputPath, { recursive: true });
}

// Beide Screenshots gleiche Größe für den Slider
const VIEWPORT = { width: 1024, height: 768 };

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // --- Screenshot Vorher (aktuelle Website) ---
    console.log(`📸 Vorher-Screenshot: ${url}`);
    const pageBefore = await browser.newPage();
    await pageBefore.setViewport(VIEWPORT);
    await pageBefore.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await pageBefore.screenshot({
      path: resolve(outputPath, 'screenshot-vorher.png'),
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    });
    await pageBefore.close();
    console.log(`✅ screenshot-vorher.png gespeichert`);

    // --- Screenshot Nachher (hero-template.html) ---
    // Bei 1024px wechselt das Template zu Single-Column,
    // Content-Bereich füllt den sichtbaren Bereich
    const templatePath = resolve(ROOT, 'public', 'hero-template.html');
    console.log(`📸 Nachher-Screenshot: hero-template.html`);
    const pageAfter = await browser.newPage();
    await pageAfter.setViewport(VIEWPORT);
    await pageAfter.goto(`file://${templatePath}`, { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000));
    await pageAfter.screenshot({
      path: resolve(outputPath, 'screenshot-nachher.png'),
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
    });
    await pageAfter.close();
    console.log(`✅ screenshot-nachher.png gespeichert`);

  } finally {
    await browser.close();
  }

  console.log(`\n🎯 Screenshots gespeichert in: ${outputPath}`);
}

run().catch(err => {
  console.error('❌ Fehler:', err.message);
  process.exit(1);
});
