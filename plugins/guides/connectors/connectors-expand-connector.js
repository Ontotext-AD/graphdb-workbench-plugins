import {getConnectorNameSelector} from '../utils.js';

const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const EXPAND_CONNECTOR_CONTENT = 'guide.step_plugin.connectors-expand-connector.content';

/**
 * @name connectors-expand-connector
 * @memberof module:Interactive Guide
 *
 * @description
 * This step  prompts the user to expand the connector details by clicking on its name.
 *
 * Connectors expand step<br>
 * <img src="resources/guides/connectors/connectors-expand-connector.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 *
 * @property {string} connectorName - the name of the connector for which the section is being defined.
 * @property {string} instanceName - the specific instance name of the connector.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-expand-connector",
 *  "options": {
 *    "connectorName": "Elasticsearch",
 *    "instanceName": "MyElasticsearchConnector"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-expand-connector',
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
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const GuideUtils = pluginService.GuideUtils;
    const connectorNameSelector = getConnectorNameSelector(options, pluginService);
    const connectorToggleButtonSelector = GuideUtils.getGuideElementSelector(`${options.instanceName}-connector-toggle-button`, 'a');
    return [{
      guideBlockName: 'clickable-element',
      options: {
        ...(options.title ?? {title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE)}),
        placement: 'top',
        class: 'connectors-expand-connector',
        content: translate(this.translationBundle, EXPAND_CONNECTOR_CONTENT),
        ...options,
        elementSelector: `${connectorNameSelector} ${connectorToggleButtonSelector}`,
        url: 'connectors',
        onNextClick: () => {
          GuideUtils.clickOnElement(`${connectorNameSelector} ${connectorToggleButtonSelector}`)();
        }
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [EXPAND_CONNECTOR_CONTENT]: 'To view the configuration of a connector, click on its name. This will expand the connector details.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [EXPAND_CONNECTOR_CONTENT]: 'Pour voir la configuration d\'un connecteur, cliquez sur son nom. Cela développera les détails du connecteur.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
