const DEFAULT_TITLE = 'guide.step_plugin.autocomplete.default.title';
const CONTENT = 'guide.step_plugin.autocomplete-enable-checkbox.content';

/**
 * @name autocomplete-enable-checkbox
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * The `autocomplete-enable-checkbox` step shows the user how to enable the autocomplete index in GraphDB.<br>
 * <img src="resources/guides/autocomplete/autocomplete-enable-checkbox.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "autocomplete-enable-checkbox"
 * }
 * ```
 */
const step = {
  guideBlockName: 'autocomplete-enable-checkbox',
  getSteps: function(options, services) {
    const translate = services.translate;
    let checkboxElement;
    let autocompleteCheckboxClickEventHandler;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, CONTENT),
          title: translate(this.translationBundle, DEFAULT_TITLE),
          class: 'enable-autocomplete-checkbox',
          ...options,
          url: 'autocomplete',
          elementSelector: services.GuideUtils.getGuideElementSelector('autocompleteCheckbox'),
          // Disable default behavior of service when element is clicked.
          advanceOn: undefined,
          beforeShowPromise: () => services.GuideUtils.getOrWaitFor(services.GuideUtils.getGuideElementSelector('autocompleteCheckbox'), 5),
          show: (guide) => () => {
            checkboxElement = document.querySelector(services.GuideUtils.getGuideElementSelector('autocompleteCheckbox'));
            autocompleteCheckboxClickEventHandler = () => {
              // If autocomplete is enabled go to the next step.
              services.GuideUtils.deferredShow(200)()
                .then(() => {
                  if (services.GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
                    guide.next();
                  }
                });
            };
            // Add a listener that will complete this step and continue with the guide if checkbox is checked
            checkboxElement.addEventListener('mouseup', autocompleteCheckboxClickEventHandler);
          },
          onNextClick: (guide) => {
            if (!services.GuideUtils.isGuideElementChecked('autocompleteCheckbox', ' input')) {
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
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Enable autocomplete',
      [CONTENT]: 'Click on the checkbox to enable the index.'
    },
    fr: {
      [DEFAULT_TITLE]: 'Activer la saisie semi-automatique',
      [CONTENT]: 'Cliquez sur la case à cocher pour activer l\'indexation.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
