#!/usr/bin/env node

/**
 * Portfolio Manager - Repository Synchronization Script
 * Syncs all GitHub repositories with local copies
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'franklinbaldo';

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    }).trim();
  } catch (error) {
    if (!options.silent) {
      log(`Error executing: ${command}`, 'red');
      log(error.message, 'red');
    }
    throw error;
  }
}

async function getGitHubRepos() {
  log('🔍 Fetching repository list from GitHub...', 'cyan');
  try {
    const output = execCommand(`gh repo list ${GITHUB_USERNAME} --limit 100 --json name`, { silent: true });
    const repos = JSON.parse(output);
    return repos.map(repo => repo.name);
  } catch (error) {
    log('❌ Failed to fetch GitHub repositories. Make sure gh CLI is installed and authenticated.', 'red');
    process.exit(1);
  }
}

function getLocalRepos() {
  const items = fs.readdirSync('.', { withFileTypes: true });
  return items
    .filter(item => item.isDirectory() && !item.name.startsWith('.') && item.name !== 'scripts')
    .map(item => item.name);
}

async function syncRepository(repoName) {
  if (!fs.existsSync(repoName)) {
    log(`📥 Cloning ${repoName}...`, 'yellow');
    try {
      execCommand(`gh repo clone ${GITHUB_USERNAME}/${repoName}`);
      log(`✅ Successfully cloned ${repoName}`, 'green');
      return 'cloned';
    } catch (error) {
      log(`❌ Failed to clone ${repoName}`, 'red');
      return 'failed';
    }
  } else {
    log(`🔄 Syncing ${repoName}...`, 'blue');
    try {
      process.chdir(repoName);
      execCommand('git fetch --all', { silent: true });
      const status = execCommand('git status --porcelain', { silent: true });
      
      if (status) {
        log(`⚠️  ${repoName} has local changes - skipping pull`, 'yellow');
        process.chdir('..');
        return 'local_changes';
      } else {
        execCommand('git pull', { silent: true });
        process.chdir('..');
        log(`✅ ${repoName} synchronized`, 'green');
        return 'synced';
      }
    } catch (error) {
      process.chdir('..');
      log(`❌ Failed to sync ${repoName}`, 'red');
      return 'failed';
    }
  }
}

async function main() {
  log('🚀 Portfolio Manager - Repository Synchronization', 'cyan');
  log('================================================', 'cyan');
  
  const githubRepos = await getGitHubRepos();
  const localRepos = getLocalRepos();
  
  log(`📊 Found ${githubRepos.length} repositories on GitHub`, 'blue');
  log(`📁 Found ${localRepos.length} local repositories`, 'blue');
  
  const results = {
    cloned: 0,
    synced: 0,
    local_changes: 0,
    failed: 0
  };
  
  for (const repo of githubRepos) {
    const result = await syncRepository(repo);
    results[result]++;
  }
  
  log('\n📈 Synchronization Summary:', 'cyan');
  log(`✅ Synced: ${results.synced}`, 'green');
  log(`📥 Cloned: ${results.cloned}`, 'yellow');
  log(`⚠️  Local changes: ${results.local_changes}`, 'yellow');
  log(`❌ Failed: ${results.failed}`, 'red');
  
  // Find local-only repositories
  const localOnly = localRepos.filter(repo => !githubRepos.includes(repo));
  if (localOnly.length > 0) {
    log(`\n📂 Local-only repositories (${localOnly.length}):`, 'blue');
    localOnly.forEach(repo => log(`   • ${repo}`, 'blue'));
  }
  
  log('\n🎉 Synchronization complete!', 'green');
}

if (require.main === module) {
  main().catch(error => {
    log(`❌ Synchronization failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { syncRepository, getGitHubRepos, getLocalRepos };