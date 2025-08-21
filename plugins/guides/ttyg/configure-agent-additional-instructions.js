import {TTYG_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'configure-agent-additional-instructions',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'copy-text-element',
        options: {
          extraContent: 'guide.step_plugin.configure-agent.user-instructions-input',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_DEFAULT_TITLE}),
          class: 'input-user-instructions',
          disablePreviousFlow: false,
          text: options.userInstructions,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('user-instructions'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(GuideUtils.getGuideElementSelector('user-instructions'), options.userInstructions, false))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
