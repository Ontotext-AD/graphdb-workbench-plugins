import {getConnectorNameSelector} from '../utils.js';

const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
const CONNECTOR_TYPE_INTRO = 'guide.step_plugin.connectors-type-intro.content';


/**
 * @name connectors-type-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * This step shows the type of connector.
 *
 * Connectors type introduction<br>
 * <img src="resources/guides/connectors/connectors-type-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it requires:
 * @property {string} connectorName - the name of the connector for which the section is being defined.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "connectors-type-intro",
 *  "options": {
 *    "connectorName": "Elasticsearch"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'connectors-type-intro',
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
     *
     *   Must override content with connector specific content
     */
  getSteps: function(options, services) {
    const translate = services.translate;
    return [{
      guideBlockName: 'read-only-element',
      options: {
        ...(options.title ?? {title: translate(this.translationBundle, CONNECTORS_DEFAULT_TITLE)}),
        placement: 'top',
        class: 'connectors-connectors-intro',
        content: translate(this.translationBundle, CONNECTOR_TYPE_INTRO),
        ...options,
        elementSelector: getConnectorNameSelector(options, services),
        url: 'connectors'
      }
    }];
  },
  translationBundle: {
    en: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connectors',
      [CONNECTOR_TYPE_INTRO]: 'Specific GraphDB Connectors provide different connection possibilities.'
    },
    fr: {
      [CONNECTORS_DEFAULT_TITLE]: 'Connecteurs',
      [CONNECTOR_TYPE_INTRO]: 'Les connecteurs GraphDB spécifiques offrent différentes possibilités de connexion.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
