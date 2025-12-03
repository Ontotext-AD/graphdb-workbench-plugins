const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const CONNECTORS_INTRO_CONTENT = 'guide.step_plugin.connectors-connectors-intro.content';

/**
 * @name connectors-connectors-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the "Connectors" section of the GraphDB Workbench.
 *
 * Connectors introduction<br>
 * <img src="resources/guides/connectors/connectors-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-intro",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-intro',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    return [{
      guideBlockName: 'info-message',
      options: {
        title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE),
        placement: 'top',
        class: 'connectors-connectors-intro',
        content: translate(this.translationBundle, CONNECTORS_INTRO_CONTENT),
        ...options,
        url: 'connectors'
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [CONNECTORS_INTRO_CONTENT]: 'GraphDB Connectors let you integrate external components and services with your repository data. They extend what your applications can do and stay automatically in sync with repository updates.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [CONNECTORS_INTRO_CONTENT]: 'Les connecteurs GraphDB vous permettent d\'intégrer des composants et services externes avec les données de votre référentiel. Ils étendent les capacités de vos applications et restent automatiquement synchronisés avec les mises à jour du référentiel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
