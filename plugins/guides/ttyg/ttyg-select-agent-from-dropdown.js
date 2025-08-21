import {TTYG_SELECT_AGENT_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-select-agent-from-dropdown',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.select-ttyg-agent.select-agent',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: TTYG_SELECT_AGENT_DEFAULT_TITLE}),
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
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
