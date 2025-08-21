import {TTYG_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'configure-iri-discovery-search',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('iri-discovery-search-input');
    const shouldToggleOff = options.disable;

    let content;
    if (shouldToggleOff) {
      content = 'guide.step_plugin.iri-discovery-search.disable-toggle';
    } else {
      content = 'guide.step_plugin.iri-discovery-search.enable-toggle';
    }

    return {
      guideBlockName: 'clickable-element',
      options: {
        content,
        class: 'toggle-iri-discovery-search',
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: TTYG_DEFAULT_TITLE}),
        ...options,
        url: 'ttyg',
        elementSelector: GuideUtils.getGuideElementSelector('iri-discovery-search'),
        clickableElementSelector: toggleSelector,
        showOn: () => {
          const isEnabled = GuideUtils.isChecked(toggleSelector);
          return shouldToggleOff ? isEnabled : !isEnabled;
        },
        onNextValidate: () => {
          const isEnabled = GuideUtils.isChecked(toggleSelector);
          return Promise.resolve(shouldToggleOff ? !isEnabled : isEnabled);
        }
      }
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
