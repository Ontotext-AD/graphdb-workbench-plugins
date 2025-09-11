import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-strip-markup-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-parameter-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-strip-markup-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-strip-markup-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'stripMarkup'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
