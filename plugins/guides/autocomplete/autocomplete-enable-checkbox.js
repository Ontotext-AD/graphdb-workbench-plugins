import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'autocomplete-enable-checkbox',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const autocompleteCheckboxSelector = GuideUtils.getGuideElementSelector('autocompleteCheckbox');
    let checkboxElement;
    let autocompleteCheckboxClickEventHandler;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.enable-autocomplete.content',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.ENABLE_AUTOCOMPLETE_DEFAULT_TITLE}),
          class: 'enable-autocomplete-checkbox',
          ...options,
          url: 'autocomplete',
          elementSelector: autocompleteCheckboxSelector,
          // Disable default behavior of service when element is clicked.
          advanceOn: undefined,
          beforeShowPromise: () => GuideUtils.deferredShow(500)(),
          show: (guide) => () => {
            checkboxElement = document.querySelector(autocompleteCheckboxSelector);
            autocompleteCheckboxClickEventHandler = () => {
              // If autocomplete is enabled go to the next step.
              GuideUtils.deferredShow(200)()
                .then(() => {
                  if (GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
                    guide.next();
                  }
                });
            };
            // Add a listener that will complete this step and continue with the guide if checkbox is checked
            checkboxElement.addEventListener('mouseup', autocompleteCheckboxClickEventHandler);
          },
          onNextClick: (guide) => {
            if (!GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
              checkboxElement.click();
            }
            guide.next();
          },
          hide: () => () => {
            // Remove the listener from element. It is important when step is hidden.
            checkboxElement.removeEventListener('mouseup', autocompleteCheckboxClickEventHandler);
          }
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
