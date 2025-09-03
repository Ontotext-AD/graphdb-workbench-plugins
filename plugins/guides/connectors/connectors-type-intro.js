import {CONNECTORS_DEFAULT_TITLE, getConnectorNameSelector} from '../utils.js';

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
  getSteps: (options, services) => {
    return [{
      guideBlockName: 'read-only-element',
      options: {
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
        placement: 'top',
        class: 'connectors-connectors-intro',
        content: 'guide.step_plugin.connectors-type-intro.content',
        ...options,
        elementSelector: getConnectorNameSelector(options, services),
        url: 'connectors'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
