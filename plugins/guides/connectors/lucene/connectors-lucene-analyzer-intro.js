import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-analyzer-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-analyzer-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-analyzer-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'analyzer'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
