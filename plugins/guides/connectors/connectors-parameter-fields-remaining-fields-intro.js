import {getConnectorContentSelector, getConnectorNameSelector, getConnectorParameterSelector} from '../utils.js';

const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const REMAINING_FIELDS_INTRO = 'guide.step_plugin.connectors-parameter-fields-remaining-fields-intro.content';

/**
 * @name connectors-parameter-fields-remaining-fields-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step showcases the remaining fields of a connector instance. We might have more than one field mapping for a connector instance.
 * In that case this step shows the remaining field mappings.
 *
 * Remaining fields<br>
 * <img src="resources/guides/connectors/connectors-parameter-fields-remaining-fields-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
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
 *  "guideBlockName": "connectors-parameter-fields-remaining-fields-intro",
 *  "options": {
 *    "connectorName": "Elasticsearch",
 *    "instanceName": "MyElasticsearchConnector",
 *    "parameterName": "hosts"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-parameter-fields-remaining-fields-intro',
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
   */
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    const remainingFieldsSelector = GuideUtils.getGuideElementSelector('connector-remaining-fieldsets');
    const connectorNameSelector = getConnectorNameSelector(options, services);
    const connectorContentSelector = getConnectorContentSelector(options, services);
    const parameterSelector = getConnectorParameterSelector(options, services);

    return [{
      guideBlockName: 'read-only-element', options: {
        ...(options.title ?? {title: translate(step.translationBundle, CONNECTORS_DEFAULT_TITLE)}),
        placement: 'top',
        class: 'connectors-remaining-fieldsets-intro',
        content: translate(step.translationBundle, REMAINING_FIELDS_INTRO),
        ...options,
        elementSelector: `${connectorNameSelector} ${connectorContentSelector} ${parameterSelector} ${remainingFieldsSelector}`,
        url: 'connectors'
      }
    }];
  }, translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [REMAINING_FIELDS_INTRO]: 'This connector configuration contains multiple field mappings.'
    }, fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [REMAINING_FIELDS_INTRO]: 'Cette configuration du connecteur Lucene contient plusieurs mappages de champs.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
