# CanScan Website Deployment Instructions

## Setup Completed

The website has been configured for GitHub Pages deployment with the following modifications:

1. **Package.json Configuration**:
   - Added deployment scripts for GitHub Pages
   - Set homepage to "https://gthomson16.github.io/CanScanWeb"

2. **Next.js Configuration**:
   - Updated next.config.js for static export
   - Added basePath and assetPrefix for GitHub Pages
   - Configured images for static export

3. **Asset Path Updates**:
   - Updated all image paths to include the basePath
   - Added .nojekyll file to prevent GitHub Jekyll processing

4. **Deployment Scripts**:
   - Created deploy.bat for simple deployment
   - Added README.md with documentation

## Deployment Steps

1. Make sure you have Git credentials configured on your machine.

2. Ensure you have a GitHub repository at: https://github.com/gthomson16/CanScanWeb

3. Run the deployment script:
   ```
   deploy.bat
   ```

4. After deployment completes, verify your site at:
   https://gthomson16.github.io/CanScanWeb/

## Troubleshooting

If you encounter any issues during deployment:

1. **Permission Errors**:
   - Run Command Prompt as Administrator
   - Make sure the .next and out directories can be properly deleted and recreated

2. **Git Authentication Errors**:
   - Ensure your Git credentials are properly set up
   - Try running `git config --global user.email "your@email.com"`
   - Try running `git config --global user.name "Your Name"`

3. **GitHub Pages Not Showing Updates**:
   - Check the GitHub Actions tab in your repository to monitor deployment
   - It may take a few minutes for GitHub to process and publish your site

4. **Image Path Issues**:
   - If images don't load, check the browser console for 404 errors
   - Verify all image paths include `/CanScanWeb/` prefix

## Next Steps

After successful deployment, consider:

1. Setting up a custom domain (via GitHub Pages settings)
2. Setting up GitHub Actions for continuous deployment
3. Adding analytics to monitor site traffic

For any issues, contact the development team or create a new GitHub issue.
