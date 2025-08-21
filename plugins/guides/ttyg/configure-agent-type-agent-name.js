import {TTYG_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'configure-agent-type-agent-name',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: 'guide.step_plugin.configure-agent.name-input',
          class: 'input-agent-name',
          disablePreviousFlow: false,
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_DEFAULT_TITLE}),
          ...options,
          url: 'ttyg',
          beforeShowPromise: () => GuideUtils.waitFor(GuideUtils.getGuideElementSelector('agent-form'), 5)
            .catch((error) => {
              services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
              throw error;
            }),
          elementSelector: GuideUtils.getGuideElementSelector('agent-name'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInputNotEmpty(GuideUtils.getGuideElementSelector('agent-name')))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
