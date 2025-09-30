const DEFAULT_TITLE = 'guide.step_plugin.autocomplete.default.title';

/**
 * @name enable-autocomplete
 * @memberof module:Interactive Guide
 *
 * @description
 * The `enable-autocomplete` guide shows how to use the Autocomplete index view to enable the autocomplete index.
 *
 * The guide consists of the following steps:
 * 1. An introduction to the guide.<br>
 * <img src="resources/guides/autocomplete/autocomplete-intro.png" style="height:200px; border: solid; border-width:1px"/>
 * 2. A step that guides the user to click on the "Setup" main menu.<br>
 * <img src="resources/guides/main-menu/main-menu-setup.png" style="height:200px; border: solid; border-width:1px"/>
 * 3. A step that guides the user to click on the "Autocomplete" sub-menu item.<br>
 * <img src="resources/guides/main-menu/main-menu-autocomplete.png" style="height:200px; border: solid; border-width:1px"/>
 * 4. A step that shows the user how to enable the autocomplete index by clicking a checkbox.<br>
 * <img src="resources/guides/autocomplete/autocomplete-enable-checkbox.png" style="height:200px; border: solid; border-width:1px"/>
 * 5. A step that explains the status of the autocomplete index after it has been enabled.<br>
 * <img src="resources/guides/autocomplete/autocomplete-focus-on-indexing-status.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This guide can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "enable-autocomplete"
 * }
 */
const step = {
  guideBlockName: 'enable-autocomplete',
  getSteps: function(options, services) {
    options.mainAction = 'enable-autocomplete';
    const title = options.title ? options.title : services.translate(this.translationBundle, DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'click-main-menu',
        options: {
          menu: 'autocomplete',
          title,
          showIntro: true,
          ...options
        }
      },
      {
        guideBlockName: 'autocomplete-enable-checkbox',
        options: {
          title,
          ...options
        }
      },
      {
        guideBlockName: 'autocomplete-focus-on-indexing-status',
        options: {
          title,
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Enable autocomplete'
    },
    fr: {
      [DEFAULT_TITLE]: 'Activer la saisie semi-automatique'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
