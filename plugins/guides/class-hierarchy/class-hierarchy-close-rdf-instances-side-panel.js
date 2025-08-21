import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-close-rdf-instances-side-panel',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.class-hierarchy-close-rdf-instances-side-panel.content',
          url: 'hierarchy',
          canBePaused: false,
          elementSelector: closeButtonSelector,
          class: 'class-hierarchy-close-rdf-instances-side-panel',
          placement: 'left',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CLASS_HIERARCHY_RDF_INSTANCES_DEFAULT_TITLE}),
          onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3)
            .then(() => GuideUtils.clickOnElement(closeButtonSelector)()),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
