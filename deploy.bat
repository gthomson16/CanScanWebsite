@echo off
echo Starting CanScan Website deployment to GitHub Pages...

:: Remove previous build artifacts to avoid permission issues
echo Cleaning up previous build artifacts...
if exist ".next" (
    rmdir /s /q .next
)
if exist "out" (
    rmdir /s /q out
)

:: Build the project
echo Building project...
call npm run build

:: Check if build was successful
if %ERRORLEVEL% neq 0 (
    echo Error during build process. Aborting deployment.
    exit /b %ERRORLEVEL%
)

:: Deploy to GitHub Pages
echo Deploying to GitHub Pages...
call npm run deploy

if %ERRORLEVEL% neq 0 (
    echo Error during deployment. Please check your git configuration and try again.
    exit /b %ERRORLEVEL%
)

echo Deployment completed successfully!
echo Your website should be available at: https://gthomson16.github.io/CanScanWeb/
