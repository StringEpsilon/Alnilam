## 0.2.1 (2019-03-24)

* Fixed filename of ESM build (alnilam.min.js -> alnilam.js)
* Fixed entry points in package.json.

## 0.2.0 (2019-03-24)

* Implemented ```Match```

Match will always render the child components, like ```Route``` does in react-router@5 or alnilam@0.1.0. Unlike Route, it doesn't have a 
render or component prop. It will instead just calculate the match and give it as a prop to the child.

* Improved test coverage of ```Prompt```
* Improved test coverage of ```Link```

## 0.1.0 (2019-03-22)

Initial release of Alnilam.

Changes from react-router / react-router-dom (forked from commit 4736cfe01d):

* Removed MemoryRouter
* Removed HashRouter
* Removed BrowserRouter
* Fixed a bug in NavLink: NavLink overrode the path in the router context for it's children, causing withRouter() to missbehave inside a NavLink
* Ported all files (except for one test) to TypeScript.
* Rough pass on the docs to reflect these changes.
* Minimum react version is now 16.4