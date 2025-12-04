import * as Utils from '../utils.js';

const RESOURCE_CLICK_ON_ROLE_TITLE = 'view.resource.title';
const GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_SUBJECT_CONTENT = 'guide.step_plugin.resource-click-on-role.subject.content';
const GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_PREDICATE_CONTENT = 'guide.step_plugin.resource-click-on-role.predicate.content';
const GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_OBJECT_CONTENT = 'guide.step_plugin.resource-click-on-role.object.content';
const GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_CONTEXT_CONTENT = 'guide.step_plugin.resource-click-on-role.context.content';
const GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_ALL_CONTENT = 'guide.step_plugin.resource-click-on-role.all.content';
/**
 * @name resource-click-on-role
 * @memberof module:Interactive Guide
 *
 * @description
 * The `resource-click-on-role`
 * guide step guides the user to click on a specific role tab
 * (such as subject, predicate, object, context, or all) in the resource view
 * to filter and display RDF statements based on the IRI's position.
 *
 * <img src="resources/guides/resource/resource-click-on-role.png" style="height:200px;
 * border: solid; border-width:1px"/>
 *
 * This step can be configured using the common options defined in [Options](#.Options).
 * Additionally, the following specific options are available:
 *
 * Options:
 * @property {string} options.role - The role used to select the appropriate translation content
 * (e.g., 'subject', 'predicate', 'object', 'context', 'all').
 * @property {string} options.showRole - The role used to build the element selector for the clickable tab.
 *
 * @example
 * ```json
 * {
 *   "guideBlockName": "resource-click-on-role",
 *   "options": {
 *     "role": "subject",
 *     "showRole": "subject",
 *     "skipUrl": false
 *   }
 * }
 * ```
 */

const step = {
  guideBlockName: 'resource-click-on-role',
  getSteps: function(options, services) {
    const GuideUtils = services.GuideUtils;
    const translate = services.translate;
    return [
      {
        guideBlockName: 'clickable-element',
        options: {
          content: translate(this.translationBundle, `guide.step_plugin.resource-click-on-role.${options.role}.content`),
          title: translate(this.translationBundle, RESOURCE_CLICK_ON_ROLE_TITLE),
          ...options,
          ...(options.skipUrl ? {} : {url: Utils.getResourceURL(options)}),
          elementSelector: GuideUtils.getGuideElementSelector('role-' + options.showRole),
          class: 'visual_graph-role',
          onNextClick: (guide, step) => {
            GuideUtils.waitFor(step.elementSelector, 3)
              .then(() => document.querySelector(step.elementSelector).click());
          }
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [RESOURCE_CLICK_ON_ROLE_TITLE]: 'Resource',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_SUBJECT_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>subject</b> tab.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_PREDICATE_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>predicate</b> tab.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_OBJECT_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>object</b> tab.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_CONTEXT_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>context</b> tab.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_ALL_CONTENT]: 'You can configure the view to show RDF statements where the current IRI is the <i>subject</i>, <i>predicate</i>, <i>object</i>, <i>context</i> or in any position. Click on the <b>all</b> tab.'
    },
    fr: {
      [RESOURCE_CLICK_ON_ROLE_TITLE]: 'Ressource',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_SUBJECT_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>sujet</b>.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_PREDICATE_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>prédicat</b>.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_OBJECT_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>objet</b>.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_CONTEXT_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>contexte</b>.',
      [GUIDE_STEP_PLUGIN_RESOURCE_CLICK_ON_ROLE_ALL_CONTENT]: 'Vous pouvez configurer la vue pour afficher les déclarations RDF où l\'IRI actuel est le <i>sujet</i>, le <i>prédicat</i>, l\'<i>objet</i>, le <i>contexte</i> ou dans n\'importe quelle position. Cliquez sur l\'onglet <b>tous</b>.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
