import {getConnectorNameSelector} from '../utils.js';

const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const CONNECTORS_INTRO_CONTENT = 'guide.step_plugin.connectors-connector-intro.content';

/**
 * @name connectors-connector-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the connectors section of the GraphDB Workbench.
 * It explains the purpose of an individual connector.
 *
 * Connectors section introduction<br>
 * <img src="resources/guides/connectors/connectors-connector-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 *
 * @property {string} connectorName - the name of the connector for which the section is being defined.
 * @property {string} instanceName - the specific instance name of the connector.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-connector-intro",
 *  "options": {
 *    "connectorName": "Elasticsearch",
 *    "instanceName": "MyElasticsearchConnector"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-connector-intro',
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
    const connectorCardSelector = GuideUtils.getGuideElementSelector(`${options.instanceName}-connector-card`);
    return [{
      guideBlockName: 'read-only-element',
      options: {
        ...(options.title ?? {title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE)}),
        placement: 'top',
        class: 'connectors-connector-intro',
        content: translate(this.translationBundle, CONNECTORS_INTRO_CONTENT),
        ...options,
        elementSelector: `${connectorNameSelector} ${connectorCardSelector}`,
        url: 'connectors'
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [CONNECTORS_INTRO_CONTENT]: 'Each section represents a single connector instance. For every instance, you can use the buttons on the right to copy, repair, or delete it.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [CONNECTORS_INTRO_CONTENT]: 'Chaque section représente une seule instance de connecteur. Pour chaque instance, vous pouvez utiliser les boutons à droite pour la copier, la réparer ou la supprimer.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
