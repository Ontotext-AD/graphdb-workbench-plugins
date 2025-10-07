const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const CONFIGURE_AGENT_NAME = 'guide.step_plugin.configure-agent.name-input';

/**
 * @name configure-agent-type-agent-name
 * @memberof module:Interactive Guide
 *
 * @description
 * This step guides the user to input a name for the agent in the TTYG interface.
 * It highlights the input field and provides instructions on how to proceed.
 *
 * Type a name for the agent<br>
 * <img src="resources/guides/ttyg/configure-agent-type-agent-name.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options)
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "configure-agent-type-agent-name",
 * }
 * ```
 */
const step = {
  guideBlockName: 'configure-agent-type-agent-name',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    return [
      {
        guideBlockName: 'input-element',
        options: {
          content: translate(this.translationBundle, CONFIGURE_AGENT_NAME),
          class: 'input-agent-name',
          disablePreviousFlow: false,
          ...(options.title ?? {title: translate(this.translationBundle, TTYG_DEFAULT_TITLE)}),
          ...options,
          url: 'ttyg',
          beforeShowPromise: () => GuideUtils.waitFor(GuideUtils.getGuideElementSelector('agent-form'), 5)
            .catch((error) => {
              pluginService.toastr.error(pluginService.$translate.instant('guide.unexpected.error.message'));
              throw error;
            }),
          elementSelector: GuideUtils.getGuideElementSelector('agent-name'),
          onNextValidate: () => Promise.resolve(GuideUtils.validateTextInputNotEmpty(GuideUtils.getGuideElementSelector('agent-name')))
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [CONFIGURE_AGENT_NAME]: 'Type a name for the agent. You will refer to it later.'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [CONFIGURE_AGENT_NAME]: 'Saisissez un nom pour l\'agent. Vous y ferez référence ultérieurement'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
