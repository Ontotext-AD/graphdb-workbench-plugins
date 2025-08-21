import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-explain-rdf-instance',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          content: 'guide.step_plugin.class-hierarchy-explain-rdf-instance.content',
          url: 'hierarchy',
          canBePaused: false,
          elementSelector: GuideUtils.getGuideElementSelector('instance-' + options.instance),
          class: 'class-hierarchy-explain-rdf-instance',
          focusInstance: options.instance,
          extraContent: options.extraContent,
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
