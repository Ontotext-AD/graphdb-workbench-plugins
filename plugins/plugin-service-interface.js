/**
 * Interface for plugin-related services that can be used across all steps.
 *
 * This service is provided by the plugin system and must be used by plugins to interact with the application.
 */
export class PluginServiceInterface {
  /**
   * Translates a key into the target locale using the translation functionality provided by the plugin client.
   * The returned string is based on the language selected in the client. Falls back to the key itself if no translation is found.
   *
   * @param {Object<string, Object<string, string>>} _translationBundle -
   *   A translation bundle organized by locale. Each locale maps to an object of translation keys and their localized strings.
   *   Example:
   *   ```js
   *   {
   *     en: {
   *       "guide.step_plugin.welcome.title": "Welcome to {{translatedGuideName}}",
   *       "guide.step_plugin.welcome.content": "Throughout the guide you will see boxes like this..."
   *     },
   *     fr: {
   *       "guide.step_plugin.welcome.title": "Bienvenue dans {{translatedGuideName}}",
   *       "guide.step_plugin.welcome.content": "Tout au long du guide, vous verrez des boîtes comme celle-ci..."
   *     }
   *   }
   *   ```
   * @param {string} _translationKey - The translation key to look up.
   * @param {Object<string, string>} _translationParameters - Optional parameters to interpolate into the translation string
   *   (e.g., `{ username: "John" }`).
   * @returns {string} The translated string, or the key if no translation is available.
   */
  translate(_translationBundle = {}, _translationKey = '', _translationParameters = {}) {}
}
