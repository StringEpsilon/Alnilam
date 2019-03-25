[back to documentation overview](../readme.md)

## Redirect

Allows navigating programmatically with a component. Upon mounting, it will replace the current location with the path specified with the ```to``` prop.

Redirect has some bonus functionality when used as a direct child of [```Switch```](./Switch.md), see [below](#Redirect%20and%20Switch).

### Props

| prop      | type   | required | purpose
|-----------|--------|----------|---------
| to        | string | **yes**  | The path redirect destination
| push      | bool   | no       | Wether to replace (default) or push onto history.
| from      | string | no       | When child of ```Switch```, redirect only if location matches from.
| exact     | string | no       | Use [exact matching](../recipes/matching_options#exact) for ```from```
| strict    | string | no       | Use [strict matching](../recipes/matching_options#strict) for ```from```
| sensitive | string | no       | Use [sensitive matching](../recipes/matching_options#sensitive) for ```from```

### Example usage

```jsx

// Normal redirect:
<Redirect to="/tauceti"/>

// Instead of replacing the current location, add another entry on top:
<Redirect to="/tauceti" push={true} />

// Redirect to location object:
const destination = {
	pathname: '/sol',
	search: '?planet=mars',
	hash: '#phobos',
}

<Redirect to={destination} /> // Redirects to "/sol?planet=mars#phobos"

```

### Redirect and Switch

When rendering, ```Switch``` looks at it's childrens props for ```to``` to evaluate whether or not that child matches the current location so it can be rendered. For the purpose of redirecting / forwarding certain paths, ```Switch``` also looks for a "from" prop on children:

```jsx
// Given current location = "/ran":

<Switch>
  <Route to="/Sol"> <Earth/> </Route>
  <Route path='/epsilon_eridani'> <Bill/> </Route>
  <Redirect from='/ran' to='/epsilon_eridani'/>
</Switch>
```

In the above example, Switch will render the Redirect.

Upon mount, Redirect will push ```"/epsilon_eridani"```.

After that, Switch will render the epsilon_eridani route and we get to meet ```<Bill />```.

A **notable quirk** of that implementation is that ```path``` has the same effect. Switch doesn't really care about what the child components are, as long as the props match up. **Don't rely on that quirk.**

### Caveats

0. ```Redirect``` does not work outside of a ```<Router>``` and will throw an invariant exception.
1. ```from``` only affects the ```Redirect```, if it's an immediate member of ```Switch```.
