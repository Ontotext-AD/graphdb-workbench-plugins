import {getConnectorContentSelector, getConnectorNameSelector, getConnectorParameterSelector} from '../utils.js';

const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const PARAMETER_INTRO = 'guide.step_plugin.connectors-parameter-intro.content';

/**
 * @name connectors-parameter-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step showcases a parameter of a connector instance.
 *
 * Connectors parameter introduction<br>
 * <img src="resources/guides/connectors/connectors-parameter-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 *
 * @property {string} connectorName - the name of the connector for which the parameter is being defined.
 * @property {string} instanceName - the specific instance name of the connector.
 * @property {string} parameterName - the specific creation parameters name for <code>instanceName</code>.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-parameter-intro",
 *  "options": {
 *    "connectorName": "Elasticsearch",
 *    "instanceName": "MyElasticsearchConnector",
 *    "parameterName": "hosts"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-parameter-intro',
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
     * - <b>parameterName</b>: string (required) – the specific creation parameters name for <code>instanceName</code>.
     */
  getSteps: function(options, services) {
    const translate = services.translate;
    const connectorNameSelector = getConnectorNameSelector(options, services);
    const connectorContentSelector = getConnectorContentSelector(options, services);
    const parameterSelector = getConnectorParameterSelector(options, services);
    return [{
      guideBlockName: 'read-only-element',
      options: {
        title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE),
        placement: 'top',
        class: 'connectors-connector-intro',
        content: translate(this.translationBundle, PARAMETER_INTRO),
        ...options,
        elementSelector: `${connectorNameSelector} ${connectorContentSelector} ${parameterSelector}`,
        url: 'connectors'
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [PARAMETER_INTRO]: 'The creation parameters for luc:createConnector define how a connector instance is created. They are provided in a JSON object with parameter names as keys. Some parameters are required, others optional, and values can be simple types, lists, or objects.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [PARAMETER_INTRO]: 'Les paramètres de création pour luc:createConnector définissent comment une instance de connecteur est créée. Ils sont fournis dans un objet JSON avec les noms des paramètres comme clés. Certains paramètres sont obligatoires, d\'autres optionnels, et les valeurs peuvent être des types simples, des listes ou des objets.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
