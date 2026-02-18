const TTYG_CREATE_TITLE = 'menu.ttyg.label';

/**
 * @name create-ttyg-agent
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user through the process of creating a new TTYG agent.
 * It includes steps to navigate to the TTYG section, open the agent creation modal,
 * fill in the necessary details, and save the new agent.
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
 * Create agent intro message<br>
 * <img src="resources/guides/ttyg/ttyg-create-agent-intro-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Click on "Create new agent" button<br>
 * <img src="resources/guides/ttyg/ttyg-create-agent-click.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Click on "Save" button to create the agent<br>
 * <img src="resources/guides/ttyg/ttyg-create-agent-save.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * The `configure-agent` step is configurable complex step. See [configure-agent](#.configure-agent) for more details.
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "create-ttyg-agent",
 * }
 * ```
 */
const step = {
  guideBlockName: 'create-ttyg-agent',
  getSteps: function(options, services) {
    const translate = services.translate;
    const GuideUtils = services.GuideUtils;
    options.mainAction = 'create-ttyg-agent';
    options.title = options.title ?? translate(this.translationBundle, TTYG_CREATE_TITLE);

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
  },
  translationBundle: {
    en: {
      [TTYG_CREATE_TITLE]: 'Create an agent'
    },
    fr: {
      [TTYG_CREATE_TITLE]: 'Créer un agent'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
