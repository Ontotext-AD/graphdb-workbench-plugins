/**
 * List of common DOM events to consider for interaction control.
 * @type {string[]}
 */
const COMMON_DOM_EVENTS = [
  'click',
  'dblclick',
  'keydown',
  'keypress',
  'keyup',
  'input',
  'submit',
  'scroll',
  'wheel'
];
export const SCROLL_EVENTS = ['scroll', 'wheel'];

/**
 * This function will be called before show a step. Step will be shown after promise is resolve. It waits element of step to be visible on the page.
 * @param {*} services
 * @param {string} elementSelector
 * @param {number} maxWaitTime
 * @return {function(): *}
 */
export const beforeShowPromise = (services, elementSelector, maxWaitTime) => {
  return () => {
    return services.GuideUtils.waitFor(elementSelector, maxWaitTime)
      .catch((error) => {
        // error is caught just to show notification in generic way.
        services.toastr.error(services.$translate.instant('guide.unexpected.error.message'));
        // throw the error, otherwise guide will continue with the next step.
        throw error;
      });
  };
};

export const createCopyToInputListener = (elementSelector, text) => {
  return (event) => {
    event.preventDefault();
    const inputElement = document.querySelector(elementSelector);
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input', {bubbles: true}));
  };
};

/**
 * Configures an element interactability, by consuming events and preventing them from propagating.
 * This allows to keep scrolling, while disallowing interaction with other elements
 * (such as clicking buttons).
 * @param {string[]} allowedEvents - List of event types to allow.
 * @param interactable - true to make the element interactable, false to make it non interactable
 * @param elementSelector - the elementSelector
 * @param services - The services object
 */
const _configureInteractions = (allowedEvents, interactable, elementSelector, services) => () => {
  if (!elementSelector) {
    return;
  }

  services.GuideUtils.getOrWaitFor(elementSelector)
    .then((element) => {
      const eventsToPrevent = COMMON_DOM_EVENTS.filter((event) => !allowedEvents.includes(event));
      if (interactable) {
        eventsToPrevent.forEach((event) => element.removeEventListener(event, preventDefault, true));
      } else {
        eventsToPrevent.forEach((event) => element.addEventListener(event, preventDefault, true));
      }
    });
};

/**
 * Enables all interactions on the specified element.
 *
 * @param {string} elementSelector - A CSS selector identifying the target element.
 * @param {Object} services - An object containing utility services, including GuideUtils.
 */
export const allowAll = (elementSelector, services) => _configureInteractions([], true, elementSelector, services);

/**
 * Restricts the specified element to only process events listed in <code>allowedEvents</code>.
 *
 * @param {string[]} allowedEvents - An array of event types that should remain enabled.
 * @param {string} elementSelector - A CSS selector identifying the target element.
 * @param {Object} services - An object containing utility services, including GuideUtils.
 */
export const allowEvents = (allowedEvents, elementSelector, services) => _configureInteractions(allowedEvents, false, elementSelector, services);

/**
 * Prevents the default action of an event and stops its propagation.
 * @param {Event} event - The event to prevent.
 */
const preventDefault = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';
export const CLASS_HIERARCHY_RDF_INSTANCES_DEFAULT_TITLE = 'guide.step_plugin.class-hierarchy-instances.title';
export const CLASS_RELATIONSHIPS_DEFAULT_TITLE = 'view.class.relationships.title';
export const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
export const CREATE_SIMILARITY_INDEX_DEFAULT = 'guide.step-action.create-similarity-index';
export const SPARQL_EDITOR_DEFAULT_TITLE = 'view.sparql-editor.title';
export const SPARQL_DIRECTIVE_SELECTOR = '#query-editor';
export const RDF_RANK_DEFAULT_TITLE = 'view.rdf.rank.title';
export const RESOURCE_DEFAULT_TITLE = 'view.resource.title';
export const REPOSITORIES_DEFAULT_TITLE = 'guide.step_plugin.repositories.default-title';
export const VISUAL_GRAPH_DEFAULT_TITLE = 'visual.graph.label';
export const TTYG_ASK_DEFAULT_TITLE = 'guide.step-action.ask-ttyg-agent';
export const CONVERSATION_WITH_AGENT_DEFAULT_TITLE = 'guide.step-action.conversation-with-ttyg-agent';
export const TTYG_CREATE_AGENT_DEFAULT_TITLE = 'guide.step-action.create-ttyg-agent';
export const TTYG_EDIT_AGENT_DEFAULT_TITLE = 'guide.step-action.edit-ttyg-agent';
export const TTYG_SELECT_AGENT_DEFAULT_TITLE = 'guide.step-action.select-ttyg-agent';
export const TTYG_DEFAULT_TITLE = 'menu.ttyg.label';
export const FTS_METHOD_DEFAULT_TITLE = 'guide.step-action.fts-search-method';
export const SIMILARITY_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.similarity-search-method';
export const TTYG_SPARQL_SEARCH_METHOD_DEFAULT_TITLE = 'guide.step-action.sparql-search-method';
export const CONNECTORS_DEFAULT_TITLE = 'menu.connectors.label';
export const LUCENE_DEFAULT_TITLE = 'guide.step_plugin.connectors-lucene.title';
export const LUCENE_CONNECTOR_NAME = 'Lucene';
export const SKIP_SECTION = {
  en: 'Skip section',
  fr: 'Sauter la section'
};

// Configuration options constants
export const CONFIGURATION_OPTION_ONTOLOGY_GRAPH = 'ontologyGraph';
export const CONFIGURATION_OPTION_SPARQL_QUERY = 'sparqlQuery';

export const reloadAndOpenInfoPanel = (services, clasInstanceSelector) => {
  services.RoutingUtil.navigate('/hierarchy');
  return services.GuideUtils.waitFor(clasInstanceSelector, 3)
    .then(() => {
      services.GuideUtils.classHierarchyFocus(clasInstanceSelector);
      // Wait a little time animation to complete.
      return services.GuideUtils.deferredShow(500)();
    });
};

export const disableAllRDFClasses = () => {
  document.querySelectorAll('.rdf-class')
    .forEach((el) => {
      el.classList.add('disable-rdf-class');
    });
  disableSidebarInteraction();
};

export const enableAllRDFClasses = () => {
  document.querySelectorAll('.rdf-class')
    .forEach((el) => {
      el.classList.remove('disable-rdf-class');
    });
  enableSidebarInteraction();
};

export const disableSidebarInteraction = () => {
  document.querySelector('.rdf-info-side-panel')
    .classList
    .add('pointer-events-none');
};

export const enableSidebarInteraction = () => {
  document.querySelector('.rdf-info-side-panel')
    .classList
    .remove('pointer-events-none');
};

export const createDownloadClickHandler = (resourcePath, resourceFile, services) => {
  return (event) => {
    event.preventDefault();
    services.GuidesService.downloadGuidesFile(resourcePath, resourceFile);
  };
};

export const createCopyToEditorListener = (YasguiComponentDirectiveUtil, sparqlDirectiveSelector, query) => {
  return (event) => {
    event.preventDefault();
    YasguiComponentDirectiveUtil.setQuery(sparqlDirectiveSelector, query).then(() => {
    });
  };
};

export const getResourceURL = (options) => {
  let url = 'resource?role=';
  url += options.role ? options.role : 'subject';
  if (options.iri) {
    url += `&uri=${encodeURIComponent(options.iri)}`;
  }
  return url;
};

export const getRepositoryName = (services, options) => {
  return services.$repositories.getRepositories().find((repo) => repo.id === options.repositoryId) ? options.repositoryId : options.repositoryIdBase;
};

export const getRepositoryElementSelector = (services, options) => {
  return services.GuideUtils.getGuideElementSelector(`repository-id-${getRepositoryName(services, options)}`);
};

export const setRepositorySelectorAutoClose = (autoClose) => {
  const component = document.querySelector('.onto-repository-selector');
  if (component) {
    // Enable auto-close when the guide step is closed.
    component.autoClose = autoClose;
  }
};

export const disableAllVisualGraphNodes = () => () => {
  $('.node-wrapper').addClass('disable-visual-graph-node');
};

export const enableAllVisualGraphNodes = () => () => {
  $('.node-wrapper').removeClass('disable-visual-graph-node');
};

export const getWaitForAnswerStep = (GuideUtils, options) => {
  return {
    guideBlockName: 'hold-and-wait-until-hidden',
    options: {
      content: 'guide.step_plugin.ask-ttyg-agent.wait-for-answer',
      class: 'wait-for-answer',
      url: 'ttyg',
      elementSelector: GuideUtils.getGuideElementSelector('chat-details'),
      elementSelectorToWait: GuideUtils.getGuideElementSelector('question-loader'),
      ...options
    }
  };
};

export const getConnectorNameSelector = (options, services) => {
  return services.GuideUtils.getGuideElementSelector(`connector-name-${options.connectorName}`);
};

export const getConnectorContentSelector = (options, services) => {
  return services.GuideUtils.getGuideElementSelector(`${options.instanceName}-connector-content`);
};

export const getConnectorParameterSelector = (options, services) => {
  return services.GuideUtils.getGuideElementSelector(`${options.parameterName}-connector-parameter`);
};

export const getConnectorSubparameterSelector = (options, services) => {
  return services.GuideUtils.getGuideElementSelector(`${options.subparameterName}-connector-subproperty`);
};
