import {TTYG_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'configure-top-p',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    const elementSelector = GuideUtils.getGuideElementSelector('top-p-control');
    const inputSelector = GuideUtils.getGuideElementSelector('top-p-control-input');

    return {
      guideBlockName: 'focus-element',
      options: {
        url: 'ttyg',
        elementSelector,
        placement: 'bottom',
        class: 'configure-top-p',
        content: 'guide.step_plugin.configure-top-p.info',
        onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(inputSelector, options.topP)),
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: TTYG_DEFAULT_TITLE}),
        ...options
      }
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
