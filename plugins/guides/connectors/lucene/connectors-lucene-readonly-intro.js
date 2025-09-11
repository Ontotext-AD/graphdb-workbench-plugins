import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-readonly-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-readonly-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-readonly-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'readonly'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
