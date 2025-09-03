import {CONNECTORS_DEFAULT_TITLE, getConnectorContentSelector, getConnectorNameSelector, getConnectorParameterSelector} from "../utils.js";

const step = {
    guideBlockName: 'connectors-parameter-intro',
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
     * - <b>parameterName</b>: string (required) – the specific creation parameters name for <code>instanceName</code>.
     */
    getSteps: (options, services) => {
        const connectorNameSelector = getConnectorNameSelector(options, services);
        const connectorContentSelector = getConnectorContentSelector(options, services);
        const parameterSelector = getConnectorParameterSelector(options, services);
        return [{
            guideBlockName: 'read-only-element',
            options: {
                // If mainAction is set the title will be set automatically
                ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
                placement: 'top',
                class: 'connectors-connector-intro',
                content: 'guide.step_plugin.connectors-parameter-intro.content',
                ...options,
                elementSelector: `${connectorNameSelector} ${connectorContentSelector} ${parameterSelector}`,
                url: 'connectors',
            },
        }];
    },
};

export function register(registry) {
    registry.add('guide.step', step);
}
