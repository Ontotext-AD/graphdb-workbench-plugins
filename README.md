# graphdb-workbench-plugins
GraphDB Workbench plugins

Since v1.2, GraphDB workbench features a plugin system which allows components to be plugged in
without introducing coupling between new and existing components. The new system allows extending or
replacing existing components, introduction of new single or compositional components. All this
could be achieved without any changes in the rest of the system.

_Currently the new system is integrated in the workbench main components registration. These are the
components which implement the main workbench views (extension point `route`) and their respective
main menu entries (extension point `main.menu`). In next versions more extension points might be
introduced._