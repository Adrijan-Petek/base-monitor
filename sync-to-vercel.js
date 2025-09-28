#!/usr/bin/env node

import { analyze } from './api/analyzer.js';
import fs from 'fs';
import path from 'path';

async function syncToVercel() {
  console.log('🚀 Starting sync to Vercel (via JSON file)...');

  try {
    // Force fresh analysis by temporarily renaming the JSON file
    const jsonPath = path.join(process.cwd(), 'api', 'analysis-data.json');
    const backupPath = jsonPath + '.backup';

    if (fs.existsSync(jsonPath)) {
      fs.renameSync(jsonPath, backupPath);
      console.log('Temporarily moved existing JSON file to force fresh analysis');
    }

    // Run analysis with real database data
    const analysisData = await analyze();

    // Restore the backup
    if (fs.existsSync(backupPath)) {
      fs.renameSync(backupPath, jsonPath);
    }

    if (analysisData.dataSource === 'database') {
      console.log('✅ Real data analysis completed, writing to JSON file...');

      // Write to a JSON file that gets deployed with Vercel
      fs.writeFileSync(jsonPath, JSON.stringify(analysisData, null, 2));

      console.log('✅ Data written to api/analysis-data.json');
      console.log('📝 Commit and push this file to deploy real data to Vercel');
      console.log('🌐 Vercel API will serve real data after deployment');
    } else {
      console.log('⚠️  Only mock data available, not updating JSON file');
    }

  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('sync-to-vercel.js')) {
  syncToVercel().catch(e => {
    console.error(e);
    process.exit(1);
  });
}

export { syncToVercel };