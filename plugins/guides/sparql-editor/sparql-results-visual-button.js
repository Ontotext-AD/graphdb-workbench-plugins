const SPARQL_EDITOR_TITLE = 'view.sparql-editor.title';
const SPARQL_RESULT_CONTENT = 'guide.step_plugin.execute-sparql-query.visual-sparql-results.content';

/**
 * @name sparql-results-visual-button
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on the button that allows users to visualize the results of a SPARQL query.
 *
 * Clicking on the button<br>
 * <img src="resources/guides/sparql-editor/sparql-results-visual-button.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "sparql-results-visual-button"
 * }
 * ```
 */
const step = {
  guideBlockName: 'sparql-results-visual-button',
  getSteps: function(options, services) {
    const translate = services.translate;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, SPARQL_RESULT_CONTENT),
          title: translate(this.translationBundle, SPARQL_EDITOR_TITLE),
          url: 'sparql',
          elementSelector: services.GuideUtils.CSS_SELECTORS.SPARQL_VISUAL_BUTTON_SELECTOR,
          class: 'visual-sparql-results-button',
          scrollToHandler: services.GuideUtils.scrollToTop,
          onNextClick: () => services.GuideUtils.clickOnElement(services.GuideUtils.CSS_SELECTORS.SPARQL_VISUAL_BUTTON_SELECTOR)(),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SPARQL_EDITOR_TITLE]: 'SPARQL Query & Update',
      [SPARQL_RESULT_CONTENT]: 'Click on the <b>Visual</b> button.'
    },
    fr: {
      [SPARQL_EDITOR_TITLE]: 'Requête et mise à jour SPARQL',
      [SPARQL_RESULT_CONTENT]: 'Cliquez sur le bouton <b>Visualiser</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
