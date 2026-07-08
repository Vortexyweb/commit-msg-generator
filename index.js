#!/usr/bin/env node

const { Command } = require('commander');
const { execSync } = require('child_process');
const chalk = require('chalk');

const program = new Command();

function getGitDiff(staged = false) {
  try {
    const flag = staged ? '--cached' : '';
    return execSync(`git diff ${flag}`, { encoding: 'utf8' });
  } catch {
    return '';
  }
}

function parseDiff(diff) {
  const stats = {
    files: [],
    additions: 0,
    deletions: 0,
    types: new Set(),
  };

  const fileRegex = /^diff --git a\/(.+?) b\/(.+?)$/gm;
  const hunkRegex = /^@@ -\d+(?:,\d+)? \+\d+(?:,\d+)? @@/gm;
  let match;

  while ((match = fileRegex.exec(diff)) !== null) {
    stats.files.push(match[2]);
  }

  const addLines = (diff.match(/^\+[^+]/gm) || []).length;
  const delLines = (diff.match(/^-[^-]/gm) || []).length;

  stats.additions = addLines;
  stats.deletions = delLines;

  for (const file of stats.files) {
    if (file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
      stats.types.add('javascript');
    }
    if (file.endsWith('.css') || file.endsWith('.scss') || file.endsWith('.less')) {
      stats.types.add('style');
    }
    if (file.endsWith('.html') || file.endsWith('.vue')) {
      stats.types.add('html');
    }
    if (file.endsWith('.json') || file.endsWith('.yaml') || file.endsWith('.yml')) {
      stats.types.add('config');
    }
    if (file.endsWith('.md') || file.endsWith('.txt')) {
      stats.types.add('docs');
    }
    if (file.includes('test') || file.includes('spec')) {
      stats.types.add('test');
    }
    if (file.includes('.env') || file.includes('config')) {
      stats.types.add('config');
    }
  }

  return stats;
}

function inferCommitType(stats) {
  const { files, additions, deletions } = stats;

  if (files.some(f => f.includes('test') || f.includes('spec'))) {
    return 'test';
  }
  if (files.some(f => f.endsWith('.md') || f.endsWith('.txt') || f.includes('docs'))) {
    return 'docs';
  }
  if (files.some(f => f.includes('.env') || f.includes('config') || f.includes('package.json'))) {
    return 'chore';
  }
  if (files.some(f => f.endsWith('.css') || f.endsWith('.scss') || f.endsWith('.less'))) {
    return 'style';
  }
  if (deletions > additions * 2 && files.length <= 3) {
    return 'refactor';
  }
  if (additions > deletions * 3 && additions > 50) {
    return 'feat';
  }
  if (additions > 0 && deletions === 0) {
    return 'feat';
  }
  if (deletions > 0 && additions === 0) {
    return 'refactor';
  }
  if (files.length === 1 && additions + deletions < 10) {
    return 'fix';
  }

  return 'chore';
}

function inferScope(files) {
  if (files.length === 1) {
    const parts = files[0].split('/');
    if (parts.length > 1) {
      return parts[parts.length - 2];
    }
  }

  const scopes = files.map(f => {
    const parts = f.split('/');
    return parts.length > 1 ? parts[parts.length - 2] : null;
  }).filter(Boolean);

  const unique = [...new Set(scopes)];
  if (unique.length === 1) return unique[0];
  if (unique.length <= 3) return unique.join(', ');

  return null;
}

function generateMessage(stats) {
  const type = inferCommitType(stats);
  const scope = inferScope(stats.files);
  const scopePart = scope ? `(${scope})` : '';

  let description;
  if (stats.files.length === 1) {
    const filename = stats.files[0].split('/').pop();
    description = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  } else {
    description = `${stats.files.length} files`;
  }

  if (stats.additions > 0 && stats.deletions > 0) {
    description += ` (±${stats.additions + stats.deletions} lines)`;
  } else if (stats.additions > 0) {
    description += ` (+${stats.additions} lines)`;
  } else if (stats.deletions > 0) {
    description += ` (-${stats.deletions} lines)`;
  }

  return `${type}${scopePart}: ${description}`;
}

program
  .name('commit-msg')
  .description('Generate conventional commit messages from git diff')
  .version('1.0.0');

program
  .command('generate')
  .alias('gen')
  .description('Generate a commit message from staged/unstaged changes')
  .option('-s, --staged', 'Use staged changes only', false)
  .option('-m, --message', 'Show detailed message', false)
  .action((options) => {
    const diff = getGitDiff(options.staged);

    if (!diff) {
      console.log(chalk.yellow('No changes detected. Make some changes first!'));
      return;
    }

    const stats = parseDiff(diff);
    const message = generateMessage(stats);

    if (options.message) {
      console.log(chalk.bold.cyan('\n📊 Diff Analysis:\n'));
      console.log(`  Files changed: ${chalk.white(stats.files.length)}`);
      console.log(`  Additions:     ${chalk.green(`+${stats.additions}`)}`);
      console.log(`  Deletions:     ${chalk.red(`-${stats.deletions}`)}`);
      console.log(`  File types:    ${chalk.white([...stats.types].join(', ') || 'mixed')}`);
      console.log('\n' + chalk.bold.cyan('💬 Generated Message:\n'));
    }

    console.log(chalk.green(message));
  });

program
  .command('interactive')
  .alias('i')
  .description('Interactive commit message generation')
  .option('-s, --staged', 'Use staged changes only', false)
  .action((options) => {
    const diff = getGitDiff(options.staged);

    if (!diff) {
      console.log(chalk.yellow('No changes detected.'));
      return;
    }

    const stats = parseDiff(diff);

    console.log(chalk.bold.cyan('\n📊 Diff Analysis:\n'));
    console.log(`  Files changed: ${chalk.white(stats.files.length)}`);
    console.log(`  Additions:     ${chalk.green(`+${stats.additions}`)}`);
    console.log(`  Deletions:     ${chalk.red(`-${stats.deletions}`)}`);

    console.log(chalk.bold.cyan('\n📁 Changed Files:\n'));
    for (const file of stats.files.slice(0, 10)) {
      console.log(`  ${chalk.white(file)}`);
    }
    if (stats.files.length > 10) {
      console.log(chalk.gray(`  ... and ${stats.files.length - 10} more`));
    }

    const message = generateMessage(stats);
    console.log(chalk.bold.cyan('\n💬 Suggested Commit Message:\n'));
    console.log(chalk.green(`  ${message}`));
    console.log();
  });

program
  .command('copy')
  .description('Generate and copy commit message to clipboard')
  .option('-s, --staged', 'Use staged changes only', false)
  .action((options) => {
    const diff = getGitDiff(options.staged);

    if (!diff) {
      console.log(chalk.yellow('No changes detected.'));
      return;
    }

    const stats = parseDiff(diff);
    const message = generateMessage(stats);

    try {
      if (process.platform === 'win32') {
        execSync(`echo ${message}| clip`, { encoding: 'utf8' });
      } else if (process.platform === 'darwin') {
        execSync(`echo "${message}" | pbcopy`, { encoding: 'utf8' });
      } else {
        execSync(`echo "${message}" | xclip -selection clipboard`, { encoding: 'utf8' });
      }
      console.log(chalk.green(`✓ Copied to clipboard: ${message}`));
    } catch {
      console.log(chalk.yellow('Could not copy to clipboard. Message:'));
      console.log(chalk.green(message));
    }
  });

program.parse();
