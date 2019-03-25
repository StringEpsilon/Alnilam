[back to documentation overview](../readme.md)

## Navlink

A [```<Link>```](./Link.md) wrapper that knows if it's "active" or not. It considers itself active, when the current location in history (or the passed ```location``` prop) matches with the given path of the ```to``` prop.

### Props

| prop            | type          | required | purpose |
|-----------------|---------------|----------|---------|
| to              | string / Location | no   | Path or Location to match against
| location        |[Location](../types/Location.md)| no       | Location to use in matching instead of current history location
| exact           | boolean       | no       | Whether or not to use [exact matching](../recipes/matching_options.md#exact)
| strict          | boolean       | no       | Whether or not to use [strict matching](../recipes/matching_options.md#strict)
| children        | React element | no       | children passed through to the underlying link.
| isActive        | function      | no       | A function to add extra logic for determining whether the link is active
| style           | object        | no       | CSS rules object applied to Link when **inactive**
| className       | string        | no       | Will always be passed onto Link.
| activeClassName | string        | no       | Will be passed to Link className in addition to the className prop when **active**
| activeStyle     | object        | no       | CSS rules object applied to Link when **active**. Defaults to "active".
| aria-current    | string        | no       | [See WAI-ARIA specs.](https://www.w3.org/TR/wai-aria-1.1/#aria-current) Defaults to "page".

**Note**

```NavLink``` will also pass additional props down to ```Link``` and thus to the anchor. So you can pass your own additional event handlers, callbacks and attributes to the anchor element.

**Call signatures for the callbacks:**

```isActive(match: Match | null, location: Location) => boolean```

### Example usage

Basic example of a NavLink in a navbar / menu that changes color when the user on the specified page:

```jsx
// CSS:

a.active = {
	color: "green";
}

// JSX:
<Router>
  <MyNavbar>
    <NavLink to="/ran"> Visit Bill </NavLink>
  </MyNavbar>
  <Route path="/ran">
    <Bill/>
  </Route>
</Router>
```

### Caveats

0. ```NavLink``` does not work outside of a ```<Router>``` and will throw an invariant exception.


### TODO for this Doc:

* Examples for isActive