import {
    CONNECTORS_DEFAULT_TITLE,
    getConnectorContentSelector,
    getConnectorNameSelector,
    getConnectorParameterSelector,
    getConnectorSubparameterSelector
} from "../utils.js";

const step = {
    guideBlockName: 'connectors-array-subparameter-intro',
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
     * - <b>instanceName</b>: string (required) – the specific connector instance name for <code>connectorName</code>.
     * - <b>parameterName</b>: string (required) – the specific creation parameter name for <code>instanceName</code>.
     * - <b>subparameterName</b>: string (required) – the specific creation subparameter name for <code>parameterName</code>.
     */
    getSteps: (options, services) => {
        const connectorNameSelector = getConnectorNameSelector(options, services);
        const connectorContentSelector = getConnectorContentSelector(options, services);
        const parameterSelector = getConnectorParameterSelector(options, services);
        const subparameterName = getConnectorSubparameterSelector(options, services);
        return [{
            guideBlockName: 'read-only-element',
            options: {
                // If mainAction is set the title will be set automatically
                ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
                placement: 'top',
                class: 'connectors-connector-intro',
                content: 'guide.step_plugin.connectors-array-subparameter-intro.content',
                ...options,
                elementSelector: `${connectorNameSelector} ${connectorContentSelector} ${parameterSelector} ${subparameterName}`,
                url: 'connectors',
            },
        }];
    },
};

export function register(registry) {
    registry.add('guide.step', step);
}
