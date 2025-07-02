#!/usr/bin/env node

/**
 * Portfolio Manager - Repository Status Checker
 * Checks the status of all repositories and generates a summary
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    return execSync(command, { 
      encoding: 'utf8', 
      cwd: options.cwd || process.cwd(),
      stdio: 'pipe'
    }).trim();
  } catch (error) {
    return null;
  }
}

function getRepoStatus(repoName) {
  if (!fs.existsSync(repoName) || !fs.existsSync(path.join(repoName, '.git'))) {
    return { status: 'not_git', error: 'Not a git repository' };
  }
  
  try {
    const status = execCommand('git status --porcelain', { cwd: repoName });
    const branch = execCommand('git branch --show-current', { cwd: repoName });
    const remote = execCommand('git remote -v', { cwd: repoName });
    const lastCommit = execCommand('git log -1 --format="%h %s (%cr)"', { cwd: repoName });
    
    const hasChanges = status && status.length > 0;
    const hasRemote = remote && remote.includes('github.com');
    
    let ahead = 0;
    let behind = 0;
    
    if (hasRemote) {
      try {
        execCommand('git fetch', { cwd: repoName });
        const aheadBehind = execCommand('git rev-list --left-right --count HEAD...@{u}', { cwd: repoName });
        if (aheadBehind) {
          const [a, b] = aheadBehind.split('\t').map(Number);
          ahead = a || 0;
          behind = b || 0;
        }
      } catch (e) {
        // Remote tracking might not be set up
      }
    }
    
    return {
      status: 'ok',
      branch: branch || 'unknown',
      hasChanges,
      hasRemote,
      ahead,
      behind,
      lastCommit: lastCommit || 'No commits',
      changeCount: status ? status.split('\n').length : 0
    };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}

function getRepoSize(repoName) {
  try {
    const output = execCommand(`du -sh "${repoName}"`, {});
    return output ? output.split('\t')[0] : 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

function detectTechnology(repoName) {
  const files = fs.existsSync(repoName) ? fs.readdirSync(repoName) : [];
  const technologies = [];
  
  if (files.includes('package.json')) technologies.push('Node.js');
  if (files.includes('pyproject.toml') || files.includes('requirements.txt')) technologies.push('Python');
  if (files.includes('Cargo.toml')) technologies.push('Rust');
  if (files.includes('go.mod')) technologies.push('Go');
  if (files.includes('pom.xml') || files.includes('build.gradle')) technologies.push('Java');
  if (files.includes('Dockerfile')) technologies.push('Docker');
  if (files.includes('astro.config.mjs') || files.includes('astro.config.ts')) technologies.push('Astro');
  if (files.some(f => f.endsWith('.vue'))) technologies.push('Vue');
  if (files.some(f => f.endsWith('.svelte'))) technologies.push('Svelte');
  if (files.includes('index.html') && !technologies.length) technologies.push('HTML');
  
  return technologies.length > 0 ? technologies.join(', ') : 'Unknown';
}

async function main() {
  log('📊 Portfolio Manager - Repository Status Check', 'cyan');
  log('==============================================', 'cyan');
  
  const items = fs.readdirSync('.', { withFileTypes: true });
  const repos = items
    .filter(item => item.isDirectory() && !item.name.startsWith('.') && item.name !== 'scripts')
    .map(item => item.name)
    .sort();
  
  log(`\n🔍 Analyzing ${repos.length} repositories...\n`, 'blue');
  
  const results = {
    clean: [],
    dirty: [],
    ahead: [],
    behind: [],
    noRemote: [],
    errors: []
  };
  
  for (const repo of repos) {
    const status = getRepoStatus(repo);
    const size = getRepoSize(repo);
    const tech = detectTechnology(repo);
    
    let statusIcon = '✅';
    let statusText = 'Clean';
    let statusColor = 'green';
    
    if (status.status === 'error') {
      statusIcon = '❌';
      statusText = `Error: ${status.error}`;
      statusColor = 'red';
      results.errors.push(repo);
    } else if (status.status === 'not_git') {
      statusIcon = '⚠️ ';
      statusText = 'Not a git repo';
      statusColor = 'yellow';
      results.errors.push(repo);
    } else {
      if (status.hasChanges) {
        statusIcon = '📝';
        statusText = `${status.changeCount} changes`;
        statusColor = 'yellow';
        results.dirty.push(repo);
      } else {
        results.clean.push(repo);
      }
      
      if (!status.hasRemote) {
        statusIcon = '🔗';
        statusText += ' (no remote)';
        statusColor = 'magenta';
        results.noRemote.push(repo);
      } else {
        if (status.ahead > 0) {
          statusText += ` (${status.ahead} ahead)`;
          results.ahead.push(repo);
        }
        if (status.behind > 0) {
          statusText += ` (${status.behind} behind)`;
          results.behind.push(repo);
        }
      }
    }
    
    log(`${statusIcon} ${repo.padEnd(25)} ${size.padEnd(8)} ${tech.padEnd(15)} ${statusText}`, statusColor);
  }
  
  log('\n📈 Summary:', 'cyan');
  log(`✅ Clean repositories: ${results.clean.length}`, 'green');
  log(`📝 Repositories with changes: ${results.dirty.length}`, 'yellow');
  log(`⬆️  Repositories ahead of remote: ${results.ahead.length}`, 'blue');
  log(`⬇️  Repositories behind remote: ${results.behind.length}`, 'red');
  log(`🔗 Repositories without remote: ${results.noRemote.length}`, 'magenta');
  log(`❌ Repositories with errors: ${results.errors.length}`, 'red');
  
  if (results.dirty.length > 0) {
    log(`\n📝 Repositories with uncommitted changes:`, 'yellow');
    results.dirty.forEach(repo => log(`   • ${repo}`, 'yellow'));
  }
  
  if (results.behind.length > 0) {
    log(`\n⬇️  Repositories behind remote (need pull):`, 'red');
    results.behind.forEach(repo => log(`   • ${repo}`, 'red'));
  }
  
  if (results.ahead.length > 0) {
    log(`\n⬆️  Repositories ahead of remote (need push):`, 'blue');
    results.ahead.forEach(repo => log(`   • ${repo}`, 'blue'));
  }
  
  if (results.noRemote.length > 0) {
    log(`\n🔗 Local-only repositories:`, 'magenta');
    results.noRemote.forEach(repo => log(`   • ${repo}`, 'magenta'));
  }
  
  log('\n🎉 Status check complete!', 'green');
}

if (require.main === module) {
  main().catch(error => {
    log(`❌ Status check failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = { getRepoStatus, detectTechnology };