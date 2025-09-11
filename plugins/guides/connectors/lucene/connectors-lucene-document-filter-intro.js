import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-document-filter-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-document-filter-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-document-filter-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'documentFilter'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
