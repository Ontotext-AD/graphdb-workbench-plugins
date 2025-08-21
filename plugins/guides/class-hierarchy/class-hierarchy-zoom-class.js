import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-zoom-class',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const selector = GuideUtils.getGuideElementSelector('class-' + options.iri);
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          url: 'hierarchy',
          placement: 'left',
          elementSelector: selector,
          content: 'guide.step_plugin.class-hierarchy-zoom-class.content',
          class: 'class-hierarchy-zoom-class',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CLASS_HIERARCHY_DEFAULT_TITLE}),
          onNextClick: (guide, step) => {
            GuideUtils.classHierarchyZoom(step.elementSelector);
            guide.next();
          },
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
