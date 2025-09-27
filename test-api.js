#!/usr/bin/env node
import fetch from 'node-fetch';

async function testAPI() {
  try {
    console.log('Testing API endpoints...\n');

    // Test health endpoint
    console.log('1. Testing /api/health...');
    const healthResponse = await fetch('http://localhost:3001/api/health');
    if (!healthResponse.ok) throw new Error(`Health endpoint failed: ${healthResponse.status}`);
    const healthData = await healthResponse.json();
    console.log('✅ Health endpoint working:', healthData.status);

    // Test analysis endpoint
    console.log('\n2. Testing /api/analysis...');
    const analysisResponse = await fetch('http://localhost:3001/api/analysis');
    if (!analysisResponse.ok) throw new Error(`Analysis endpoint failed: ${analysisResponse.status}`);
    const analysisData = await analysisResponse.json();
    console.log('✅ Analysis endpoint working');
    console.log('   - Base Blockchain:', analysisData.baseBlockchain ? '✅' : '❌');
    console.log('   - Farcaster:', analysisData.farcaster ? '✅' : '❌');

    console.log('\n🎉 All API endpoints are working correctly!');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    process.exit(1);
  }
}

testAPI();