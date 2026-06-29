const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const CLOSE_VIEW_SPARQL_DIALOG = 'guide.step_plugin.connectors-close-view-sparql-query-dialog.content';

/**
 * @name connectors-close-view-sparql-query-dialog
 * @memberof module:Interactive Guide
 *
 * @description
 * This step prompts the user to close the "View SPARQL Query" dialog.
 *
 * Close SPARQL Query dialog example<br>
 * <img src="resources/guides/connectors/connectors-close-view-sparql-query-dialog.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-close-view-sparql-query-dialog",
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-close-view-sparql-query-dialog',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const GuideUtils = pluginService.GuideUtils;
    const elementSelector = GuideUtils.getGuideElementSelector('close-view-query-dialog');
    return [{
      guideBlockName: 'clickable-element',
      options: {
        title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE),
        placement: 'top',
        class: 'connectors-close-view-sparql-query-dialog',
        content: translate(this.translationBundle, CLOSE_VIEW_SPARQL_DIALOG),
        ...options,
        elementSelector,
        url: 'connectors',
        onNextClick: () => {
          GuideUtils.clickOnElement(elementSelector)();
        }
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [CLOSE_VIEW_SPARQL_DIALOG]: 'Click on close button to close the dialog'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [CLOSE_VIEW_SPARQL_DIALOG]: 'Cliquez sur le bouton de fermeture pour fermer la boîte de dialogue.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
