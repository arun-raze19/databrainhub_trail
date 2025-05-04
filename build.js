// Custom build script to ensure proper file handling
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Run the Vite build
console.log('Running Vite build...');
execSync('vite build', { stdio: 'inherit' });

// Copy static-fallback.html to dist without overwriting index.html
console.log('Copying static-fallback.html to dist...');
fs.copyFileSync(
  path.resolve(__dirname, 'static-fallback.html'),
  path.resolve(__dirname, 'dist/static-fallback.html')
);

// Always replace the index.html with our custom version
const indexPath = path.resolve(__dirname, 'dist/index.html');

// Get the list of asset files
const assetDir = path.resolve(__dirname, 'dist/assets');
const files = fs.readdirSync(assetDir);

// Find the CSS and JS files
const cssFile = files.find(file => file.endsWith('.css'));
const mainJsFile = files.find(file => file.endsWith('.js') && file.includes('main-'));
const vendorJsFile = files.find(file => file.includes('vendor-') && file.endsWith('.js'));

console.log('Creating a proper index.html with the React app...');

// Create a proper index.html with the React app
const correctIndexContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/brainwave-symbol-BpglIlwE.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="DataBrainHub - Your Data Science Platform" />
    <title>DataBrainHub</title>
    <style>
      /* Basic styles that will be visible even if CSS fails to load */
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #0e0c15;
        color: #fff;
      }
      .fallback-container {
        display: none;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
        text-align: center;
      }
      .fallback-title {
        font-size: 2.5rem;
        color: #AC6AFF;
        margin-bottom: 20px;
      }
      .fallback-subtitle {
        font-size: 1.5rem;
        color: #FFC876;
        margin-bottom: 30px;
      }
      .fallback-button {
        display: inline-block;
        padding: 12px 24px;
        background: linear-gradient(90deg, #AC6AFF, #FF98E2);
        color: white;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;
      }
    </style>
    <script>
      // Add error handling for script loading
      window.addEventListener('error', function(e) {
        console.error('Script loading error:', e);
        // Show fallback content if there's an error loading the main script
        setTimeout(function() {
          var root = document.getElementById('root');
          if (root && !root.hasChildNodes()) {
            document.getElementById('fallback-content').style.display = 'block';
          }
        }, 3000); // Wait 3 seconds to check if the app loaded
      });

      // Also check if the app fails to load after a timeout
      setTimeout(function() {
        var root = document.getElementById('root');
        if (root && !root.hasChildNodes()) {
          document.getElementById('fallback-content').style.display = 'block';
        }
      }, 5000); // Wait 5 seconds to check if the app loaded
    </script>
    <link rel="stylesheet" href="/assets/${cssFile}">
  </head>
  <body>
    <div id="root"></div>

    <!-- Fallback content that will be shown if the React app fails to load -->
    <div id="fallback-content" class="fallback-container">
      <h1 class="fallback-title">DataBrainHub</h1>
      <h2 class="fallback-subtitle">Your Data Science Platform</h2>
      <p>Centralized Resource Sharing, Cloud Storage Integration, and Seamless Integration</p>
      <a href="/static-fallback.html" class="fallback-button">View Full Site</a>
    </div>

    <script type="module" src="/assets/${vendorJsFile}"></script>
    <script type="module" src="/assets/${mainJsFile}"></script>

    <!-- Inline script as a last resort -->
    <script>
      // This will run even if the module script fails
      console.log('DataBrainHub is initializing...');
    </script>
  </body>
</html>`;

fs.writeFileSync(indexPath, correctIndexContent);
console.log('Index.html has been created with the correct React app structure.');

console.log('Build completed successfully!');
