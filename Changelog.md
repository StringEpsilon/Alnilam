
## 0.2.0 (future)

### Public:

* Implemented ```Match```

Match will always render the child components, like ```Route``` does in react-router@5 or alnilam@0.1.0. Unlike Route, it doesn't have a 
render or component prop. It will instead just calculate the match and give it as a prop to the child.

* Added onKeyPress handler to ```Link``` for slightly improved accessibility.

### Internal:

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