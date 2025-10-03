const CONVERSATION_WITH_AGENT_DEFAULT_TITLE = 'guide.step-action.conversation-with-ttyg-agent';
const CONVERSATION_WITH_AGENT_INFO = 'guide.step_plugin.conversation-with-ttyg-agent.info';

/**
 * @name ttyg-conversation-info-message
 * @memberof module:Interactive Guide
 *
 * @description
 * This step provides an informational message about the Talk To Your Graph (TTYG) feature.
 * It explains the purpose of the TTYG view and how users can interact with it using natural language queries.
 *
 * TTYG conversation info message<br>
 * <img src="resources/guides/ttyg/ttyg-conversation-info-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "ttyg-conversation-info-message",
 * }
 * ```
 */
const step = {
  guideBlockName: 'ttyg-conversation-info-message',
  getSteps: function(options, pluginService) {
    const translate = pluginService.translate;
    const title = options.title ? options.title : translate(step.translationBundle, CONVERSATION_WITH_AGENT_DEFAULT_TITLE);
    return [
      {
        guideBlockName: 'info-message',
        options: {
          title,
          skipPoint: true,
          class: 'conversation-info',
          content: translate(step.translationBundle, CONVERSATION_WITH_AGENT_INFO),
          ...options,
          url: 'ttyg'
        }
      }
    ];
  },
  translationBundle: {
    en: {
      [CONVERSATION_WITH_AGENT_DEFAULT_TITLE]: 'Conversation with the agent',
      [CONVERSATION_WITH_AGENT_INFO]: 'The Talk To Your Graph view provides a chat-like interface for querying your data. Natural language queries are written in the chatbox at the bottom of the screen. With the aid of LLM technology, they are translated into a machine-readable question and the RDF answer is narrated back to you.'
    },

    fr: {
      [CONVERSATION_WITH_AGENT_DEFAULT_TITLE]: 'Conversation avec l\'agent',
      [CONVERSATION_WITH_AGENT_INFO]: 'La vue Talk To Your Graph (Parlez à votre graphique) offre une interface de type chat pour interroger vos données. Les requêtes en langage naturel sont écrites dans la boîte de dialogue en bas de l\'écran. Grâce à la technologie LLM, elles sont traduites en une question lisible par une machine et la réponse RDF vous est racontée.'
    }
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
