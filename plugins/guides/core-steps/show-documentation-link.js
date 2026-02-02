const SHOW_DOCUMENTATION_LINK = 'guide.step_plugin.show-documentation-link.content';

/**
 * @name show-documentation-link
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides a link to the complete documentation of a certain subject. It accepts documentationPath as an option
 * and uses it to construct a general message, leading to that specific documentation page. Note that although not required,
 * it is highly recommended to provide the specific page url, where the step is used. For example, if the dialog is shown
 * in the connectors page, there should be options.url = 'connectors' provided. Otherwise, there might be unwanted navigation
 * or reloading of the page.
 *
 * Link to documentation<br>
 * <img src="resources/guides/core/show-documentation-link.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * This step can be configured using the common options defined in [Options](#.Options). Additionally, it supports:
 * @property {string} options.documentationPath - The URL of the GraphDB documentation page for the documentation e.g. lucene-graphdb-connector.html
 *
 * @examples
 * ```JSON
 * {
 *  "guideBlockName": "show-documentation-link",
 *  "options": {
 *    "title": "Custom title"
 *    "documentationPath": "lucene-graphdb-connector.html",
 *    "url": "connectors"
 *  }
 * }
 *
 * {
 *  "guideBlockName": "show-documentation-link",
 *  "options": {
 *    "content": "Custom content with a link to the <a href="https://graphdb.ontotext.com/documentation/master/lucene-graphdb-connector.html" target="_blank">GraphDB documentation</a>"
 *  }
 * }
 * ```
 */
const step = {
  guideBlockName: 'show-documentation-link',

  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    // We might want to completely override the content, at which point we don't need to provide a documentation path
    const documentationLink = options.documentationPath ? pluginService.resolveDocumentationUrl(options.documentationPath) : '';
    return [{
      guideBlockName: 'info-message',
      options: {
        content: translate(this.translationBundle, SHOW_DOCUMENTATION_LINK, {documentationLink}),
        ...options,
        documentationLink
      }
    }];
  },
  translationBundle: {
    en: {
      [SHOW_DOCUMENTATION_LINK]: 'For more information please visit <a href="{{documentationLink}}" target="_blank">GraphDB documentation</a>'
    },
    fr: {
      [SHOW_DOCUMENTATION_LINK]: 'Pour plus d\'informations, veuillez visiter la <a href="{{documentationLink}}" target="_blank">documentation GraphDB</a>'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
