/**
 * @module console-tool
 * @category plugins
 * @subcategory tools
 */

/**
 * Register the console tool with the given registry.
 * @param registry
 */
export function register(registry) {
  const definition = {
    label: 'Console Tool',
    action: () => console.log('New tool action')
  };
  console.log('%cRegister', 'background: yellow', definition.label);
  registry.add('tools', definition);
}
