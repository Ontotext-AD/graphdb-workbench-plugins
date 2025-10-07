const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
const CONFIGURE_TOP_P = 'guide.step_plugin.configure-top-p.info';

/**
 * @name configure-top-p
 * @memberof module:Interactive Guide
 *
 * @description
 * This step sets the nucleus sampling parameter (top-p) for the TTYG agent.
 * It guides the user to adjust the top-p control to a specified value.
 *
 * Configure the nucleus sampling (top-p) parameter<br>
 * <img src="resources/guides/ttyg/configure-top-p.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally it supports:
 *
 * @property {number} options.topP - The target value for the top-p parameter (between 0 and 1).
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "configure-top-p",
 *  "options": {
 *    "topP": 0.9
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'configure-top-p',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;

    const elementSelector = GuideUtils.getGuideElementSelector('top-p-control');
    const inputSelector = GuideUtils.getGuideElementSelector('top-p-control-input');

    return {
      guideBlockName: 'focus-element',
      options: {
        url: 'ttyg',
        elementSelector,
        placement: 'bottom',
        class: 'configure-top-p',
        content: translate(this.translationBundle, CONFIGURE_TOP_P, {topP: options.topP}),
        onNextValidate: () => Promise.resolve(GuideUtils.validateTextInput(inputSelector, options.topP)),
        ...(options.title ?? {title: translate(this.translationBundle, TTYG_DEFAULT_TITLE)}),
        ...options
      }
    };
  },
  translationBundle: {
    en: {
      [TTYG_DEFAULT_TITLE]: 'Talk to Your Graph',
      [CONFIGURE_TOP_P]: 'Sets the nucleus sampling of the agent. Upon retrieving a set of candidate values, this controls how many of those values to consider using. Takes a value between 0 and 1.<br>Set slider to <b>{{topP}}</b>'
    },
    fr: {
      [TTYG_DEFAULT_TITLE]: 'Parlez à votre graphe',
      [CONFIGURE_TOP_P]: 'Définit l\'échantillonnage du noyau de l\'agent. Lors de la récupération d\'un ensemble de valeurs candidates, cela contrôle combien de ces valeurs doivent être considérées pour utilisation. Prend une valeur entre 0 et 1.<br>Réglez le curseur sur <b>{{topP}}</b>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
