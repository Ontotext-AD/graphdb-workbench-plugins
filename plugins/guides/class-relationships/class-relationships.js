const DEFAULT_TITLE = 'guide.step_plugin.class-relationships.default.title';

/**
 * @name class-relationships
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * The `class-relationships` step shows how to reach the Class relationships view of GraphDB Workbench.
 *
 * The step consists of the following steps:
 * 1. An introduction to the Class relationships.<br>
 * <img src="resources/guides//class-relationships/class-relationships-view-introduction_1.png" style="height:200px; border: solid; border-width:1px"/><br>
 * 2. A step that guides the user to click on the "Explore" main menu.<br>
 * <img src="resources/guides/main-menu/main-menu-explore.png" style="height:200px; border: solid; border-width:1px"/><br>
 * 3. A step that guides the user to click on the "Class relationships" sub-menu item.<br>
 * <img src="resources/guides/main-menu/main-menu-class-relationships.png" style="height:200px; border: solid; border-width:1px"/><br>
 * 4. Optional step that will be shown only if property `introExtraContent` is passed through options<br>
 * <img src="resources/guides//class-relationships/class-relationships-view-introduction_2.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports the following options:
 *
 * @property {Object<string,string>} [introExtraContent] - If this option is present, an additional dialog will be displayed as the last step with the passed content, localized by language.
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-relationships",
 *   "options": {
 *      "introExtraContent": {
 *        "en": "The Class relationships is a complicated diagram, which by default shows only the top relationships...",
 *        "fr": "Les relations de classes constituent un diagramme complexe, qui affiche par défaut uniquement les relations principales.."
 *      }
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-relationships',
  getSteps: function(options, pluginService) {
    options.mainAction = 'class-relationships';
    const title = options.title ? options.title : pluginService.translate(this.translationBundle, DEFAULT_TITLE);
    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: {
          title,
          menu: 'class-relationships',
          showIntro: true,
          ...options
        }
      }, {
        guideBlockName: 'class-relationships-intro',
        options: {
          title,
          ...options
        }
      }
    ];

    if (options.introExtraContent) {
      steps.push({
        guideBlockName: 'class-relationships-diagram-intro',
        options: {
          title,
          content: options.introExtraContent,
          ...options
        }
      });
    }

    return steps;
  },
  translationBundle: {
    en: {
      [DEFAULT_TITLE]: 'Class relationships'
    },
    fr: {
      [DEFAULT_TITLE]: 'Relations de classe'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
