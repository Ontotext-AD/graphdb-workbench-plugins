import {getConnectorContentSelector, getConnectorNameSelector} from '../utils.js';

const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const OPEN_VIEW_SPARQL_DIALOG = 'guide.step_plugin.connectors-open-view-sparql-query-dialog.content';

/**
 * @name connectors-open-view-sparql-query-dialog
 * @memberof module:Interactive Guide
 *
 * @description
 * This step prompts the user to open the "View SPARQL Query" dialog.
 *
 * View SPARQL Query dialog example<br>
 * <img src="resources/guides/connectors/connectors-open-view-sparql-query-dialog.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 *
 * @property {string} connectorName - the name of the connector for which the section is being defined.
 * @property {string} instanceName - the specific instance name of the connector.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-open-view-sparql-query-dialog",
 *  "options": {
 *    "connectorName": "Elasticsearch",
 *    "instanceName": "MyElasticsearchConnector"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-open-view-sparql-query-dialog',
  /**
     * Options:
     * - <b>connectorName</b>: string (required).
     *   <ol>Possible values:
     *    <li>Elasticsearch</li>
     *    <li>OpenSearch</li>
     *    <li>Solr</li>
     *    <li>Lucene</li>
     *    <li>Kafka</li>
     *    <li>ChatGPT-Retrieval</li>
     *   </ol>
     * - <b>instanceName</b>: string (required) – the specific connector instance name for <code>connectorName</code>.
     */
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const connectorNameSelector = getConnectorNameSelector(options, services);
    const connectorContentSelector = getConnectorContentSelector(options, services);
    const openViewSPARQLDialogSelector = GuideUtils.getGuideElementSelector('open-view-sparql-query-dialog');
    const elementSelector = `${connectorNameSelector} ${connectorContentSelector} ${openViewSPARQLDialogSelector}`;
    return [{
      guideBlockName: 'clickable-element',
      options: {
        ...(options.title ?? {title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE)}),
        placement: 'top',
        class: 'open-view-sparql-query-dialog',
        content: translate(this.translationBundle, OPEN_VIEW_SPARQL_DIALOG),
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
      [OPEN_VIEW_SPARQL_DIALOG]: 'Click on <b>View SPARQL Query</b> to view the connector creation query.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [OPEN_VIEW_SPARQL_DIALOG]: 'Cliquez sur <b>Voir la requête SPARQL</b> pour afficher la requête de création du connecteur.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
