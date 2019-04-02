[back to documentation overview](../readme.md)

## Route

Component to declare a route within your application. Route will only render it's children if the given path matches the current location.

Route will pass on the ```history```, ```location```(../types/location.md) and ```match```(../types/match.md) as props to all children.

A route without a path will always render it's children, but in that case the ```match``` prop will be null.

### Props

| prop      | type          |required  |purpose|
|-----------|---------------|----------|-------|
| path      | string        | no       | Path to match against the current location
| exact     | bool          | no       | Whether or not the route matched [exactly](../recipes/matching_options.md#exact)
| strict    | bool          | no       | Whether or not the route matched [strictly](../recipes/matching_options.md#strict)
| sensitive | bool          | no       | Whether or not to use [case sensitive matching]../recipes/matching_options.md#sensitive)
| children  | React element | no       | Child elements
| location  | [Location](../types/Location.md)| no       | Overrides current location from history for matching

Note: A ```path``` without a leading slash or with a leading "./" will be considered relative to it's parent Route or Match.

### Example usage

Basic app setup:

```jsx
<Router history={history}>
  <Route exact path="/">
    <Home/>
  </Route>
  <Route path="/kitchen">
    <Kitchen/>
  </Route>
  <Route path="/bathroom">
    <Bathroom/>
  </Route>
</Router>
```

Pathless route and difference to [Match](./Match.md):

```jsx
<Router >
  <Route>
	{/* A will always render with match = null */}
	<A/>
  </Route>
  <Match>
	{/* A will always render with match = null */}
	<A/>
  </Match>
  <Route path="/B">
	{/* B will only render when location matches */}
	<B/>
  </Route>
  <Match path="/B">
	{/*
	  B will always render.
	  match will be null on location !== "/B/*",
	  match will be an object on location === "/B/*"
	*/}
	<B/>
  </Match>
</Router>
```


### Caveats

0. ```Route``` does not work outside of a ```<Router>``` and will throw an invariant exception.
1. To avoid unwanted behavior: When overriding the location, make sure the location prop does not change from null/undefined to a location object or vice versa.