// Auto-discover and register all plugins without manual imports.
const ctx = import.meta.webpackContext('./', {
  recursive: true,
  // Exclude this file; include only \*.js
  regExp: /^(?!.*\/?plugins-bundle\.js$).*\.js$/,
  mode: 'sync'
});

// Resolve a usable register function from various export styles.
function resolveRegister(mod) {
  if (typeof mod === 'function') {
    return mod;
  }
  if (mod && typeof mod.register === 'function') {
    return mod.register;
  }
  if (mod && typeof mod.default === 'function') {
    return mod.default;
  }
  if (mod && mod.default && typeof mod.default.register === 'function') {
    return mod.default.register;
  }
  return null;
}

// Gather all register functions in a stable order.
const registerFns = ctx.keys()
  .sort()
  .map((k) => resolveRegister(ctx(k)))
  .filter(Boolean);

// Public API: register all discovered plugins.
export function register(registry) {
  for (const register of registerFns) {
    register(registry);
  }
}

