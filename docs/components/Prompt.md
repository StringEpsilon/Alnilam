[back to documentation overview](../readme.md)

## Prompt

Component for prompting the user before navigating away from a screen. Either use the ```when``` prop or render it conditionally, otherwise <Prompt/> will always open a dialog via [```window.confirm```](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm) when a navigation occurs.

See (```history.block```)[https://github.com/ReactTraining/history#Blocking-transitions] for more details.

### Props

| prop    | type          | required | purpose
|---------|---------------|----------|---------
| message | string \ func | **yes**  | Messsage shown to the user in the prompt (for the function, see below)
| when    | bool          | no       | Stops <Prompt/> from showing


**Call signatures for the callbacks:**

Will be called with the next location and action the user is attempting to navigate to. Return a string to show a prompt to the user or true to allow the transition.

```message(location: Location) => true | string```

### Example usage

Simply prompt on all navigation attempts:

```jsx
<Prompt message="Are you sure you want to leave?" />
```

Using the message callback for more control. In this case, only prompting if the target location is "/82eridani".

```jsx
<Prompt
  message={location =>
    location.pathname !== "/82eridani")
      ? true
      : "Are you sure you want to visit that system?"
  }
/>
```

### Caveats

0. ```Prompt``` does not work outside of a ```<Router>``` and will throw an invariant exception.
