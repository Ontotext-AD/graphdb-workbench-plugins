import {FTS_METHOD_DEFAULT_TITLE} from '../utils.js';

const step = {
  guideBlockName: 'ttyg-fts-method-disable',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;
    const toggleSelector = GuideUtils.getGuideElementSelector('query-method-fts_search-input');

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.fts-search-method.disable-toggle',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: FTS_METHOD_DEFAULT_TITLE}),
          class: 'toggle-fts-search',
          ...options,
          url: 'ttyg',
          showOn: () => GuideUtils.isChecked(toggleSelector),
          elementSelector: GuideUtils.getGuideElementSelector('query-method-fts_search'),
          clickableElementSelector: toggleSelector,
          onNextValidate: () => Promise.resolve(!GuideUtils.isChecked(toggleSelector))
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
