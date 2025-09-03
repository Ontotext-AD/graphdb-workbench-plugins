import {CONNECTORS_DEFAULT_TITLE, getConnectorNameSelector} from "../utils.js";

const step = {
    guideBlockName: 'connectors-expand-connector',
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
        const connectorToggleButtonSelector = GuideUtils.getGuideElementSelector(`${options.instanceName}-connector-toggle-button`, 'a');
        return [{
            guideBlockName: 'clickable-element',
            options: {
                // If mainAction is set the title will be set automatically
                ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
                placement: 'top',
                class: 'connectors-expand-connector',
                content: 'guide.step_plugin.connectors-expand-connector.content',
                ...options,
                elementSelector: `${connectorNameSelector} ${connectorToggleButtonSelector}`,
                url: 'connectors',
                onNextClick: () => {
                    GuideUtils.clickOnElement(`${connectorNameSelector} ${connectorToggleButtonSelector}`)();
                },
            },
        }];
    },
};

export function register(registry) {
    registry.add('guide.step', step);
}
