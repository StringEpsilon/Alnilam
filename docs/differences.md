## Differences in API / behavior in this Fork:

* Alnilam supports relative routes (as of version 0.4).
	* A path without a leading slash or starting with "./" will match as if you appended the parent path manually. ``` `${match.pathname}/foo` ``` becomes ```"./foo"```
	* A NavLink with a relative path will apply the active style as expected
	* "../" is not supported and will throw an exception.
* [```<Route/>```](./components/Route.md) no longer has a "render" or "component" prop. Instead, it will render it's children only when the path matches.
* ```<Route/>``` supports multiple children, all of which will get the router props.
* [```<Match/>```](./components/Match.md), like Route, but will always render.
* A [```<Router/>```](./components/Router.md) nested inside another Router will throw an exception (in dev builds)
* ```<MemoryRouter/>``` was removed. Use ```Router``` and createMemoryHistory instead.
* ```<BrowserRouter/>``` was removed. Use ```Router``` and createBrowserHistory instead.
* ```<HashRouter/>``` was removed. Use ```Router``` and createHashHistory instead.
* Minimum react version is 16.8 instead of 15.x
* Alnilam [provides](./functions/withRouter.md#passed-props) ```previousLocation``` along the current ```location``` via props.
* [```Link```](./components/Link.md)) supports external URLs in a limited fashion.
* Some error messages differ.
* ```Link``` and ```NavLink``` have been merged into ```Link```.
* Uses hooks internally
* Exports ```useRouter()``` hook.
* Uses "verlauf" instead of "history". This means alnilam does not encode or decode paths for you. This might break some applications.
  - [See verlaufs documentation for a workaround.](https://github.com/StringEpsilon/verlauf/blob/master/docs/URI_Decoding.md)

And finally:

* Dropped support for react native to unify and simplify the codebase.
