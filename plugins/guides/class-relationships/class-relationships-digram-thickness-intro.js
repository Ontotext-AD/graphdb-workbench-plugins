const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-digram-thickness-intro.content';

/**
 * @name class-relationships-digram-thickness-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-digram-thickness-intro` step displays a dialog that explains how connection lines in the diagram
 * encode information through their thickness, color, and direction.<br>
 * <img src="resources/guides/class-relationships/class-relationships-digram-thickness-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-digram-thickness-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-digram-thickness-intro',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'focus-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('relationships-diagram'),
          placement: 'left',
          class: 'class-relationships-digram-thickness-intro',
          content: translate(this.translationBundle, CONTENT),
          title: options.title ?? translate(this.translationBundle, DEFAULT_TITLE),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Class relationships',
      [CONTENT]: 'Each connection line varies in <b>thickness</b> based on the number of links, <b>color</b> based on the class with more incoming links, and <b>direction</b> as links may go both ways (from class A to class B and vice versa).'

    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe',
      [CONTENT]: 'Chaque ligne de connexion varie en <b>épaisseur</b> basée sur le nombre de liens, en <b>couleur</b> basée sur la classe avec le plus de liens entrants, et en <b>direction</b> car les liens peuvent aller dans les deux sens (de la classe A vers la classe B et vice versa).'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
