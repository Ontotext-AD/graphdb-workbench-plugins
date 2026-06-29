const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const DISABLE_TOGGLE = 'guide.step_plugin.autocomplete.iri-discovery.disable-toggle';
const ENABLE_TOGGLE = 'guide.step_plugin.autocomplete.iri-discovery.enable-toggle';

/**
 * @name configure-autocomplete-iri-discovery
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enable or disable the autocomplete IRI discovery feature in the TTYG interface.
 * It highlights the toggle element and provides instructions on how to proceed.
 *
 * Click on the toggle to enable/disable autocomplete for IRI discovery<br>
 * <img src="resources/guides/ttyg/configure-autocomplete-iri-discovery.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 *
 * @property {boolean} [options.disable] - Set to true to guide the user to disable the IRI discovery search, or false to enable it.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "configure-autocomplete-iri-discovery",
 *  "options": {
 *    "disable": true // or false to enable
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'configure-autocomplete-iri-discovery',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('autocomplete-iri-discovery-input');
    const shouldToggleOff = options.disable;
    const translate = pluginService.translate;

    let content;
    if (shouldToggleOff) {
      content = translate(this.translationBundle, DISABLE_TOGGLE);
    } else {
      content = translate(this.translationBundle, ENABLE_TOGGLE);
    }

    return {
      guideBlockName: 'toggle-element',
      options: {
        content,
        class: 'toggle-autocomplete-iri-discovery',
        title: translate(this.translationBundle, TTYG_DEFAULT_TITLE),
        ...options,
        url: 'ttyg',
        elementSelector: GuideUtils.getGuideElementSelector('autocomplete-iri-discovery'),
        toggleableElementSelector: toggleSelector,
        onNextValidate: () => {
          const isEnabled = GuideUtils.isChecked(toggleSelector);
          return Promise.resolve(shouldToggleOff ? !isEnabled : isEnabled);
        }
      }
    };
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [DISABLE_TOGGLE]: 'Click on the toggle to disable <b>Autocomplete for IRI discovery</b>.',
      [ENABLE_TOGGLE]: 'Click on the toggle to enable <b>Autocomplete for IRI discovery</b>. This method helps the model discover relevant IRIs when a query contains incomplete names or references and cannot be resolved directly.'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [DISABLE_TOGGLE]: 'Cliquez sur le bouton pour désactiver l\'<b>Autocomplétion pour la découverte d\'IRI</b>.',
      [ENABLE_TOGGLE]: 'Cliquez sur le bouton pour activer l\'<b>Autocomplétion pour la découverte d\'IRI</b>. Cette méthode aide le modèle à découvrir les IRI pertinents lorsqu\'une requête contient des noms ou des références incomplets et ne peut pas être résolue directement.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
