/**
 * @name edit-ttyg-agent
 * @memberof module:Interactive Guide
 *
 * @description
 * Complex guide step, which takes the user through the process of editing a TTYG agent.
 *
 * Click the Lab main menu<br>
 * <img src="resources/guides/main-menu/main-menu-lab.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Click on TTYG in the sub-menu<br>
 * <img src="resources/guides/main-menu/main-menu-ttyg.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * End guide if API key error is present<br>
 * <img src="resources/guides/ttyg/end-on-api-key-error.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Edit agent intro message<br>
 * <img src="resources/guides/ttyg/ttyg-edit-agent-intro-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Click on edit agent button<br>
 * <img src="resources/guides/ttyg/ttyg-click-to-edit-selected-agent.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Click on save to save the edited agent<br>
 * <img src="resources/guides/ttyg/ttyg-edit-agent-click-to-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * The `configure-agent` step is configurable complex step. See [configure-agent](#.configure-agent) for more details.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "edit-ttyg-agent",
 * }
 * ```
 */
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
        options: {
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
          },
          ...options
        }
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
        options: {
          elementSelectorToHide: GuideUtils.getElementSelector('.agent-settings-modal'),
          timeToWait: 10
        },
        ...options
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
