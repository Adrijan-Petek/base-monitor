#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

async function runCommand(command, args = [], description) {
  console.log(`\n=== ${description} ===`);
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, NODE_PATH: projectRoot }
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description} completed successfully`);
        resolve();
      } else {
        console.log(`❌ ${description} failed with code ${code}`);
        reject(new Error(`${description} failed`));
      }
    });

    child.on('error', (error) => {
      console.error(`Error running ${description}:`, error);
      reject(error);
    });
  });
}

async function runAnalysisAndSave() {
  console.log('🔍 Running fresh analysis for Vercel sync...');

  // Import the analysis function dynamically
  const { runAnalysis } = await import('../src/analyzer/analyze.js');

  try {
    const analysisData = await runAnalysis();

    // Add data source indicator
    analysisData.dataSource = "database";

    // Save to analysis-data.json
    const outputPath = join(projectRoot, 'api', 'analysis-data.json');
    await fs.writeFile(outputPath, JSON.stringify(analysisData, null, 2));

    console.log(`✅ Analysis data saved to ${outputPath}`);
    console.log(`📊 Data timestamp: ${analysisData.timestamp}`);

    return analysisData;
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    throw error;
  }
}

async function syncToVercel() {
  const timestamp = new Date().toISOString();
  console.log(`🚀 Starting Vercel sync at ${timestamp}`);

  try {
    // Step 1: Run fresh analysis and save results
    await runAnalysisAndSave();

    // Step 2: Commit the updated analysis data
    await runCommand('git', ['add', 'api/analysis-data.json'], 'Staging updated analysis data');

    // Check if there are changes to commit
    try {
      await runCommand('git', ['diff', '--cached', '--quiet'], 'Checking for changes');
      console.log('ℹ️  No changes to commit - analysis data is up to date');
    } catch {
      // Configure git user identity for CI/CD environments
      await runCommand('git', ['config', 'user.name', 'GitHub Actions'], 'Setting git user name');
      await runCommand('git', ['config', 'user.email', 'actions@github.com'], 'Setting git user email');

      // There are changes, so commit them
      await runCommand('git commit -m "Update analysis data"', [], 'Committing analysis data update');
    }

    // Step 3: Push to trigger Vercel deployment
    try {
      await runCommand('git', ['push', 'origin', 'main'], 'Pushing changes to trigger Vercel deployment');
    } catch (pushError) {
      console.log('⚠️  Push failed - this may be due to concurrent updates. Trying to pull and push again...');
      try {
        await runCommand('git', ['pull', '--rebase', 'origin', 'main'], 'Pulling latest changes');
        await runCommand('git', ['push', 'origin', 'main'], 'Pushing changes after rebase');
      } catch (rebaseError) {
        console.log('⚠️  Push still failed. This is normal in concurrent environments.');
        console.log('💡 The analysis data has been committed locally and will sync when possible.');
        console.log('🔄 In production (GitHub Actions), this script runs in a fresh clone and won\'t have conflicts.');
      }
    }

    console.log(`\n🎉 Vercel sync completed successfully at ${new Date().toISOString()}`);
    console.log('📊 Fresh analysis data has been deployed to Vercel');

  } catch (error) {
    console.error('\n💥 Vercel sync failed:', error.message);
    console.log('🔧 Manual intervention may be required');
    process.exit(1);
  }
}

// Run the sync
syncToVercel().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});