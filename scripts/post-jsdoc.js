import fs from 'fs';
import path from 'path';

const docsPath = path.join(process.cwd(), 'docs');
const docsResourcesPath = path.join(docsPath, 'resources');
const resourcesPath = path.join(process.cwd(), 'resources');

if (!fs.existsSync(docsPath)) {
  console.log('Docs folder not found. Skipping cleaning.');
  process.exit(0);
}

function removeFooterFromHtmlFiles(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Recursively process subdirectories
        removeFooterFromHtmlFiles(filePath);
      } else if (path.extname(file).toLowerCase() === '.html') {
        try {
          let htmlContent = fs.readFileSync(filePath, 'utf8');
          const footerRegex = /<footer[\s\S]*?<\/footer>/i;

          if (footerRegex.test(htmlContent)) {
            htmlContent = htmlContent.replace(footerRegex, '');
            fs.writeFileSync(filePath, htmlContent, 'utf8');
            console.log(`Footer removed from: ${path.relative(docsPath, filePath)}`);
          }
        } catch (fileError) {
          console.error(`Error processing file ${filePath}:`, fileError);
        }
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
}

function copyResources(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`Resources folder "${srcDir}" not found. Skipping copy.`);
    return;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, {recursive: true});
    console.log(`Created resources directory: ${path.relative(docsPath, destDir)}`);
  }

  try {
    const entries = fs.readdirSync(srcDir, {withFileTypes: true});

    entries.forEach((entry) => {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, {recursive: true});
        }
        copyResources(srcPath, destPath); // recursive copy
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${path.relative(docsPath, destPath)}`);
      }
    });
  } catch (error) {
    console.error(`Error copying resources from ${srcDir} to ${destDir}:`, error);
  }
}

try {
  removeFooterFromHtmlFiles(docsPath);
  copyResources(resourcesPath, docsResourcesPath);
  console.log('Document cleaning completed.');
} catch (error) {
  console.error('An error occurred:', error);
  process.exit(1);
}
