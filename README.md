Stellar<sup><a href="#footnote">1</a></sup> declarative routing in typescript, for React.

:star: :star2: :star:

## Why "Alnilam"?

[Alnilam](https://en.wikipedia.org/wiki/Alnilam) is a star that was used in celestial
navigation. It's one of the stars in Orions belt - which happens to be my
favorite constellation - and it's official designation is *Epsilon* Orionis.
I'm also a fan of contrived package names ;-)

## Acknowlegdements

Thanks to all original contributors of [React-Router](https://github.com/ReactTraining/react-router).

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

* [x] Verify that the build output and package.json are in order
* [x] Publish the package.
* [x] Outline (or implement) API changes and refactorings for future work.
	* [x] Document the API differences properly in a separate document.
* [ ] Figure out typing for withRouter()
* [ ] Figure out how to properly publish types along side the normal output.
* [x] Integrate typescript to rollup build without mandating tslib dependency.
* [ ] Wait for history 5.0.


<a id="footnote"><sup>1</sup></a> Because it's named after a star, not because it's so awesome.