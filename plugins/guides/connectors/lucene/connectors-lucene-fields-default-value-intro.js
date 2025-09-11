import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-fields-default-value-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-fields-default-value-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-fields-default-value-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'defaultValue'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
