const step = {
  guideBlockName: 'edit-ttyg-agent',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const RoutingUtil = services.RoutingUtil;
    options.mainAction = 'edit-ttyg-agent';

    return [
      {
        guideBlockName: 'click-main-menu',
        options: {
          ...options,
          menu: 'ttyg',
          showOn: () => 'ttyg' !== RoutingUtil.getCurrentRoute()
        }
      },
      {
        guideBlockName: 'end-on-api-key-error'
      },
      {
        guideBlockName: 'ttyg-edit-agent-intro-message',
        options: {...options}
      },
      {
        // Skip next step (which is actually 5 core steps) if there is a selected agent
        guideBlockName: 'info-message',
        options: angular.extend({}, {
          beforeShowPromise: (guide, currentStep) => {
            if (GuideUtils.isGuideElementVisible('selected-agent')) {
              setTimeout(() => {
                // Using a timeout because the library executes async logic
                guide.show(currentStep.id + 6);
              });
            } else {
              setTimeout(() => {
                // Using a timeout because the library executes async logic
                guide.next();
              });
            }
          }
        }, options)
      },
      {
        guideBlockName: 'select-ttyg-agent',
        options: {...options}
      },
      {
        guideBlockName: 'ttyg-click-to-edit-selected-agent',
        options: {...options}
      },
      {
        guideBlockName: 'configure-agent',
        options
      },
      {
        guideBlockName: 'ttyg-edit-agent-click-to-save',
        options: {...options}
      },
      {
        guideBlockName: 'wait-for-element-to-hide',
        options: angular.extend({}, {
          elementSelectorToHide: GuideUtils.getElementSelector('.agent-settings-modal'),
          timeToWait: 10
        }, options)
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
