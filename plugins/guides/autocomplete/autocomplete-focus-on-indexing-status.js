import {ENABLE_AUTOCOMPLETE_DEFAULT_TITLE} from '../utils.js';
import {translate} from '../../../utils/translations/translation-service.js';

const step = {
  guideBlockName: 'autocomplete-focus-on-indexing-status',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return {
      guideBlockName: 'read-only-element',
      options: {
        content: translate(options.language, 'guide.step_plugin.enable-autocomplete.status_info.content'),
        // If mainAction is set the title will be set automatically
        ...(options.mainAction ? {} : {title: translate(options.language, ENABLE_AUTOCOMPLETE_DEFAULT_TITLE)}),
        ...options,
        url: 'autocomplete',
        elementSelector: GuideUtils.getGuideElementSelector('autocompleteStatus'),
        class: 'autocomplete-status-info',
        canBePaused: false
      }
    };
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
