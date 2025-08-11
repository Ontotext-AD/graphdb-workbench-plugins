import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',

        // AngularJS globals
        angular: 'readonly',

        // Node.js globals for scripts
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly',
        global: 'readonly'
      }
    },
    rules: {
      // Code style rules
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // Best practices
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': 'error',
      'prefer-const': 'error',
      'no-var': 'error',

      // Potential problems
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-duplicate-imports': 'error'
    }
  },
  {
    // Specific configuration for Node.js scripts
    files: ['scripts/**/*.js', 'webpack.config.js'],
    languageOptions: {
      sourceType: 'module'
    },
    rules: {
      'no-console': 'off' // Allow console in build scripts
    }
  },
  {
    // Specific configuration for plugin files
    files: ['plugins/**/*.js'],
    rules: {
      'no-console': 'warn' // Allow console in plugin files but warn about it
    }
  },
  {
    // Ignore patterns
    ignores: [
      'node_modules/**',
      'dist/**'
    ]
  }
];
