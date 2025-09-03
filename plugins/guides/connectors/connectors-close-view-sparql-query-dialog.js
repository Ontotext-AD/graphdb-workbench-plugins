import {CONNECTORS_DEFAULT_TITLE} from "../utils.js";

const step = {
    guideBlockName: 'connectors-close-view-sparql-query-dialog',
    getSteps: (options, services) => {
        const GuideUtils = services.GuideUtils;
        const elementSelector = GuideUtils.getGuideElementSelector('close-view-query-dialog');
        return [{
            guideBlockName: 'clickable-element',
            options: {
                // If mainAction is set the title will be set automatically
                ...(options.mainAction ? {} : {title: CONNECTORS_DEFAULT_TITLE}),
                placement: 'top',
                class: 'connectors-close-view-sparql-query-dialog',
                content: 'guide.step_plugin.connectors-close-view-sparql-query-dialog.content',
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
