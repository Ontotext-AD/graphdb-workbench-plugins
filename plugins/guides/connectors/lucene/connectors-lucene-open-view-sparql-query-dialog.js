import {LUCENE_CONNECTOR_NAME, LUCENE_DEFAULT_TITLE} from '../../utils.js';

const step = {
  guideBlockName: 'connectors-lucene-open-view-sparql-query-dialog',
  /**
   * Options:
   * - <b>instanceName</b>: string (required) – the specific instance name of the Lucene connector.
   */
  getSteps: (options) => {
    return [{
      guideBlockName: 'connectors-open-view-sparql-query-dialog',
      options: {
        content: 'guide.step_plugin.connectors-lucene-open-view-sparql-query-dialog.content',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: LUCENE_DEFAULT_TITLE}),
        ...options,
        class: 'connectors-lucene-open-view-sparql-query-dialog',
        connectorName: LUCENE_CONNECTOR_NAME,
        parameterName: 'analyzer'
      }
    }];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
