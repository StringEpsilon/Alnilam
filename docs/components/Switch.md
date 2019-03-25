[back to documentation overview](../readme.md)

## Switch

Exclusively renders the first [```Match```](./Match.md), [```Route```](./Route.md) or [```Redirect```](./Redirect.md) that matches to the current location.

### Props

| prop     | type                            | required | purpose |
|----------|---------------------------------|----------|---------|
| location | [Location](../types/Location.md)| no       | Overrides current location from history for matching
| children | React element                   | no       | The components you want to "switch" on

### Example usage

```jsx
import { Router, Switch, Route } from "alnilam";
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

<Router history={history}>
  <Switch>
    <Route path="/proxima/b" component={ExoPlanet} />
    <Route path="/proxima" component={ProximaCentauri}/>
    <Route path="/" component={EpsilonOrionis}/>
  </Switch>
</Router>
```

Without a Switch, the above code would render all three components if the user navigates to ```/proxima/b```, because none of the routes are resticted to exact matches.

This is useful if you have nested routes and don't want to specify exact matches for all possible paths.

### Caveats

0. ```Switch``` does not work outside of a ```<Router>``` and will throw an invariant exception..
1. Providing children other than Route or Redirect will interfere with the functionality of Switch.

```jsx
// This switch will always render "Delta Pavonis" and never render "Rigel".
<Switch>
  <div> Delta Pavonis </div>
  <Route path="/rigel" component={Rigel}/>
</Switch>
```

2. To avoid unwanted behavior: When overriding the location, make sure the location prop does not change from null/undefined to a location object or vice versa.