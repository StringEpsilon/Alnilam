# context.router

Alnilam uses `context.router` to facilitate communication between a `<Router>` and its descendant [`<Route>`](Route.md)s, [`<Link>`](../api/Link.md)s, [`<Prompt>`](Prompt.md)s, etc.

The RouterContext of Alnilam is considered internal API. Otherwise breaking changes to Alnilams context will not increase the major version number and
bug reports regarding resulting breakages will be ignored. Use at your own peril.
