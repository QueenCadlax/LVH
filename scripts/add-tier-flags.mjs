import fs from 'fs';
import path from 'path';
const files = [
  path.join('.', 'data', 'businessProfessionalSeeds.ts'),
  path.join('.', 'data', 'automotiveSeeds.ts'),
  path.join('.', 'data', 'tourismTravelSeeds.ts'),
  path.join('.', 'data', 'healthMedicalSeeds.ts'),
  path.join('.', 'data', 'homeConstructionTradesSeeds.ts'),
  path.join('.', 'data', 'nightlifeEntertainmentSeeds.ts'),
  path.join('.', 'data', 'eatsSeeds.ts'),
  path.join('.', 'data', 'retailSeeds.ts'),
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let s = fs.readFileSync(file, 'utf8');
  const before = s;

  // For Platinum
  s = s.replace(/(tier:\s*ListingTier\.Platinum,\s*[\s\S]*?subscriptionDuration:\s*SubscriptionDuration\.TwelveMonths,)/g, (m) => {
    if (/isPlatinum\s*:/.test(m) || /isElite\s*:/.test(m)) return m;
    return m.replace('subscriptionDuration: SubscriptionDuration.TwelveMonths,', 'subscriptionDuration: SubscriptionDuration.TwelveMonths,\n    isPlatinum: true,');
  });
  // For Elite
  s = s.replace(/(tier:\s*ListingTier\.Elite,\s*[\s\S]*?subscriptionDuration:\s*SubscriptionDuration\.TwelveMonths,)/g, (m) => {
    if (/isPlatinum\s*:/.test(m) || /isElite\s*:/.test(m)) return m;
    return m.replace('subscriptionDuration: SubscriptionDuration.TwelveMonths,', 'subscriptionDuration: SubscriptionDuration.TwelveMonths,\n    isElite: true,');
  });

  if (s !== before) {
    fs.writeFileSync(file, s, 'utf8');
    console.log('Updated:', file);
  }
}
console.log('Tier flags processing complete');
