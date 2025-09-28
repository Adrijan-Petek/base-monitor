#!/usr/bin/env node

/**
 * GitHub Secrets Setup Helper for Base Monitor
 *
 * This script helps you set up the required GitHub repository secrets
 * for automated daily scanning with GitHub Actions.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔐 GitHub Secrets Setup Helper for Base Monitor');
console.log('================================================\n');

console.log('📋 Required GitHub Repository Secrets:');
console.log('---------------------------------------');

const secrets = [
  {
    name: 'DATABASE_URL',
    description: 'PostgreSQL connection string for your database',
    example: 'postgres://username:password@hostname:5432/database_name',
    required: true
  },
  {
    name: 'BASE_RPC',
    description: 'Base network RPC endpoint URL',
    example: 'https://mainnet.base.org',
    required: true
  },
  {
    name: 'REWARD_CONTRACTS',
    description: 'Comma-separated list of reward contract addresses to monitor',
    example: '0x1234567890123456789012345678901234567890,0x0987654321098765432109876543210987654321',
    required: true
  },
  {
    name: 'FARCASTER_HUB',
    description: 'Farcaster hub endpoint (optional, improves Farcaster data collection)',
    example: 'https://hub.farcaster.xyz',
    required: false
  },
  {
    name: 'FARCASTER_FID',
    description: 'Farcaster FID for API access (optional)',
    example: '12345',
    required: false
  }
];

secrets.forEach((secret, index) => {
  console.log(`${index + 1}. ${secret.name} ${secret.required ? '(REQUIRED)' : '(OPTIONAL)'}`);
  console.log(`   Description: ${secret.description}`);
  console.log(`   Example: ${secret.example}`);
  console.log('');
});

console.log('🚀 Setup Instructions:');
console.log('----------------------');
console.log('1. Go to your GitHub repository');
console.log('2. Click "Settings" tab');
console.log('3. Click "Secrets and variables" → "Actions" in the left sidebar');
console.log('4. Click "New repository secret"');
console.log('5. Add each secret listed above');
console.log('');

console.log('💡 Tips:');
console.log('--------');
console.log('• Copy values from your .env file');
console.log('• Use the same DATABASE_URL you use locally');
console.log('• For BASE_RPC, use a reliable RPC provider');
console.log('• Test locally first: npm run daily-scan');
console.log('');

console.log('✅ Once secrets are configured:');
console.log('-------------------------------');
console.log('• The daily scan will run automatically every day at 02:00 UTC');
console.log('• You can trigger manually via GitHub Actions');
console.log('• Check the "Actions" tab for workflow runs and logs');
console.log('');

console.log('🔄 Workflow will:');
console.log('-----------------');
console.log('• Collect fresh Base blockchain data');
console.log('• Run manipulation analysis');
console.log('• Update api/analysis-data.json');
console.log('• Commit and push changes');
console.log('• Trigger Vercel redeployment automatically');
console.log('');

try {
  // Try to read .env file and show current values
  const envPath = join(__dirname, '..', '.env');
  const envContent = readFileSync(envPath, 'utf8');

  console.log('📄 Current .env values (for reference):');
  console.log('----------------------------------------');

  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=');
    if (secrets.some(s => s.name === key)) {
      console.log(`${key}=${value ? '[SET]' : '[NOT SET]'}`);
    }
  });
} catch (error) {
  console.log('📄 No .env file found - create one with your configuration first');
}

console.log('\n🎯 Ready to automate your Base Monitor scanning!');
console.log('   GitHub Actions will handle everything from here.');