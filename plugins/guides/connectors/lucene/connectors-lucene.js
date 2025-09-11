import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-connector-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        connectorName: LUCENE_CONNECTOR_NAME,
        class: 'connectors-lucene'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
