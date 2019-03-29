## 0.3.0-beta.3

* Pass alnilam props to all children of ```Route``` and ```Match```.
* Fixed an infinite loop of updates caused by Redirect in some cases.

## 0.3.0-beta.2 (2019-03-27)

I messed up my packaging and publishing. Sorry for the inconvienience.

Still new for me. Especially beta stuff.

## 0.3.0-beta.1 (2019-03-27)

### BREAKING:

* ```Route```: Removed render prop
* ```Route```: Removed component
* ```Route```: Render children only if the path matches.

Quick migration guide:

```jsx

<Route to="/rigel" component={MyComponent}/>

// becomes:

<Route to="/rigel">
	<MyComponent />
</Route>
```

### Changes and fixes:

* Fixed component names in warnings and invariant exceptions.
* Bumped @babel/runtime to 7.4.0
* Swap Route for Match inside withRouter().
* Tweaked how props are passed to Children of Match


```jsx
<Match path="foo">
	<MyComponent/> {/* MyComponent will now get the usual props. */}
</Match>
```


### Internal:

* Added tslint (and then reformatted a lot of code)
* Bumped some devDependencies

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