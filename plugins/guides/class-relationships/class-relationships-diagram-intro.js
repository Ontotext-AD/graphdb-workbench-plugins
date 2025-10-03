const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';
const CONTENT = 'guide.step_plugin.class-relationships-diagram-intro.content';

/**
 * @name class-relationships-diagram-intro
 * @memberof module:Interactive Guide
 *
 * @description
 * The `class-relationships-diagram-intro` step displays a dialog that explains the class diagram in the Class Relationships view.<br>
 * <img src="resources/guides/class-relationships/class-relationships-diagram-intro.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships-diagram-intro"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships-diagram-intro',
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    return [
      {
        guideBlockName: 'read-only-element',
        options: {
          url: 'relationships',
          elementSelector: GuideUtils.getGuideElementSelector('relationships-diagram'),
          placement: 'left',
          class: 'class-relationships-diagram-intro',
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
      [CONTENT]: 'The diagram shows bundled connections between class pairs. Each connection represents multiple RDF links (subject–predicate–object) between instances of two classes.'

    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe',
      [CONTENT]: 'Le diagramme montre les connexions groupées entre paires de classes. Chaque connexion représente plusieurs liens RDF (sujet–prédicat–objet) entre instances de deux classes.'

    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
