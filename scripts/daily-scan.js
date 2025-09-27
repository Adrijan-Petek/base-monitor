#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

async function runDailyScan() {
  const timestamp = new Date().toISOString();
  console.log(`🚀 Starting daily reward manipulation scan at ${timestamp}`);

  try {
    // Step 1: Collect latest Base blockchain data
    await runCommand('node', ['src/collectors/baseCollector.js'], 'Collecting Base blockchain reward data');

    // Step 2: Analyze the collected data
    await runCommand('node', ['src/analyzer/analyze.js'], 'Analyzing reward distribution patterns');

    // Step 3: Run tests to ensure everything is working
    await runCommand('npm', ['test'], 'Running automated tests');

    console.log(`\n🎉 Daily scan completed successfully at ${new Date().toISOString()}`);
    console.log('📊 Check the analysis output above for manipulation detection results');

  } catch (error) {
    console.error('\n💥 Daily scan failed:', error.message);
    console.log('🔧 Manual intervention may be required');
    process.exit(1);
  }
}

// Run the daily scan
runDailyScan().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});