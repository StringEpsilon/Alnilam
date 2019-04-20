[back to documentation overview](../readme.md)

## Link

Component for rendering a history-aware anchor element. It also knows whether it is currently 'active' or not. Active meaning that the current location in history (or the passed ```location``` prop) matches with the given path of the ```to``` prop.

### Props

| prop            | type     | required | purpose
|-----------------|----------|----------|---------
| to              | string   | **yes**  | Target path of the link.
| replace         | boolean  | no       | Whether or not to ```replace``` the current location (default: false).
| target          | string   | no       | ```target``` [attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes) of the underlying a element.
| onClick         | function | no       | Callback that will be called on click of the a element, before any alnilam handling.
| innerRef        | object   | no       | [Ref](https://reactjs.org/docs/refs-and-the-dom.html) passed on to the a element.
| className       | string   | no       | ```className``` passed on to the underlying a element.
| exact           | boolean  | no       | Whether or not to use [exact matching](../recipes/matching_options.md#exact)
| strict          | boolean  | no       | Whether or not to use [strict matching](../recipes/matching_options.md#strict)
| children        | Node     | no       | children passed through to the underlying link.
| isActive        | function | no       | A function to add extra logic for determining whether the link is active
| style           | object   | no       | [```style```](https://reactjs.org/docs/dom-elements.html#style) object passed on to the underlying a element when **inactive**
| className       | string   | no       | Will always be passed onto Link.
| activeClassName | string   | no       | Will be passed to Link className in addition to the className prop when **active**
| activeStyle     | object   | no       | CSS rules object applied to Link when **active**. Defaults to "active".
| aria-current    | string   | no       | [See WAI-ARIA specs.](https://www.w3.org/TR/wai-aria-1.1/#aria-current) Defaults to "page".
| mergeLocations  | boolean  | no       | When using a Location object in `to`, merge a partial object with the current location

**Notes:**

* ```Link``` with pass additional props forward to the anchor. So you can pass your own additional event handlers, callbacks and attributes to the anchor element.

* ```Link``` intercepts the click on the underlying ```a``` element, unless the string for the ```to``` prop starts with a http / https scheme. See example below.

* A ```path``` without a leading slash or with a leading "./" will be considered relative to it's parent Route or Match.

* When using `mergeLocations`: ```<Link to={{hash: "#asteroids"}} />``` is not equal to ```<Link to="#asteroids" />```. You have to set location properties you don't want on the new location. You might accidentally preserve state or search when you don't want to.

**Call signatures for the callbacks:**

```onClick(event: React.MouseEvent): void```
```isActive(match: Match | null, location: Location) => boolean```

### Example usage

Basic linking in the application:

```jsx
<Link to="/sol/earth/moon"> To the moon! </Link>
```

External link:

```jsx
<Link to="https://en.wikipedia.org/wiki/Alnilam"> To the Wikipedia! </Link>
```

Inhibiting navigation in the onClick callback:

```jsx
/* Link respects prevented events: */
function clickHandler(event){
	event.preventDefault();
	console.warn("I can't let you do that");
}

<Link to="/sol/jupiter" onClick={clickHandler}> Search for monoliths </Link>
```

Active styling:

```jsx
// CSS:

a.active = {
	color: "green";
}

// JSX:
<Router>
  <MyNavbar>
    <Link to="/ran"> Visit Bill </NavLink>
  </MyNavbar>
  <Route path="/ran">
    <Bill/>
  </Route>
</Router>
```

### Caveats

0. ```Link``` does not work outside of a ```<Router>``` and will throw an invariant exception.
1. The return value of the onClick callback currently has no effect.