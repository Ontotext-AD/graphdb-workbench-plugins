import {FTS_METHOD_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-fts-method-enable',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-fts_search-input');

    return [
      {
        guideBlockName: 'toggle-element',
        options: {
          content: 'guide.step_plugin.fts-search-method.enable-toggle',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: FTS_METHOD_DEFAULT_TITLE}),
          class: 'toggle-fts-search',
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('query-method-fts_search'),
          toggleableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
