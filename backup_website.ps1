# PowerShell Script to backup CanScan Website without dependencies

# Define the source directory (your CanScan website)
$SourceDir = "C:\Development\CanScan\CanScanWebsite"

# Create a timestamp for the backup folder (format: YYYY-MM-DD_HH-MM-SS)
$Timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

# Define the backup destination
$BackupDir = "C:\Development\CanScan\Backups\Website\$Timestamp"

# Create the backup directory
Write-Host "Creating backup directory: $BackupDir"
New-Item -Path $BackupDir -ItemType Directory -Force | Out-Null

# Define directories to backup (directly from the source root)
$DirsToBackup = @("app", "components", "public")

# Define config files to backup (directly from the source root)
$FilesToBackup = @(
    "next.config.js",
    "package.json",
    "package-lock.json",
    "postcss.config.js",
    "tailwind.config.js",
    "tsconfig.json",
    "next-env.d.ts"
)

# Backup directories
foreach ($dir in $DirsToBackup) {
    $sourceDir = Join-Path -Path $SourceDir -ChildPath $dir
    $destDir = Join-Path -Path $BackupDir -ChildPath $dir
    
    Write-Host "Backing up $dir directory..."
    if (Test-Path $sourceDir) {
        # Skip node_modules and .next directories
        robocopy "$sourceDir" "$destDir" /E /XD "node_modules" ".next" /NFL /NDL /NJH /NJS /nc /ns /np
        if ($LASTEXITCODE -lt 8) { 
            Write-Host "  Copied successfully: $dir" -ForegroundColor Green
        } else {
            Write-Warning "  Issues copying: $dir (Code: $LASTEXITCODE)"
        }
    } else {
        Write-Warning "Directory not found: $sourceDir"
    }
}

# Backup configuration files
Write-Host "Backing up configuration files..."
foreach ($file in $FilesToBackup) {
    $sourceFile = Join-Path -Path $SourceDir -ChildPath $file
    $destFile = Join-Path -Path $BackupDir -ChildPath $file
    
    if (Test-Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $destFile -Force
        Write-Host "  Copied: $file" -ForegroundColor Green
    } else {
        Write-Warning "  File not found: $sourceFile"
    }
}

# Create a backup info file
$backupInfo = @"
Backup created on $(Get-Date)
Source: $SourceDir
"@
$backupInfo | Out-File -FilePath (Join-Path -Path $BackupDir -ChildPath "backup_info.txt")

Write-Host "`nBackup completed successfully!" -ForegroundColor Green
Write-Host "Backup location: $BackupDir"

# List the backup directory contents
Get-ChildItem -Path $BackupDir -Recurse | Measure-Object | ForEach-Object {
    Write-Host "Total files backed up: $($_.Count)"
}

# Open the backup directory in File Explorer
# explorer $BackupDir
