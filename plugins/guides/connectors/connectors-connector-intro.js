import {CONNECTORS_DEFAULT_TITLE, getConnectorNameSelector} from "../utils.js";

const step = {
    guideBlockName: 'connectors-connector-intro',
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
     */
    getSteps: (options, services) => {
        const GuideUtils = services.GuideUtils;
        const connectorNameSelector = getConnectorNameSelector(options, services);
        const connectorCardSelector = GuideUtils.getGuideElementSelector(`${options.instanceName}-connector-card`);
        return [{
            guideBlockName: 'read-only-element',
            options: {
                // If mainAction is set the title will be set automatically
                ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
                placement: 'top',
                class: 'connectors-connector-intro',
                content: 'guide.step_plugin.connectors-connector-intro.content',
                ...options,
                elementSelector: `${connectorNameSelector} ${connectorCardSelector}`,
                url: 'connectors',
            },
        }];
    },
};

export function register(registry) {
    registry.add('guide.step', step);
}
