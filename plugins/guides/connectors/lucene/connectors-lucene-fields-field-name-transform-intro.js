import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-fields-field-name-transform-intro',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-array-subparameter-intro',
      options: {
        content: 'guide.step_plugin.connectors-lucene-fields-field-name-transform-intro.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-fields-field-name-transform-intro',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'fields',
        subparameterName: 'fieldNameTransform'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
