## Differences in API / Behavior in this Fork:

* Alnilam supports relative routes (as of version 0.4).
	* A path without a leading slash or starting with "./" will match as if you appended the parent' <Route> or <Match> URL.
	* A NavLink with a relative path will apply the active style as expected
	* "../" is not supported and cause an exception.
* [```<Route/>```](./components/Route.md) no longer has a "render" or "component" prop. Instead, it will render it's children only when the path matches.
* ```<Route/>``` supports multiple children, all of which will get the router props.
* [```<Match/>```](./components/Match.md), like Route, but will always render.
* A [```<Router/>```](./components/Router.md) nested inside another Router will throw an exception (in dev builds)
* ```<MemoryRouter/>``` was removed. Use ```Router``` and createMemoryHistory instead.
* ```<BrowserRouter/>``` was removed. Use ```Router``` and createBrowserHistory instead.
* ```<HashRouter/>``` was removed. Use ```Router``` and createHashHistory instead.
* Minimum react version is 16.4 instead of 15.x

And finally:

* Dropped support for react native to unify and simplify the codebase.

## Bugfixes:

* A withRouter() wrapped component will get the wrong props when inside a [```<NavLink>```](./components/NavLink.md)
* A ```Redirect``` that always render may case an infitie update loop (and thus a stackoverflow exception)
