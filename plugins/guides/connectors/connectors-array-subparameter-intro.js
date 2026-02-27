import {
  getConnectorContentSelector,
  getConnectorNameSelector,
  getConnectorParameterSelector,
  getConnectorSubparameterSelector
} from '../utils.js';

const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const SUBPARAMETER_INTRO = 'guide.step_plugin.connectors-array-subparameter-intro.content';

/**
 * @name connectors-array-subparameter-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step is an introductory step for the creation of a subparameter within a parameter of a connector.
 * It explains the purpose and usage of subparameters in defining how a connector instance is created.
 *
 * Connectors subparameter introduction<br>
 * <img src="resources/guides/connectors/connectors-array-subparameter-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 *
 * @property {string} connectorName - the name of the connector for which the subparameter is being defined.
 * @property {string} instanceName - the specific instance name of the connector.
 * @property {string} parameterName - the specific creation parameter name for <code>instanceName</code>.
 * @property {string} subparameterName - the specific creation subparameter name for <code>parameterName</code>.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-array-subparameter-intro",
 *  "options": {
 *    "connectorName": "Elasticsearch",
 *    "instanceName": "MyElasticsearchConnector",
 *    "parameterName": "hosts",
 *    "subparameterName": "host"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-array-subparameter-intro',
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
     * - <b>parameterName</b>: string (required) – the specific creation parameter name for <code>instanceName</code>.
     * - <b>subparameterName</b>: string (required) – the specific creation subparameter name for <code>parameterName</code>.
     */
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const GuideUtils = pluginService.GuideUtils;
    const connectorNameSelector = getConnectorNameSelector(options, pluginService);
    const connectorContentSelector = getConnectorContentSelector(options, pluginService);
    const parameterSelector = getConnectorParameterSelector(options, pluginService);
    const subparameterName = getConnectorSubparameterSelector(options, pluginService);
    const elementSelector = `${connectorNameSelector} ${connectorContentSelector} ${parameterSelector} ${subparameterName}`;

    return [{
      guideBlockName: 'read-only-element',
      options: {
        ...(options.title ?? {title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE)}),
        placement: 'top',
        class: 'connectors-connector-intro',
        content: translate(this.translationBundle, SUBPARAMETER_INTRO),
        ...options,
        elementSelector,
        scrollToHandler: () => GuideUtils.scrollIntoView(elementSelector, {block: 'center', behavior: 'smooth'}),
        url: 'connectors'
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [SUBPARAMETER_INTRO]: 'A parameter can define how an instance is created. Its value may be a simple type, a list, or an object, and it can be required or optional.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [SUBPARAMETER_INTRO]: 'Un paramètre peut définir comment une instance est créée. Sa valeur peut être un type simple, une liste ou un objet, et il peut être obligatoire ou optionnel.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
