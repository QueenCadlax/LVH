import fs from 'fs';
import path from 'path';

const files = [
  'data/businessProfessionalSeeds.ts',
  'data/automotiveSeeds.ts',
  'data/tourismTravelSeeds.ts',
  'data/healthMedicalSeeds.ts',
  'data/homeConstructionTradesSeeds.ts'
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove duplicate isPlatinum lines (keep only first)
  content = content.replace(/isPlatinum: true,\s*isPlatinum: true,(\s*isPlatinum: true,)*/g, 'isPlatinum: true,');
  
  // Remove duplicate isElite lines (keep only first)
  content = content.replace(/isElite: true,\s*isElite: true,(\s*isElite: true,)*/g, 'isElite: true,');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Cleaned duplicates: ${file}`);
}

console.log('Cleanup complete');
