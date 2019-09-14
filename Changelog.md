## Future

**Breaking:**
* Dropped RouterContext export. You can extend alnilam functionality using hooks instead.

**Bugfixes:**
* More forgiving propTypes for `wrappedComponentRef` on withRouter HOC.

**Changes:**
* Removed warning for chaning `location` prop on Match, Route and Switch.
* Match and Route now use hooks internally and are functional components.
* ESM build now includes a pre-minified version.
* Minifaction now done with terser instead of uglify.
* Updated history dependency to 4.10.1
* Updated babel/runtime dependency to 7.6.0

## 0.8.1 - 2019-04-26

**Features:**
* Added `useMatch(path|options)` hook.

**Changes:**
* Fixed NavLink import warnings popping up in unit tests.
* Fixed typo in interface declaration for RoutingProps and RouterContext.
* Improved typing of `MatchResult.params`.
* Added documentation for useRouter()
* Added documentation for useMatch()

## 0.8.0 (2019-04-21)

### BREAKING:
* Requires react 16.8
* Merged NavLink into Link. Link now has the full capabilities of NavLink by default.

**Changes:**
* Now uses hooks internally for some components
* Warn about the future deletion of the NavLink export. For now, it just re-exports `Link`
* Upgraded `react-is` dependency to `^16.8.0`

**Features:**
* Added useRouter() hook.
* Added `<Focus>` component for simple focus management.
* Added `manageFocus` prop to `Router`.
* Allow merging of `<Link to={Location}/>` with the current history location.

**Bugfixes:**
* Don't navigate if `<Link onClick/>` throws an exception.

**Other changes:**
* Added more doc strings on accross components, interfaces and functions and include them in the unminified ESM and CJS build.

## 0.7.0 - Skipped

0.7.0 was only published as a 'next' tagged release with the hooks changes of 0.8.0.

## 0.6.1 (2019-04-11)

**Bugfixes**:
* Fixed CJS build. A big thank you to wessberg. :)

## 0.6.0 (2019-04-10)

**Bugfixes**:
* Redirect could still cause an update-loop when ```to``` was a location object.
* Fixed build on windows.

**Features**:
* Experimental: A ```<Link to="">``` starting with "http(s)://" will act like a normal ```<a>``` element.
* Router props now contains "previousLocation". Note: This is undefined before first navigation.

**Changes**:
* Router now stores history in state, so changing the prop won't have any (ill) effect.
* Tweaked error messages:
	* Warning about paths staring with "../" now includes the path in question.
	* Warning about location prop changing from controlled to uncontrolled now points to the location prop.
	* Removed warning about child function returning undefined, as it's obsolete.
	* Changed warning about changing ```<Router history>```
	* More strict warning about using a ```<Router>``` inside another. From "You shouldn't" to "It can't work".

**Known issues:**
CJS is currently broken. My apologies.

## 0.5.0 (2019-04-04)

* Change: Now comes with types!
* Change: Context.Provider and Context.Consumer now have the correct displayName attributes.
* Change: Reduced component nesting in withRouter.
* Change: Improved error message when using a withRouter-wrapped component outside a Router.

Internal:
* Some general housekeeping (readme, devDepenencies, moving code around, ...).

## 0.4.0 (2019-04-02)

* Relative paths for all your routing pleasure! No more ``` `${match.url}/foo` ```.
	* A path is considered as relative to it's parent Match or Route when starting with "./" or when it has no leading slash.
* Router: When nested inside another Router, will throw an exception (in development).

* Various internal cleanups.

## 0.3.0 (2019-03-27):

### BREAKING:

* ```Route```: Removed render prop
* ```Route```: Removed component
* ```Route```: Render children only if the path matches.

Quick migration guide:

```jsx
// 0.2.x:
<Route to="/rigel" component={MyComponent}/>

// 0.3.0:
<Route to="/rigel">
	<MyComponent />
</Route>
```

```jsx
// 0.2.x:
<Route to="/rigel" >
	<MyComponent/>
</Route>

// 0.3.x:
<Match to="/rigel">
	<MyComponent />
</Match>
```

### Changes:

* Route now supports multiple children
* Match now supports multiple children
* Match and Route now support ClassComponents as children:

```jsx
<Match path="foo">
	<MyComponent/> {/* MyComponent will now get the usual props. */}
</Match>
```

* Bumped @babel/runtime to 7.4.0

### Bugfixes:

* Fixed an infinite loop of updates caused by Redirect in some cases.
* Fixed component names in warnings and invariant exceptions.

### Internal:

* Swap Route for Match inside withRouter().
* Integrated typescript into the rollup-build properly using @wessberg/rollup-plugin-ts
  * the transpilation is still done using babel and there is no dependency on tslib, just @babel/runtime
  * Build output is now smaller too, since the plugin shakes out type imports.
* New documentation format

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
