import fs from 'fs';
import path from 'path';

const docsPath = path.join(process.cwd(), 'docs');

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

try {
  removeFooterFromHtmlFiles(docsPath);
  console.log('Document cleaning completed.');
} catch (error) {
  console.error('An error occurred:', error);
  process.exit(1);
}
