#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process'); // To potentially use robocopy if needed, or for timestamp

// --- Configuration ---
const sourceDir = 'c:/Development/CanScan/CanScanWebsite'; // Use forward slashes for better cross-platform compatibility in Node
const baseBackupDir = 'c:/Development/CanScan/Backups/Website';

// --- Helper Functions ---

// Function to format date components with leading zeros
const padZero = (num) => num.toString().padStart(2, '0');

// Function to get timestamp string (YYYY-MM-DD_HH-MM-SS)
const getTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = padZero(now.getMonth() + 1); // Months are 0-indexed
  const day = padZero(now.getDate());
  const hour = padZero(now.getHours());
  const minute = padZero(now.getMinutes());
  const second = padZero(now.getSeconds());
  return `${year}-${month}-${day}_${hour}-${minute}-${second}`;
};

// Simple recursive copy function (alternative to fs.cp for broader Node compatibility)
// More robust than simple copy, handles directories. fs.cp is preferred if Node version >= 16.7.0
async function copyRecursive(src, dest) {
  try {
    const stats = await fs.stat(src);
    const isDirectory = stats.isDirectory();

    if (isDirectory) {
      await fs.mkdir(dest, { recursive: true });
      const entries = await fs.readdir(src, { withFileTypes: true });
      for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          await copyRecursive(srcPath, destPath);
        } else {
          await fs.copyFile(srcPath, destPath);
        }
      }
    } else {
      await fs.copyFile(src, dest);
    }
  } catch (err) {
    // Don't throw if source doesn't exist, similar to batch script's 'if exist'
    if (err.code === 'ENOENT') {
      console.warn(`WARNING: Source not found, skipping: ${src}`);
    } else {
      console.error(`Error copying ${src} to ${dest}:`, err);
      throw err; // Re-throw other errors
    }
  }
}

// Function to copy individual files, checking existence first
async function copyFileIfExist(src, destDir, fileName) {
  const srcPath = path.join(src, fileName);
  const destPath = path.join(destDir, fileName);
  try {
    await fs.access(srcPath); // Check if source exists
    await fs.copyFile(srcPath, destPath);
    console.log(`  Copied: ${fileName}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`WARNING: File not found: ${srcPath}`);
    } else {
      console.error(`Error copying ${fileName}:`, err);
      throw err; // Re-throw other errors
    }
  }
}

// Function to count files recursively
async function countFiles(dir) {
    let count = 0;
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                count += await countFiles(fullPath);
            } else {
                count++;
            }
        }
    } catch (err) {
        console.error(`Error counting files in ${dir}:`, err);
    }
    return count;
}


// --- Main Backup Logic ---
async function runBackup() {
  console.log('Starting backup process...');

  const timestamp = getTimestamp();
  const backupDir = path.join(baseBackupDir, timestamp);

  try {
    // Create the backup directory
    console.log(`Creating backup directory: ${backupDir}`);
    await fs.mkdir(backupDir, { recursive: true }); // recursive: true is like mkdir -p

    // Backup directories using recursive copy
    const dirsToBackup = ['app', 'components', 'public', 'messages', 'lib', 'hooks']; // Added lib and hooks
    console.log('Backing up directories...');
    for (const dir of dirsToBackup) {
      const sourcePath = path.join(sourceDir, dir);
      const destPath = path.join(backupDir, dir);
      console.log(`Backing up ${dir}...`);
      // Using fs.cp if available (Node >= 16.7.0), otherwise fallback
      if (fs.cp) {
         try {
            await fs.cp(sourcePath, destPath, { recursive: true, errorOnExist: false, force: true });
            console.log(`  Copied successfully: ${dir}`);
         } catch (err) {
             if (err.code === 'ENOENT') {
                 console.warn(`WARNING: Directory not found: ${sourcePath}`);
             } else {
                 throw err;
             }
         }
      } else {
          await copyRecursive(sourcePath, destPath); // Fallback for older Node versions
          // Note: copyRecursive includes its own existence check/warning
          console.log(`  Finished copying attempt for: ${dir}`); // Adjusted log for fallback
      }
    }


    // Backup individual configuration files
    console.log('Backing up configuration files...');
    const filesToBackup = [
      '.eslintrc.json',
      '.gitignore',
      'i18n.ts',
      'middleware.ts',
      'next.config.js',
      'package.json',
      'package-lock.json',
      'postcss.config.js',
      'README.md',
      'tailwind.config.js',
      'tsconfig.json',
      // 'next-env.d.ts' // This is often generated, maybe skip? Included in bat script though.
      // Add any other specific files here
    ];
    for (const file of filesToBackup) {
      await copyFileIfExist(sourceDir, backupDir, file);
    }

    // Create a backup info file
    const backupInfoContent = `Backup created on ${new Date().toString()}\nSource: ${sourceDir}\n`;
    await fs.writeFile(path.join(backupDir, 'backup_info.txt'), backupInfoContent);

    console.log('\nBackup completed successfully!');
    console.log(`Backup location: ${backupDir}`);

    // Count total files backed up
    const totalFiles = await countFiles(backupDir);
    console.log(`Total files backed up: ${totalFiles}`);

  } catch (error) {
    console.error('\nBackup process failed:');
    console.error(error);
    process.exitCode = 1; // Indicate failure
  }
}

runBackup();
