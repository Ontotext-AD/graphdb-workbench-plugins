import * as Utils from '../utils.js';

const step = {
  guideBlockName: 'class-hierarchy-open-rdf-instances-side-panel',
  getSteps: (options, services) => {
    let element;
    const GuideUtils = services.GuideUtils;
    const selector = GuideUtils.getGuideElementSelector('class-' + options.iri);
    const RoutingUtil = services.RoutingUtil;
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
          content: 'guide.step_plugin.class-hierarchy-open-rdf-instances-side-panel.content',
          url: 'hierarchy',
          elementSelector: selector,
          class: 'class-hierarchy-open-rdf-instances-side-panel',
          placement: 'top',
          // If mainAction is set the title will be set automatically
          ...(options.mainAction ? {} : {title: Utils.CLASS_HIERARCHY_DEFAULT_TITLE}),
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
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
