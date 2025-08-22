import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'docs', 'index.html');

if (!fs.existsSync(filePath)) {
  console.log('Document file not found. Skipping cleaning.');
  process.exit(0);
}

try {
  let htmlContent = fs.readFileSync(filePath, 'utf8');
  const footerRegex = /<footer[\s\S]*?<\/footer>/i;

  if (footerRegex.test(htmlContent)) {
    htmlContent = htmlContent.replace(footerRegex, '');
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    console.log('Document cleaned.');
  }
} catch (error) {
  console.error('An error occurred:', error);
  process.exit(1);
}
