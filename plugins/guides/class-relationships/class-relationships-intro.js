const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-intro.content';

/**
 * @name class-relationships-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-intro` step displays a dialog that introduces the Class relationships view.<br>
 * <img src="resources/guides/class-relationships/class-relationships-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-intro',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'info-message',
        options: {
          url: 'relationships',
          class: 'clas-hierarchy-intro',
          placement: 'left',
          content: translate(this.translationBundle, CONTENT),
          title: translate(this.translationBundle, DEFAULT_TITLE),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Explore the class relationships',
      [CONTENT]: 'This view shows how data instances from different classes are connected based on real RDF statements.'

    },
    fr: {
      [DEFAULT_TITLE]: 'Explorer les relations entre classes',
      [CONTENT]: 'Cette vue montre comment les instances de données de différentes classes sont connectées basées sur de vraies déclarations RDF.'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
