const step = {
  guideBlockName: 'create-ttyg-agent',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    options.mainAction = 'create-ttyg-agent';

    return [
      {
        guideBlockName: 'click-main-menu',
        options: {
          showIntro: true,
          ...options,
          menu: 'ttyg'
        }
      },
      {
        guideBlockName: 'end-on-api-key-error'
      },
      {
        guideBlockName: 'ttyg-create-agent-intro-message',
        options: {...options}
      },
      {
        guideBlockName: 'wait-for-element-to-hide',
        options: {
          ...options,
          elementSelectorToHide: GuideUtils.getElementSelector('.ttyg-page-loader'),
          timeToWait: 10
        }
      },
      {
        guideBlockName: 'ttyg-create-agent-click', options: {...options}
      },
      {
        guideBlockName: 'configure-agent',
        // Set name field as mandatory for creation
        options: {...options, editName: true}
      },
      {
        guideBlockName: 'ttyg-create-agent-save', options: {...options}
      },
      {
        guideBlockName: 'wait-for-element-to-hide',
        options: {
          ...options,
          elementSelectorToHide: GuideUtils.getElementSelector('.agent-settings-modal'),
          timeToWait: 10
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
