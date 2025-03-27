@echo off
echo Starting manual deployment for canscanapp.ca...

:: Build the project
echo Building project...
call npm run build

:: Check if build was successful
if %ERRORLEVEL% neq 0 (
    echo Error during build process. Aborting deployment.
    exit /b %ERRORLEVEL%
)

:: Prepare the out directory
echo Copying build output to deploy directory...
mkdir deploy-temp 2>nul
xcopy /E /Y out\* deploy-temp\

:: Add CNAME file for custom domain
echo canscanapp.ca > deploy-temp\CNAME

:: Create a README for the repository
echo # CanScan Website > deploy-temp\README.md
echo This repository contains the deployed version of the CanScan website. >> deploy-temp\README.md
echo Visit: https://canscanapp.ca >> deploy-temp\README.md

echo.
echo Build complete and ready for manual deployment!
echo Please upload all files from the 'deploy-temp' folder to your hosting service or GitHub Pages repository.
echo.