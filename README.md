Stellar declarative routing in typescript, for React.

:star: :star2: :star: 

## Why "Alnilam"?

[Alnilam](https://en.wikipedia.org/wiki/Alnilam) is a star that was used in celestial
navigation. It's one of the stars in Orions belt - which happens to be my 
favorite constellation - and it's official designation is *Epsilon* Orionis. 
I'm also a a fan of contrived package names ;-)

## Thanks

Thanks to all original contributors of [React-Router](https://github.com/ReactTraining/react-router). 

## What / Why is Alnilam?

It's a fork of react-router-dom with. As for why:

1) The fork gets rid of the router / router-dom separation. Just one package and no react
native support. This makes the whole thing a LOT easier to understand, imho. 
(And react-router-native isn't as popular anyway.)

2) No more BrowserRouter, HashRouter, and MemoryRouter, as those are just 
fancy wrappers for ```createHistory()``` and ```<Router/>```. Keep it simple :)

3) Break things the original can't because it would require major releases. 
Like upping the required react version, drop stuff, introduce new components, change ```Route```'s behavior, etc.

4) Port the entire thing to typescript.

5) As a learning experience: This is my first typescript project, my first library, 
my first NPM package. 

## Getting started:

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
        <Route path="/" exact component={() => <div> Epsilon Orionis </div>}/>
        <Route path="/alnitak" component={() => <div> Zeta Orionis </div>}/>
        <Route path="/mintaka" component={( )=> <div> Delta Orionis </div>}/>
        <Route path="/ran" component={() => <div> Home of Bill. </div>}/>
      </Switch>
    </Router>
  );
}

```

## TODO for 1.0

* [ ] Verify that the build output and package.json are in order
* [x] Publish the package.
* [ ] Outline API changes and refactorings for future work.
* [ ] Figure out typing for withRouter()
* [ ] Figure out how to properly publish types along side the normal output.
* [ ] Integrate typescript to rollup build without mandating tslib dependency. Somehow