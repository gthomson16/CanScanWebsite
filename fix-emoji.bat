@echo off
echo Fixing emoji rendering and deploying to GitHub Pages...

echo Cleaning up previous build artifacts...
if exist ".next" (
    rmdir /s /q .next
)
if exist "out" (
    rmdir /s /q out
)

echo Building project...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo Error during build process. Aborting deployment.
    exit /b %ERRORLEVEL%
)

echo Deploying to GitHub Pages...
call npm run deploy

if %ERRORLEVEL% neq 0 (
    echo Error during deployment. Please check your git configuration and try again.
    exit /b %ERRORLEVEL%
)

echo Deployment completed successfully!
echo Your website should be available at: https://gthomson16.github.io/CanScanWeb/
echo The emoji rendering issue should now be fixed.
