@echo off
echo Starting manual deployment to GitHub Pages...

:: Clean previous build
echo Cleaning previous builds...
if exist "out" (
    rmdir /s /q out
)
if exist ".next" (
    rmdir /s /q .next
)

:: Build the project
echo Building the project...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo Error during build process. Aborting deployment.
    exit /b %ERRORLEVEL%
)

:: Create temporary deploy directory
echo Creating temporary deployment folder...
set DEPLOY_DIR=deploy_temp
if exist "%DEPLOY_DIR%" (
    rmdir /s /q %DEPLOY_DIR%
)
mkdir %DEPLOY_DIR%

:: Copy the output to the deploy directory
echo Copying output files...
xcopy "out\*" "%DEPLOY_DIR%\" /E /I /H /Y

:: Initialize git in the deploy directory
echo Initializing Git repository in deployment folder...
cd %DEPLOY_DIR%
git init
git add .
git commit -m "Deploy to GitHub Pages"

:: Add GitHub remote and push
echo Pushing to GitHub Pages...
git remote add origin https://github.com/gthomson16/CanScanWeb.git
git branch -M gh-pages
git push -f origin gh-pages

:: Clean up
echo Cleaning up...
cd ..
rmdir /s /q %DEPLOY_DIR%

echo Deployment completed!
echo Your website should be available at: https://gthomson16.github.io/CanScanWeb/
