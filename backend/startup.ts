import dotenv from 'dotenv';

// Load env immediately
dotenv.config({ path: '.env' });

console.log('🚀 STARTUP LOG');
console.log('==============');
console.log(`Node version: ${process.version}`);
console.log(`Env NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
console.log(`Env PORT: ${process.env.PORT || 'undefined'}`);
console.log(`Env DB_HOST: ${process.env.DB_HOST || 'undefined'}`);
console.log(`Env DB_NAME: ${process.env.DB_NAME || 'undefined'}`);
console.log(`Env DB_USER: ${process.env.DB_USER || 'undefined'}`);
console.log(`Env DB_PASSWORD: ${process.env.DB_PASSWORD ? '***set***' : 'undefined'}`);

try {
  console.log('\n⏳ Importing server...');
  require('./dist/src/server');
  console.log('✅ Server started successfully');
} catch (error: any) {
  console.error('\n❌ STARTUP ERROR:');
  console.error(error.message);
  console.error(error.stack);
  process.exit(1);
}
