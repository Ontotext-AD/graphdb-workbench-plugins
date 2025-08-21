import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'ttyg-edit-agent-click-to-save',
  getSteps: (options, services) => {
    const GuideUtils = services.GuideUtils;

    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: 'guide.step_plugin.edit-ttyg-agent.save-agent-settings',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.TTYG_EDIT_AGENT_DEFAULT_TITLE}),
          class: 'save-agent',
          disablePreviousFlow: false,
          disableNextFlow: true,
          ...options,
          url: 'ttyg',
          elementSelector: GuideUtils.getGuideElementSelector('save-agent-settings')
        }
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
