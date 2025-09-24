import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, '..');
const pluginsDir = path.join(baseDir, 'plugins', 'guides');

const ignorePaths = ['config.js', 'options.js', 'utils.js'];

// Verified identical translations
const identicalTranslations = [
  "#", "Active", "Action", "Actions", "Agent: {{agentName}}", "BNodes",
  "Base IRI", "ChatGPT Retrieval", "ClientID*", "Cluster", "Cookies",
  "Document", "Documentation", "Description", "Format", "GraphQL",
  "GraphQL Playground", "IRI", "Id", "Local", "Mode", "Pause", "Performance",
  "Plugins", "Port", "ROLE1", "star-wars", "Star Wars", "Secret*", "Signature",
  "Support", "Top P", "Type:", "Type", "type", "Types", "Google Analytics (GA4)",
  "Index",
  "<div><span class=\"graph\">GRAPH</span><span class=\"wise\">WISE</span></div><div class=\"thrives\">AI THRIVES ON WHOLE DATA</div>",
  "fr &middot; Français", "Changer la langue en Français",
  "JSON", "JSON-LD", "NDJSON-LD", "SPARQL", "RDF", "RDF-XML", "JDBC",
  "Turtle", "Turtle*", "TriG", "TriG*", "TriX", "N3", "N-Triples", "N-Quads",
  "Graphdb", "Ontop", "FedX",
  "{{abort}}", "{{progressMessage}}... {{timeHuman}}", "\n{{extraMessage}}",
  "{{n}}/{{nn}}", "{{'ttyg.helpInfo'|translate|trustAsHtml}}",
  "{{'ttyg.help.how.content2'|translate|trustAsHtml}}", "",
  "http://example.com/context.jsonld", "http://example.com/frame.jsonld",
  "http://my-hostname:7200", "node-name:7300"
];

// TO DO translations
const toDoTranslations = [
  "A SPARQL CONSTRUCT query that returns the entire ontology or a subset sufficient to generate useful SPARQL queries.",
  "Account identifier", "Attach a remote GraphDB instance", "Dark", "Datatype",
  "Error retrieving RPC address: {{error}}", "Hit", "HttpPath", "Label IRI",
  "Leader", "Nullable", "Query copied successfully to clipboard.",
  "Saved SPARQL template", "Use <b>View resource</b> on this page",
  "Warehouse", "horizontal"
];

function getAllKeys(obj, valuesObj, prefix = '') {
  return _.flatMap(obj, (value, key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    valuesObj[newPrefix] = value;
    if (_.isObject(value) && !_.isArray(value)) return getAllKeys(value, valuesObj, newPrefix);
    return newPrefix;
  });
}

function hasHtmlTagDifference(en, fr) {
  const tagDiff = (a, b) => _.difference(a?.match(/(<[^<>]+>)/g), b?.match(/(<[^<>]+>)/g));
  if (!en || !fr) return false;
  return !_.isEmpty(tagDiff(en, fr)) || !_.isEmpty(tagDiff(fr, en));
}

function hasPlaceholderDifference(en, fr) {
  const placeholderDiff = (a, b) => _.difference(a?.match(/(\{\{.+?}})/g), b?.match(/(\{\{.+?}})/g));
  if (!en || !fr) return false;
  return !_.isEmpty(placeholderDiff(en, fr)) || !_.isEmpty(placeholderDiff(fr, en));
}

function isUntranslated(en, fr) {
  if (en === fr) {
    const isIdentical = identicalTranslations.includes(en);
    const isTodo = toDoTranslations.includes(en);
    if (isTodo) console.warn("TODO translate: " + en);
    return !isIdentical && !isTodo;
  } else if (toDoTranslations.includes(en)) {
    console.warn(`TODO no longer identical - remove from TODO list: ${en} => ${fr}`);
  }
  return false;
}

function validate(enObj, frObj) {
  const enValues = {}, frValues = {};
  const enKeys = getAllKeys(enObj, enValues);
  const frKeys = getAllKeys(frObj, frValues);

  const missingKeys = _.difference(enKeys, frKeys);
  const obsoleteKeys = _.difference(frKeys, enKeys);
  const htmlTagDifferences = {}, placeholderDifferences = {}, untranslated = {};

  enKeys.forEach(key => {
    const en = enValues[key], fr = frValues[key];
    if (hasHtmlTagDifference(en, fr)) htmlTagDifferences[key] = { en, fr };
    if (hasPlaceholderDifference(en, fr)) placeholderDifferences[key] = { en, fr };
    if (isUntranslated(en, fr)) untranslated[key] = { en, fr };
  });

  return {
    isValid: _.isEmpty(missingKeys) && _.isEmpty(obsoleteKeys) && _.isEmpty(htmlTagDifferences) &&
      _.isEmpty(placeholderDifferences) && _.isEmpty(untranslated),
    missingKeys, obsoleteKeys, htmlTagDifferences, placeholderDifferences, untranslated
  };
}

function getJsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) results = results.concat(getJsFiles(filePath));
    else if (file.endsWith('.js')) results.push(filePath);
  });
  return results;
}

async function loadPluginTranslationBundles() {
  const jsFiles = getJsFiles(pluginsDir);
  const bundles = {};

  for (const filePath of jsFiles) {
    try {
      const relPath = path.relative(pluginsDir, filePath);
      if (ignorePaths.includes(relPath)) continue;

      const pluginModule = await import(`file://${filePath}`);
      if (!pluginModule.register) {
        console.warn(`Plugin ${relPath} does not export 'register' function`);
        continue;
      }

      const registry = { map: {}, add(type, step) { this.map[type + ':' + step.guideBlockName] = step; } };
      pluginModule.register(registry);

      const steps = Object.values(registry.map);
      if (steps.length === 0) console.warn(`Plugin ${relPath} registered no steps`);

      const fileBundles = {};
      steps.forEach(step => {
        const bundle = step.translationBundle;
        if (!bundle) return;
        Object.entries(bundle).forEach(([lang, content]) => {
          fileBundles[lang] = fileBundles[lang] || {};
          const flat = {};
          getAllKeys(content, flat);
          fileBundles[lang] = { ...fileBundles[lang], ...flat };
        });
      });

      bundles[relPath] = fileBundles;

    } catch (e) {
      console.error(`Failed to load plugin file ${filePath}:`, e.message);
    }
  }

  return bundles;
}

async function main() {
  const bundles = await loadPluginTranslationBundles();
  const reports = {};
  let hasErrors = false;

  for (const [filePath, fileBundles] of Object.entries(bundles)) {
    const enBundle = fileBundles['en'] || {};
    for (const [lang, bundle] of Object.entries(fileBundles)) {
      if (lang === 'en') continue;
      const res = validate(enBundle, bundle);

      Object.entries(res).forEach(([type, data]) => {
        if (type === 'isValid' || _.isEmpty(data)) return;
        hasErrors = true;

        reports[filePath] = reports[filePath] || {};
        reports[filePath][lang] = reports[filePath][lang] || {};

        if (Array.isArray(data)) {
          reports[filePath][lang][type] = data;
        } else {
          reports[filePath][lang][type] = data;
        }
      });
    }
  }

  const reportPath = path.join(baseDir, 'guide-translation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2));

  if (hasErrors) {
    console.error(`Issues found. See ${JSON.stringify(reports, null, 2)}`);
    process.exit(1);
  } else {
    console.info('All plugin translations are valid.');
    process.exit(0);
  }
}

if (process.argv[1].endsWith('validate-guides-translations.mjs')) {
  console.info(`Using baseDir: ${baseDir}`);
  main();
}

export {
  getAllKeys,
  hasHtmlTagDifference,
  hasPlaceholderDifference,
  isUntranslated,
  validate,
  loadPluginTranslationBundles
};
