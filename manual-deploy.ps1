Write-Host "Starting manual deployment for canscanapp.ca..." -ForegroundColor Green

# Navigate to the project directory
cd "C:\Development\CanScan\CanScanWebsite"

# Ensure output directory exists
Remove-Item -Path "out" -Recurse -Force -ErrorAction SilentlyContinue

# Build the project
Write-Host "Building project..." -ForegroundColor Green
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error during build process. Aborting deployment." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Create a temporary directory for deployment
$tempDir = "C:\Development\CanScan\CanScanWebsite\temp-deploy"
$repoDir = "C:\Development\CanScan\CanScanWebsite\temp-repo"

# Create and prepare the temporary directory
if (Test-Path -Path $tempDir) {
    Remove-Item -Path $tempDir -Recurse -Force
}
New-Item -Path $tempDir -ItemType Directory

# Copy the build files to the temporary directory
Copy-Item -Path "out\*" -Destination $tempDir -Recurse

# Clone the repository
if (Test-Path -Path $repoDir) {
    Remove-Item -Path $repoDir -Recurse -Force
}
New-Item -Path $repoDir -ItemType Directory
cd $repoDir

Write-Host "Cloning repository..." -ForegroundColor Green
git clone https://github.com/gthomson16/CanScanWeb.git -b gh-pages .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error cloning repository. Aborting deployment." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Remove all files except .git directory
Get-ChildItem -Path $repoDir -Exclude .git | Remove-Item -Recurse -Force

# Copy the new build files
Copy-Item -Path "$tempDir\*" -Destination $repoDir -Recurse

# Commit and push changes
Write-Host "Committing and pushing changes..." -ForegroundColor Green
git add .
git commit -m "Update website for canscanapp.ca custom domain"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error committing changes. Aborting deployment." -ForegroundColor Red
    exit $LASTEXITCODE
}

git push origin gh-pages

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error pushing changes. Check your Git credentials." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Clean up
Write-Host "Cleaning up..." -ForegroundColor Green
cd "C:\Development\CanScan\CanScanWebsite"
Remove-Item -Path $tempDir -Recurse -Force
Remove-Item -Path $repoDir -Recurse -Force

Write-Host "Deployment completed successfully!" -ForegroundColor Green
Write-Host "Your website should be available at https://canscanapp.ca once DNS propagates" -ForegroundColor Green
