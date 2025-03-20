Write-Host "Starting CanScan Website deployment to GitHub Pages..." -ForegroundColor Green

# Attempt to clean directories with error handling
Write-Host "Cleaning up previous build artifacts..." -ForegroundColor Yellow
try {
    if (Test-Path -Path ".next") {
        # Try to handle locked files with additional force flag
        Remove-Item -Path ".next" -Recurse -Force -ErrorAction Stop
    }
    if (Test-Path -Path "out") {
        Remove-Item -Path "out" -Recurse -Force -ErrorAction Stop
    }
    Write-Host "Clean up successful!" -ForegroundColor Green
} catch {
    Write-Host "Warning: Could not completely clean previous build artifacts. Continuing anyway..." -ForegroundColor Yellow
    Write-Host "Error details: $_" -ForegroundColor Red
}

# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build

# Check if build was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error during build process. Aborting deployment." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Deploy to GitHub Pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Green
npm run deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error during deployment. Please check your git configuration and try again." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "Your website should be available at: https://gthomson16.github.io/CanScanWeb/" -ForegroundColor Green
