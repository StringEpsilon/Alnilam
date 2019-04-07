<p align="center"> :star: :star2: :star: </p>
<p align="center">
<a href="https://bundlephobia.com/result?p=alnilam">
	<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/alnilam.svg?style=flat-square">
</a>
<a href="https://dev.azure.com/StringEpsilon/StringEpsilon/_build?definitionId=1&_a=summary" >
	<img alt="Azure DevOps builds" src="https://img.shields.io/azure-devops/build/StringEpsilon/StringEpsilon/1.svg?style=flat-square">
<a>
<a href="https://dev.azure.com/StringEpsilon/StringEpsilon/_build?definitionId=1&_a=summary" >
	<img alt="Azure DevOps coverage" src="https://img.shields.io/azure-devops/coverage/StringEpsilon/StringEpsilon/1.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/alnilam">
	<img alt="npm" src="https://img.shields.io/npm/v/alnilam.svg?style=flat-square">
</a>
</p>

## What / Why is Alnilam?

It's a fork of react-router-dom with. You can find the [differences to RR 5.0 here.](./docs/differences.md)

Motivations:

1. No more split between core library and dom. This makes the whole thing a LOT easier to understand.
2. No more react native support. A necessity of point one, but also motivated by the low download count of RR native.
3. Streamlining: Removing MemoryRouter, HashRouter, BrowserRouter. Those just wrapped ```<Router>```.
4. Break things the original can't because it would require major releases:
	* Dropping exports
	* Upping the minimum react version.
	* Changing key behaviors (like ```Route```)
5. Port the entire thing to typescript.

Ultimately, it's more about the learning experience. It's my first dabble with a library, typescript and publishing something on NPM. Alnilam also serves as my testbed for contributions back to RR.

## Acknowlegdements

Thanks to all original contributors of [React-Router](https://github.com/ReactTraining/react-router).

## Getting started:

[You can find the documenation here.](./docs/readme.md)

```npm i alnilam```

```jsx
// Minimal example using the browser history API.
import { Router, Switch, Route } from "alnilam";
import { createBrowserHistory } from "history";

const myHistory = createBrowserHistory(/* consult the history documentation for your options here*/);

function MyRouter() {
  return (
    <Router history={myHistory}>
    {/* Setting up the router itself. */}
      <Switch>
      {/* Switch will only render the first matching route: */}
        {/* And then the individual routes: */}
		<Route path="/" exact >
			<div> Epsilon Orionis </div>
		</Route>
		<Route path="/alnitak" >
			<div> Zeta Orionis </div>
		</Route>
		<Route path="/mintaka" >
			<div> Delta Orionis </div>
		</Route>
		<Route path="/ran" >
			<div> Home of Bill. </div>
		</Route>
      </Switch>
    </Router>
  );
}
```

Here is a [a small example app](https://codesandbox.io/s/kkw61p4lno) made with Alnilam. It shows:
* Nested routes
* Basic use of ```<Match>```, ```<Route>```, ```<Link>```, and ```<Switch>```
* Use of parameters in route declarations

## TODO for 1.0

* [x] Outline (or implement) API changes and refactorings for future work.
	* [x] Document the API differences properly in a separate document.
* [ ] Figure out proper typing for withRouter()
* [ ] Wait for [history 5.0](https://github.com/ReactTraining/history/issues/505).

## Why is it called "Alnilam"?

[Alnilam](https://en.wikipedia.org/wiki/Alnilam) is a star that was used in celestial
navigation. It's one of the stars in Orions belt - which happens to be my
favorite constellation - and it's official designation is *Epsilon* Orionis.
I'm also a fan of contrived package names ;-)