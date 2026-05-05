import fs from 'fs';
import path from 'path';
const file = path.join('.', 'data', 'financeMoneyServicesSeeds.ts');
let s = fs.readFileSync(file, 'utf8');
const before = s;
// Replace consecutive duplicate subscriptionDuration lines
s = s.replace(/subscriptionDuration:\s*SubscriptionDuration\.TwelveMonths,\s*\n\s*subscriptionDuration:\s*SubscriptionDuration\.TwelveMonths,/g, 'subscriptionDuration: SubscriptionDuration.TwelveMonths,');
if (s !== before) {
  fs.writeFileSync(file, s, 'utf8');
  console.log('Fixed duplicates in', file);
} else {
  console.log('No duplicates found');
}
