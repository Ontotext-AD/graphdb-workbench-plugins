# GraphDB Workbench Plugins

Since v1.2, GraphDB Workbench features a plugin system which allows components to be plugged in
without introducing coupling between new and existing components. The new system allows extending or
replacing existing components, introduction of new single or compositional components. All this
could be achieved without any changes in the rest of the system.

_Currently the new system is integrated in the workbench main components registration. These are the
components which implement the main workbench views (extension point `route`) and their respective
main menu entries (extension point `main.menu`). In next versions more extension points might be
introduced._

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Available npm Scripts](#available-npm-scripts)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Plugin Manifest](#plugin-manifest)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Plugin-based architecture** for GraphDB Workbench
- Extend or replace existing components without modifying core code
- Easy integration and validation of plugins

---

## Installation

Clone the repository and install dependencies:

```sh
git clone <repository-url>
cd graphdb-workbench-plugins
npm install
```

---

## Usage

### Building Plugins

To build the plugins for production:

```sh
npm run build
```

The output will be in the `dist/` directory.

### Development Mode

For development with automatic rebuild on changes:

```sh
npm run dev
```

### Linting

To check code style and find problems:

```sh
npm run lint
```

To automatically fix linting issues:

```sh
npm run lint:fix
```

### Documentation

To generate documentation using JSDoc:

```sh
npm run document
```

The documentation will be generated in the `docs/` directory.

---

## Available npm Scripts

| Script             | Description                                                      |
|--------------------|------------------------------------------------------------------|
| `dev`              | Watch plugin files and rebuild on changes                        |
| `build`            | Validate manifest and build plugins using webpack                |
| `validate-manifest`| Validate the plugins manifest file                               |
| `lint`             | Run ESLint on the codebase                                       |
| `lint:fix`         | Run ESLint and automatically fix problems                        |
| `document`         | Generate documentation using JSDoc                               |
| `install:ci`       | Install dependencies in CI mode (clean install)                  |
| `prepare`          | Prepare git hooks using Husky                                    |

---

## Development Workflow

1. **Clone and install dependencies** as described above.
2. **Develop plugins** in the `plugins/` directory.
3. **Run in development mode** with `npm run dev` for live rebuilding.
4. **Validate and build** with `npm run build`.
5. **Lint and fix** code with `npm run lint` and `npm run lint:fix`.
6. **Generate documentation** with `npm run document`.

---

## Project Structure

```
graphdb-workbench-plugins/
├── dist/                   # Compiled plugin output
├── docs/                   # Generated documentation
├── plugins/                # Source code for plugins
├── scripts/                # Utility scripts (e.g., manifest validation)
├── plugins-manifest.json   # Manifest describing available plugins
├── package.json            # Project configuration and scripts
├── webpack.config.js       # Webpack build configuration
├── jsdoc.config.json       # JSDoc configuration
└── README.md               # Project documentation
```

---

## Plugin Manifest

The `plugins-manifest.json` file describes all available plugins and their extension points. It is validated automatically during the build process.

---

## Contributing

Please follow these steps:

1. Fork the repository and create your branch.
2. Make your changes and ensure all lint checks pass.
3. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the [Apache-2.0 License](LICENSE).
