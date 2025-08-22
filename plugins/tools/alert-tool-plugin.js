/**
 * @module alert-tool
 * @category plugins
 * @subcategory tools
 */

/**
 * This function registers the alert-tool with the provided plugin registry.
 *
 * @param {object} registry - The plugin registry object.
 */
export function register(registry) {
  const definition = {
    label: 'Alert Tool',
    action: () => {
      alert('Alert tool action');
    }
  };
  console.log('%cRegister', 'background: yellow', definition.label);
  registry.add('tools', definition);
}
