import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql.content',
          url: 'hierarchy',
          canBePaused: false,
          elementSelector: GuideUtils.getGuideElementSelector('instances-count'),
          class: 'class-hierarchy-rdf-instances-side-panel-open-all-instances-in-sparql',
          onNextClick: GuideUtils.clickOnGuideElement('instances-count'),
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CLASS_HIERARCHY_DEFAULT_TITLE}),
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
