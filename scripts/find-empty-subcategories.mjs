import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve('.');
const typesPath = path.join(repoRoot, 'types.ts');
const dataDir = path.join(repoRoot, 'data');

const typesRaw = fs.readFileSync(typesPath, 'utf8');

const blockMatch = typesRaw.match(/export const CategorySubcategories:[\s\S]*?=\s*{([\s\S]*?)};/);
if (!blockMatch) {
  console.error('CategorySubcategories block not found');
  process.exit(1);
}
const block = blockMatch[1];

// extract all subcategory strings
const subcatRegex = /'([^']+)'/g;
let m;
const subcategories = [];
while ((m = subcatRegex.exec(block)) !== null) {
  subcategories.push(m[1]);
}

// dedupe
const uniqueSubcats = Array.from(new Set(subcategories));

// read all data files concatenated
const dataFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));
const dataContents = dataFiles.map(f => ({file: f, content: fs.readFileSync(path.join(dataDir, f), 'utf8')}));

const empties = [];
for (const sub of uniqueSubcats) {
  const subLower = sub.toLowerCase();
  const found = dataContents.some(d => d.content.toLowerCase().includes("subcategory: '" + subLower + "'") || d.content.toLowerCase().includes('subcategory: \"' + subLower + '\"'));
  if (!found) empties.push(sub);
}

console.log('Scanned data files:', dataFiles.length);
if (empties.length === 0) {
  console.log('No empty subcategories found.');
} else {
  console.log('Empty subcategories (no "subcategory: \'...\'" usage found):');
  empties.forEach(s => console.log(' -', s));
}
