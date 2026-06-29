const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const DISABLE_TOGGLE = 'guide.step_plugin.iri-discovery-search.disable-toggle';
const ENABLE_TOGGLE = 'guide.step_plugin.iri-discovery-search.enable-toggle';

/**
 * @name configure-iri-discovery-search
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to enable or disable the IRI discovery search feature in the TTYG interface.
 * It highlights the toggle element and provides instructions on how to proceed.
 *
 * Click on the toggle to enable/disable IRI discovery search<br>
 * <img src="resources/guides/ttyg/configure-iri-discovery-search.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally it supports:
 *
 * @property {boolean} options.disable - Set to true to guide the user to disable the IRI discovery search, or false to enable it.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "configure-iri-discovery-search",
 *  "options": {
 *    "disable": true // or false to enable
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'configure-iri-discovery-search',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('iri-discovery-search-input');
    const shouldToggleOff = options.disable;
    const translate = pluginService.translate;

    let content;
    if (shouldToggleOff) {
      content = translate(this.translationBundle, DISABLE_TOGGLE);
    } else {
      content = translate(this.translationBundle, ENABLE_TOGGLE);
    }

    const elementSelector = GuideUtils.getGuideElementSelector('iri-discovery-search');
    return {
      guideBlockName: 'toggle-element',
      options: {
        content,
        class: 'toggle-iri-discovery-search',
        title: translate(this.translationBundle, TTYG_DEFAULT_TITLE),
        ...options,
        url: 'ttyg',
        elementSelector,
        toggleableElementSelector: toggleSelector,
        onNextValidate: () => {
          const isEnabled = GuideUtils.isChecked(toggleSelector);
          return Promise.resolve(shouldToggleOff ? !isEnabled : isEnabled);
        },
        scrollToHandler: () => GuideUtils.scrollIntoView(elementSelector, {block: 'center'})
      }
    };
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [DISABLE_TOGGLE]: 'Click on the toggle to disable Full-text search in labels for IRI discovery.',
      [ENABLE_TOGGLE]: 'Click on the toggle to enable Full-text search in labels for IRI discovery. This method helps the model discover the IRIs for a particular incomplete query when it cannot answer general questions about the dataset on its own.'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [DISABLE_TOGGLE]: 'Cliquez sur le bouton pour désactiver la recherche textuelle complète dans les libellés pour la découverte d\'IRI.',
      [ENABLE_TOGGLE]: 'Cliquez sur le bouton pour activer la recherche textuelle complète dans les libellés pour la découverte d\'IRI. Cette méthode aide le modèle à découvrir les IRI pour une requête incomplète particulière lorsqu\'il ne peut pas répondre aux questions générales sur le jeu de données par lui-même.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
