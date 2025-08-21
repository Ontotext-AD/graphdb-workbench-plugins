import {TTYG_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'configure-temperature',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    const elementSelector = GuideUtils.getGuideElementSelector('temperature-control');
    const inputSelector = GuideUtils.getGuideElementSelector('temperature-control-input');

    return {
      guideBlockName: 'focus-element',
      options: {
        url: 'ttyg',
        elementSelector,
        placement: 'bottom',
        class: 'configure-temperature',
        content: 'guide.step_plugin.configure-temperature.info',
        onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(inputSelector, options.temperature)),
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
