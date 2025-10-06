const TTYG_SELECT_AGENT_DEFAULT_TITLE = 'guide.step-action.select-ttyg-agent';
const SELECT_AGENT = 'guide.step_plugin.select-ttyg-agent.select-agent';

/**
 * @name ttyg-select-agent-from-dropdown
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to select an agent from a dropdown menu in the TTYG interface.
 * It highlights the dropdown element and provides instructions on how to proceed.
 *
 * Select an agent from the dropdown<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-from-dropdown.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-select-agent-from-dropdown",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-select-agent-from-dropdown',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, SELECT_AGENT),
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_SELECT_AGENT_DEFAULT_TITLE)}),
          disableNextFlow: true,
          class: 'select-your-agent',
          ...options,
          elementSelector: GuideUtils.getGuideElementSelector('select-agent-panel'),
          show: () => () => {
            const elementToObserve = document.querySelector(GuideUtils.getGuideElementSelector('select-agent-dropdown'));
            const dropdownToggleElement = document.querySelector(GuideUtils.getGuideElementSelector('select-agent-dropdown-toggle'));

            options.observer = new MutationObserver(attributesChangeCallback);
            options.observer.observe(elementToObserve, {attributes: true});

            function attributesChangeCallback(mutationList) {
              for (const mutation of mutationList) {
                if (mutation.type === 'attributes') {
                  const isOpened = mutation.target.classList.contains('open');

                  // The component we use for selecting the agent automatically closes
                  // after the user clicks on the view, which is why we have to open it.
                  if (!(isOpened)) {
                    dropdownToggleElement.click();
                  }
                }
              }
            }
          },
          hide: () => () => {
            options.observer.disconnect();
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Select an agent',
      [SELECT_AGENT]: 'Click on you agent from the dropdown to select it'
    },

    fr: {
      [TTYG_SELECT_AGENT_DEFAULT_TITLE]: 'Sélectionner un agent',
      [SELECT_AGENT]: 'Cliquez sur votre agent dans le menu déroulant pour le sélectionner'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
