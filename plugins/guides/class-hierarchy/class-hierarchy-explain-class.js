import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-explain-class',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const selector = GuideUtils.getGuideElementSelector('class-' + options.iri);
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'hierarchy',
          placement: 'left',
          elementSelector: selector,
          class: 'class-hierarchy-explain-class',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CLASS_HIERARCHY_DEFAULT_TITLE}),
          show: () => Utils.disableAllRDFClasses,
          hide: () => Utils.enableAllRDFClasses,
          ...options
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
