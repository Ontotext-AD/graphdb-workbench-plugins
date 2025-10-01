const EXPLORE_CLASS_HIERARCHY = 'guide.step-action.class-hierarchy';
/**
 * @name class-hierarchy
 * @memberof module:Interactive Guide
 *
 * @description
 * The Class Hierarchy step is a complex step, which provides an interactive guide for users to explore and understand
 * the class hierarchy visualization within the application.
 *
 * Click on explore menu<br>
 * <img src="resources/guides/class-hierarchy/click-explore-menu.png" style="height:200px; border: solid; border-width:1px"/><br>
 * Click on class hierarchy submenu<br>
 * <img src="resources/guides/class-hierarchy/click-class-hierarchy.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Class hierarchy dataset intro<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Dataset intro<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-dataset-intro.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Zoom on a class<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-zoom-class.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Explain a class<br>
 * <img src="resources/guides/class-hierarchy/class-hierarchy-explain-class.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * The step can be configured using the common options defined in [Options](#.Options).
 *
 * @property {Object} introExtraContent - bundle object, which, if provided, will show `class-hierarchy-dataset-intro`
 * @property {Object[]} zoomIris - array of objects, which should be zoomed in.
 * @property {string} zoomIris.iri - IRI of the class to zoom in
 * @property {Object} zoomIris.postExtraContent - bundle object, which, if provided, will show `class-hierarchy-explain-class`
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy",
 *   "options": {
 *     "introExtraContent": {
 *       "en": "In this dataset, there is a single top-level class, <b>schema:Movie</b>, and two subclasses (the smaller circles inside). This tells us that the dataset has to do with movies."
 *     },
 *     "zoomIris": [
 *       {
 *         "iri": "schema:Movie",
 *         "postExtraContent": {
 *           "en": "The two subclasses, <b>imdb:BlackandWhiteMovie</b> and <b>imdb:ColorMovie</b>, tell us that the movies are divided into black-and-white and color ones, and there are more color movies than black-and-white ones since the <b>imdb:ColorMovie</b> circle is larger."
 *         }
 *       }
 *     ]
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy',

  /**
   *
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, EXPLORE_CLASS_HIERARCHY);
    options.mainAction = 'class-hierarchy';
    const steps = [
      {
        guideBlockName: 'click-main-menu',
        options: {
          title,
          menu: 'class-hierarchy',
          showIntro: true,
          ...options
        }
      }, {
        guideBlockName: 'class-hierarchy-intro',
        options: {
          title,
          ...options
        }
      }
    ];

    if (options.introExtraContent) {
      steps.push({
        guideBlockName: 'class-hierarchy-dataset-intro',
        options: {
          title,
          content: options.introExtraContent,
          ...options
        }
      });
    }

    if (Array.isArray(options.zoomIris)) {
      options.zoomIris.forEach((zoomIri) => {
        steps.push({
          guideBlockName: 'class-hierarchy-zoom-class',
          options: {
            title,
            iri: zoomIri.iri,
            ...options
          }
        });
        if (zoomIri.postExtraContent) {
          steps.push({
            guideBlockName: 'class-hierarchy-explain-class',
            options: {
              title,
              content: zoomIri.postExtraContent,
              beforeShowPromise: GuideUtils.deferredShow(800),
              iri: zoomIri.iri,
              ...options
            }
          });
        }
      });
    }

    return steps;
  },
  translationBundle: {
    en: {
      [EXPLORE_CLASS_HIERARCHY]: 'Explore the class hierarchy'
    },
    fr: {
      [EXPLORE_CLASS_HIERARCHY]: 'Explorer la hiérarchie des classes'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
