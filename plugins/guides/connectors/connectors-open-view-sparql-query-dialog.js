import {CONNECTORS_DEFAULT_TITLE, getConnectorContentSelector, getConnectorNameSelector} from "../utils.js";

const step = {
    guideBlockName: 'connectors-open-view-sparql-query-dialog',
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
        const connectorContentSelector = getConnectorContentSelector(options, services);
        const openViewSPARQLDialogSelector = GuideUtils.getGuideElementSelector('open-view-sparql-query-dialog');
        const elementSelector = `${connectorNameSelector} ${connectorContentSelector} ${openViewSPARQLDialogSelector}`;
        return [{
            guideBlockName: 'clickable-element',
            options: {
                // If mainAction is set the title will be set automatically
                ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
                placement: 'top',
                class: 'open-view-sparql-query-dialog',
                content: 'guide.step_plugin.connectors-open-view-sparql-query-dialog.content',
                ...options,
                elementSelector,
                url: 'connectors',
                onNextClick: () => {
                    GuideUtils.clickOnElement(elementSelector)();
                },
            },
        }];
    },
};

export function register(registry) {
    registry.add('guide.step', step);
}
