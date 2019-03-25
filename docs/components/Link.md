[back to documentation overview](../readme.md)

## Link

Component for rendering a history-aware anchor element.

### Props

| prop         | type     | required | purpose
|--------------|----------|----------|---------
| to           | string   | **yes**  | Target path of the link.
| replace      | boolean  | no       | Whether or not to ```replace``` the current location (default: false).
| target       | string   | no       | ```target``` [attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes) of the underlying a element.
| onClick      | function | no       | Callback that will be called on click of the a element, before any alnilam handling.
| innerRef     | object   | no       | [Ref](https://reactjs.org/docs/refs-and-the-dom.html) passed on to the a element.
| className    | string   | no       | ```className``` passed on to the underlying a element.
| style        | object   | no       | [```style```](https://reactjs.org/docs/dom-elements.html#style) object passed on to the underlying a element.

**Note:**

```Link``` with pass additional props forward to the anchor. So you can pass your own additional event handlers, callbacks and attributes to the anchor element.

**Call signatures for the callbacks:**

```onClick(event: React.MouseEvent): void```

### Example usage

Basic linking in the application:

```jsx
<Link to="/sol/earth/moon"> To the moon! </Link>
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

### Caveats

0. ```Link``` does not work outside of a ```<Router>``` and will throw an invariant exception.
1. The return value of the onClick callback currently has no effect.