import * as Utils from '../utils.js';

const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';
const OPEN_RDF_INSTANCES_SIDE_PANEL = 'guide.step_plugin.class-hierarchy-open-rdf-instances-side-panel.content';

/**
 * @name class-hierarchy-open-rdf-instances-side-panel
 * @memberof module:Interactive Guide
 *
 * @description
 * This step focuses on guiding the user to open the RDF instances side panel in the class hierarchy view.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-open-rdf-instances-side-panel.png" style="height:200px; border: solid">
 *
 * This step can be configured using the common options defined in [Options](#.Options). It requires `options.iri`
 *
 * @property {string} options.iri - The IRI of the class whose instances are to be viewed. This option is required.
 *
 * * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-open-rdf-instances-side-panel",
 *   "options": {
 *     "iri": "imdb:ColorMovie"
 *   }
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-open-rdf-instances-side-panel',
  /**
   *
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    let element;
    const translate = pluginService.translate;
    const GuideUtils = pluginService.GuideUtils;
    const selector = GuideUtils.getGuideElementSelector('class-' + options.iri);
    const RoutingUtil = pluginService.RoutingUtil;
    const title = options.title ? options.title : translate(this.translationBundle, CLASS_HIERARCHY_DEFAULT_TITLE);
    const handleDoubleClick = () => (event) => {
      event.preventDefault();
      event.stopPropagation();
      // Ensure the side panel always appears
      return Utils.reloadAndOpenInfoPanel({RoutingUtil, GuideUtils}, selector);
    };
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, OPEN_RDF_INSTANCES_SIDE_PANEL, {iri: options.iri}),
          url: 'hierarchy',
          elementSelector: selector,
          class: 'class-hierarchy-open-rdf-instances-side-panel',
          placement: 'top',
          onNextClick: (guide) => {
            GuideUtils.classHierarchyFocus(selector);
            guide.next();
          },
          show: () => () => {
            // Add a "dblclick" listener to the element.
            // We have to open side panel info manually when a selected node is clicked.
            element = document.querySelector(selector);
            if (element) {
              element.addEventListener('dblclick', handleDoubleClick, true);
            }
          },
          hide: () => () => {
            if (element) {
              element.removeEventListener('dblclick', handleDoubleClick, true);
              element = null;
            }
          },
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Class hierarchy',
      [OPEN_RDF_INSTANCES_SIDE_PANEL]: 'Click on <b>{{iri}}</b> to show its instances.'
    },

    fr: {
      [CLASS_HIERARCHY_DEFAULT_TITLE]: 'Hiérarchie de classe',
      [OPEN_RDF_INSTANCES_SIDE_PANEL]: 'Cliquez sur <b>{{iri}}</b> pour afficher ses instances.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
