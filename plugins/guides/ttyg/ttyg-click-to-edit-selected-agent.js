import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-click-to-edit-selected-agent',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.edit-ttyg-agent.edit-agent',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_EDIT_AGENT_DEFAULT_TITLE}),
          class: 'edit-agent-btn',
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('edit-current-agent')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
