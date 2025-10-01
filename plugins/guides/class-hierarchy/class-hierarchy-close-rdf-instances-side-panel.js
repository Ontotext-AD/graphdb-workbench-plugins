const SIDE_PANEL_CONTENT = 'guide.step_plugin.class-hierarchy-close-rdf-instances-side-panel.content';
const RDF_INSTANCES_TITLE = 'guide.step_plugin.class-hierarchy-instances.title';

/**
 * @name class-hierarchy-close-rdf-instances-side-panel
 * @memberof module:Interactive Guide
 *
 * @description This step guides the user to close the RDF instances side panel by clicking on the close (X) icon.
 *
 * <img src="resources/guides/class-hierarchy/class-hierarchy-close-rdf-instances-side-panel.png" style="height:200px; border: solid; border-width:1px"/>
 *
 * @example
 * ```JSON
 * {
 *   "guideBlockName": "class-hierarchy-close-rdf-instances-side-panel"
 * }
 * ```
 */
const step = {
  guideBlockName: 'class-hierarchy-close-rdf-instances-side-panel',
  /**
   * @param {Options} options - Options object containing settings and parameters for the step.
   * @param {PluginServiceInterface} pluginService - The plugin service used to interact with the application (e.g., translations).
   */
  getSteps: function(options, pluginService) {
    const GuideUtils = pluginService.GuideUtils;
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(this.translationBundle, RDF_INSTANCES_TITLE);
    const closeButtonSelector = GuideUtils.getGuideElementSelector('close-info-panel');
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          title,
          content: translate(this.translationBundle, SIDE_PANEL_CONTENT),
          url: 'hierarchy',
          canBePaused: false,
          elementSelector: closeButtonSelector,
          class: 'class-hierarchy-close-rdf-instances-side-panel',
          placement: 'left',
          onNextClick: () => GuideUtils.waitFor(closeButtonSelector, 3)
            .then(() => GuideUtils.clickOnElement(closeButtonSelector)()),
          ...options
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [SIDE_PANEL_CONTENT]: 'You can close the panel by clicking on the X icon.',
      [RDF_INSTANCES_TITLE]: 'Class hierarchy instances'
    },

    fr: {
      [SIDE_PANEL_CONTENT]: 'Vous pouvez fermer le panneau en cliquant sur l\'icône X.',
      [RDF_INSTANCES_TITLE]: 'Instances de hiérarchie de classes'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
