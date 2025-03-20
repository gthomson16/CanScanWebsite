@echo off
setlocal EnableDelayedExpansion

:: Define the source directory (CanScan website)
set SourceDir=C:\Development\CanScan\CanScanWebsite

:: Create a timestamp for the backup folder using WMIC
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
set hour=%datetime:~8,2%
set minute=%datetime:~10,2%
set second=%datetime:~12,2%

set Timestamp=%year%-%month%-%day%_%hour%-%minute%-%second%

:: Define the backup destination
set BackupDir=C:\Development\CanScan\Backups\Website\%Timestamp%

:: Create the backup directory
echo Creating backup directory: %BackupDir%
mkdir "%BackupDir%"

:: Backup app directory
echo Backing up app directory...
if exist "%SourceDir%\app" (
    robocopy "%SourceDir%\app" "%BackupDir%\app" /E /NFL /NDL /NJH /NJS /nc /ns /np
    echo   Copied successfully: app
) else (
    echo WARNING: Directory not found: %SourceDir%\app
)

:: Backup components directory
echo Backing up components directory...
if exist "%SourceDir%\components" (
    robocopy "%SourceDir%\components" "%BackupDir%\components" /E /NFL /NDL /NJH /NJS /nc /ns /np
    echo   Copied successfully: components
) else (
    echo WARNING: Directory not found: %SourceDir%\components
)

:: Backup public directory
echo Backing up public directory...
if exist "%SourceDir%\public" (
    robocopy "%SourceDir%\public" "%BackupDir%\public" /E /NFL /NDL /NJH /NJS /nc /ns /np
    echo   Copied successfully: public
) else (
    echo WARNING: Directory not found: %SourceDir%\public
)

:: Backup configuration files
echo Backing up configuration files...
if exist "%SourceDir%\next.config.js" (
    copy "%SourceDir%\next.config.js" "%BackupDir%\" >nul
    echo   Copied: next.config.js
) else (
    echo WARNING:   File not found: %SourceDir%\next.config.js
)

if exist "%SourceDir%\package.json" (
    copy "%SourceDir%\package.json" "%BackupDir%\" >nul
    echo   Copied: package.json
) else (
    echo WARNING:   File not found: %SourceDir%\package.json
)

if exist "%SourceDir%\package-lock.json" (
    copy "%SourceDir%\package-lock.json" "%BackupDir%\" >nul
    echo   Copied: package-lock.json
) else (
    echo WARNING:   File not found: %SourceDir%\package-lock.json
)

if exist "%SourceDir%\postcss.config.js" (
    copy "%SourceDir%\postcss.config.js" "%BackupDir%\" >nul
    echo   Copied: postcss.config.js
) else (
    echo WARNING:   File not found: %SourceDir%\postcss.config.js
)

if exist "%SourceDir%\tailwind.config.js" (
    copy "%SourceDir%\tailwind.config.js" "%BackupDir%\" >nul
    echo   Copied: tailwind.config.js
) else (
    echo WARNING:   File not found: %SourceDir%\tailwind.config.js
)

if exist "%SourceDir%\tsconfig.json" (
    copy "%SourceDir%\tsconfig.json" "%BackupDir%\" >nul
    echo   Copied: tsconfig.json
) else (
    echo WARNING:   File not found: %SourceDir%\tsconfig.json
)

if exist "%SourceDir%\next-env.d.ts" (
    copy "%SourceDir%\next-env.d.ts" "%BackupDir%\" >nul
    echo   Copied: next-env.d.ts
) else (
    echo WARNING:   File not found: %SourceDir%\next-env.d.ts
)

:: Create a backup info file
echo Backup created on %date% %time% > "%BackupDir%\backup_info.txt"
echo Source: %SourceDir% >> "%BackupDir%\backup_info.txt"

echo.
echo Backup completed successfully!
echo Backup location: %BackupDir%

:: Count total files backed up
set count=0
for /r "%BackupDir%" %%f in (*) do set /a count+=1
echo Total files backed up: %count%

:: Removed the line that opens Explorer
