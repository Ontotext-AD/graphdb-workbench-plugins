/**
 * @name select-ttyg-agent
 * @memberof module:Interactive Guide
 *
 * @description
 *
 * Complex step, which takes the user through the process of selecting a TTYG agent.
 * It includes steps to open the dropdown, select an agent, and handle missing repository scenarios.
 *
 * Select an agent info message<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-info-message.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Open the agent selection dropdown<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-dropdown-open.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Select an agent from the dropdown<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-from-dropdown.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * Check for missing repository<br>
 * <img src="resources/guides/ttyg/ttyg-select-agent-check-for-missing-repository-cancel.png" style="height:200px; border: solid; border-width:1px"/><br>
 *
 * @example
 * ```JSON
 * {
 *  "guideBlockName": "select-ttyg-agent",
 * }
 * ```
 */
const step = {
  guideBlockName: 'select-ttyg-agent',
  getSteps: (options) => {
    options.mainAction = 'select-ttyg-agent';

    return [
      {
        guideBlockName: 'ttyg-select-agent-info-message',
        options: {...options}
      },
      {
        guideBlockName: 'ttyg-select-agent-dropdown-open',
        options: {...options}
      },
      {
        guideBlockName: 'ttyg-select-agent-from-dropdown',
        options: {...options}
      },
      {
        guideBlockName: 'ttyg-select-agent-check-for-missing-repository-cancel',
        options: {...options}
      }
    ];
  }
};

export function register(registry) {
  registry.add('guide.step', step);
}
