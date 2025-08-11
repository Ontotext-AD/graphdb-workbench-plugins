import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const schema = require('./plugins-manifest-schema.json');

const ajv = new Ajv();
const validate = ajv.compile(schema);

const manifestPath = './plugins/plugins-manifest.json';

const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

if (!validate(data)) {
  console.error('Manifest validation failed:', validate.errors);
  process.exit(1);
}

// Check for duplicate plugin names
const names = data.plugins.map(p => p.name);
const duplicates = names.filter((name, idx) => names.indexOf(name) !== idx);
if (duplicates.length > 0) {
  console.error('Duplicate plugin names found:', [...new Set(duplicates)]);
  process.exit(1);
}

// Check that each entry points to an existing .js file in plugins folder
const missingFiles = [];
data.plugins.forEach(plugin => {
  const entryPath = path.resolve(process.cwd(), plugin.entry);
  if (!fs.existsSync(entryPath) || path.extname(entryPath) !== '.js') {
    missingFiles.push(plugin);
  }
});
if (missingFiles.length > 0) {
  console.error('Missing or invalid plugin files:', missingFiles);
  process.exit(1);
}

console.log('Manifest is valid.');
