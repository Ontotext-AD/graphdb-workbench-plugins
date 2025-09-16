const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// Change this to the folder you want to validate
const i18nDir = path.resolve(__dirname, '..', 'utils', 'translations', 'i18n');
const localeRegex = /^(?:locale-)?([a-z]{2})\.json$/;

// Verified identical translations - no warnings or errors about them
const identicalTranslations = [
  "Active",
  "Action",
  "Actions",
  "Agent: {{agentName}}",
  "GraphQL",
  "Mode",
  "Type",
  "Types",
  "JSON",
  "Turtle",
  "SPARQL",
  "N-Triples"
];

// Unverified identical or TODO translations - printed as warnings
const toDoTranslations = [
  "Dark",
  "Nullable",
  "Label IRI",
  "Warehouse",
  "horizontal"
];

/**
 * Recursively collect all keys and values from a nested object.
 */
function getAllKeys(obj, valuesObj, prefix = '') {
  return _.flatMap(obj, (value, key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    valuesObj[newPrefix] = value;
    if (_.isObject(value) && !_.isArray(value)) {
      return getAllKeys(value, valuesObj, newPrefix);
    }
    return newPrefix;
  });
}

/**
 * Detect differences in HTML tags between two strings.
 */
function hasHtmlTagDifference(en, fr) {
  function tagDiff(a, b) {
    const re = /(<[^<>]+>)/g;
    return _.difference(a.match(re), b.match(re));
  }
  if (!en || !fr) return false;
  return !_.isEmpty(tagDiff(en, fr)) || !_.isEmpty(tagDiff(fr, en));
}

/**
 * Detect differences in placeholders like {{…}} between two strings.
 */
function hasPlaceholderDifference(en, fr) {
  function placeholderDiff(a, b) {
    const re = /(\{\{.+?}})/g;
    return _.difference(a.match(re), b.match(re));
  }
  if (!en || !fr) return false;
  return !_.isEmpty(placeholderDiff(en, fr)) || !_.isEmpty(placeholderDiff(fr, en));
}

/**
 * Determine if a translation is untranslated (identical to English and not in identical/TODO lists).
 */
function isUntranslated(en, fr) {
  if (en === fr) {
    const isIdentical = identicalTranslations.includes(en);
    const isTodo = toDoTranslations.includes(en);
    if (isTodo) {
      console.warn("TODO translate: " + en);
    }
    return !isIdentical && !isTodo;
  } else if (toDoTranslations.includes(en)) {
    console.warn("TODO no longer identical - remove from TODO list: " + en + " => " + fr);
  }
  return false;
}

/**
 * Validate a translation bundle against English.
 */
function validate(enObj, frObj) {
  function compare(en, fr, fn) {
    if (fn(en, fr)) {
      return { en, fr };
    }
  }

  const enValues = {};
  const enKeys = getAllKeys(enObj, enValues);
  const frValues = {};
  const frKeys = getAllKeys(frObj, frValues);

  const missingKeys = _.difference(enKeys, frKeys);
  const obsoleteKeys = _.difference(frKeys, enKeys);

  const htmlTagDifferences = {};
  const placeholderDifferences = {};
  const untranslated = {};

  enKeys.forEach((key) => {
    const en = enValues[key];
    const fr = frValues[key];

    const htmlDiff = compare(en, fr, hasHtmlTagDifference);
    if (htmlDiff) {
      htmlTagDifferences[key] = htmlDiff;
    }
    const pDiff = compare(en, fr, hasPlaceholderDifference);
    if (pDiff) {
      placeholderDifferences[key] = pDiff;
    }
    const untranslatedKey = compare(en, fr, isUntranslated);
    if (untranslatedKey) {
      untranslated[key] = untranslatedKey;
    }
  });

  const isValid =
    _.isEmpty(missingKeys) &&
    _.isEmpty(obsoleteKeys) &&
    _.isEmpty(htmlTagDifferences) &&
    _.isEmpty(placeholderDifferences) &&
    _.isEmpty(untranslated);

  return {
    isValid,
    missingKeys,
    obsoleteKeys,
    htmlTagDifferences,
    placeholderDifferences,
    untranslated
  };
}

function loadTranslations() {
  const bundles = {};
  fs.readdirSync(i18nDir).forEach(file => {
    const match = file.match(localeRegex);
    if (!match) return;
    const lang = match[1];
    const content = JSON.parse(fs.readFileSync(path.join(i18nDir, file), 'utf8'));
    bundles[lang] = content;
  });
  return bundles;
}

function main() {
  const bundles = loadTranslations();
  const enBundle = bundles['en'] || {};

  let hasErrors = false;

  Object.entries(bundles).forEach(([lang, bundle]) => {
    if (lang === 'en') return;

    const res = validate(enBundle, bundle);
    Object.entries(res).forEach(([type, data]) => {
      if (type === 'isValid' || _.isEmpty(data)) return;

      hasErrors = true;
      console.error(`\n[${lang}] ${type}:`);
      console.error(JSON.stringify(data, null, 2));
    });
  });

  if (hasErrors) {
    console.error('Issues found in translations.');
    process.exit(1);
  } else {
    console.info('All translations are valid.');
    process.exit(0);
  }
}

if (require.main === module) {
  console.info(`Validating translations in: ${i18nDir}`);
  main();
}

module.exports = {
  getAllKeys,
  hasHtmlTagDifference,
  hasPlaceholderDifference,
  isUntranslated,
  validate,
  loadTranslations,
};
