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
  };
};

/**
 * Configures an element interactability, by consuming events and preventing them from propagating.
 * This allows to keep scrolling, while disallowing interaction with other elements
 * (such as clicking buttons).
 * @param interactable - true to make the element interactable, false to make it non interactable
 * @param elementSelector - the elementSelector
 * @param services - The services object
 */
const _configureInteractions = (interactable, elementSelector, services) => () => {
  if (!elementSelector) {
    return;
  }
  const eventsToPrevent = ['click', 'dblclick'];
  services.GuideUtils.getOrWaitFor(elementSelector)
    .then((element) => {
      if (interactable) {
        eventsToPrevent.forEach((event) => element.removeEventListener(event, preventDefault, true));
      } else {
        eventsToPrevent.forEach((event) => element.addEventListener(event, preventDefault, true));
      }
    });
};

export const disableInteractions = (elementSelector, services) => _configureInteractions(false, elementSelector, services);
export const enableInteractions = (elementSelector, services) => _configureInteractions(true, elementSelector, services);

const preventDefault = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const CLASS_HIERARCHY_DEFAULT_TITLE = 'view.class.hierarchy.title';
export const CLASS_HIERARCHY_RDF_INSTANCES_DEFAULT_TITLE = 'guide.step_plugin.class-hierarchy-instances.title';
export const CLASS_RELATIONSHIPS_DEFAULT_TITLE = 'view.class.relationships.title';
export const REPOSITORIES_CREATE_DEFAULT_TITLE = 'guide.step-action.create-repository';
export const CREATE_SIMILARITY_INDEX_DEFAULT = 'guide.step-action.create-similarity-index';
export const ENABLE_AUTOCOMPLETE_DEFAULT_TITLE = 'guide.step-action.enable-autocomplete';
export const SPARQL_EDITOR_DEFAULT_TITLE = 'view.sparql-editor.title';
export const SPARQL_DIRECTIVE_SELECTOR = '#query-editor';
export const IMPORT_FILE_DEFAULT_STEP_TITLE = 'guide.step-action.import-file';
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
};

export const enableAllRDFClasses = () => {
  document.querySelectorAll('.rdf-class')
    .forEach((el) => {
      el.classList.remove('disable-rdf-class');
    });
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
    options: angular.extend({}, {
      content: 'guide.step_plugin.ask-ttyg-agent.wait-for-answer',
      class: 'wait-for-answer',
      url: 'ttyg',
      placement: 'left',
      elementSelector: GuideUtils.getGuideElementSelector('chat-details'),
      elementSelectorToWait: GuideUtils.getGuideElementSelector('question-loader')
    }, options)
  };
};
