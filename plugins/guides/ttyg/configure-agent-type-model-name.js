import {TTYG_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'configure-agent-type-model-name',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: 'guide.step_plugin.configure-agent.model-input',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_DEFAULT_TITLE}),
          class: 'input-model',
          disablePreviousFlow: false,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('model'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('model'), options.model, false))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
