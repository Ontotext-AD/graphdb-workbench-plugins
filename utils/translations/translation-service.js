import en from './i18n/locale-en.json';
import fr from './i18n/locale-fr.json';

/**
 * TranslationService provides translation capabilities.
 */
class TranslationService {
  static DEFAULT_LANG = 'en';

  static bundle = {
    en,
    fr
  };

  // Singleton instance holder
  static _instance;

  constructor() {
    if (TranslationService._instance) {
      return TranslationService._instance;
    }
    TranslationService._instance = this;
  }

  /**
   * Get the singleton instance of TranslationService.
   *
   * @returns {TranslationService} The TranslationService instance.
   */
  static getInstance() {
    if (!TranslationService._instance) {
      TranslationService._instance = new TranslationService();
    }
    return TranslationService._instance;
  }

  /**
   * Translate a key into the given locale. Falls back to the default language if missing.
   *
   * @param {string} locale - The target language (e.g. 'en', 'fr').
   * @param {string} key - The translation key to look up.
   * @param {Object<string, string>} [parameters={}] - Optional parameters for substitution.
   * @returns {string} The translated string, or the key if missing.
   */
  translate(locale, key, parameters = {}) {
    let translation = TranslationService.bundle[locale]?.[key];

    if (!translation) {
      // Fallback to the default language
      translation = TranslationService.bundle[TranslationService.DEFAULT_LANG]?.[key];
    }

    if (translation) {
      return this.applyParameters(translation, parameters);
    }

    // eslint-disable-next-line no-console
    console.warn(`Missing translation for [${key}] key in [${locale}] locale`);
    return key;
  }

  /**
   * Replace placeholders in the translation string with given parameters.
   *
   * Example: 'Hello {{name}}' + { name: 'Alice' } → 'Hello Alice'
   *
   * @param {string} translation - The translation string with placeholders.
   * @param {Object<string, string>} parameters - The parameters to replace.
   * @returns {string} The translation with parameters applied.
   */
  applyParameters(translation, parameters = {}) {
    return Object.entries(parameters).reduce(
      (result, [paramKey, paramValue]) => this.replaceAll(result, paramKey, paramValue),
      translation
    );
  }

  /**
   * Replace all occurrences of a single parameter placeholder in the translation.
   *
   * @param {string} translation - The translation string.
   * @param {string} key - The placeholder key to replace.
   * @param {string} value - The value to replace it with.
   * @returns {string} The updated translation string.
   */
  replaceAll(translation, key, value) {
    return translation.split(`{{${key}}}`).join(value);
  }
}

const translationInstance = TranslationService.getInstance();
export const translate = translationInstance.translate.bind(translationInstance);

