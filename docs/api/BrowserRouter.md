# &lt;BrowserRouter>

The BrowserRouter component does not exist in Alnilam. You can instead use the default [`<Router>`](./Router.md) and 
pass it a history object from ```createBrowserHistory()``` from the history package.


```jsx
import { Router } from 'alnilam'
import { createBrowserHistory } from "history";

const history = createMemoryHistory({
	basename: optionalString
	forceRefresh: optionalBool
	getUserConfirmation: optionalFunc
	keyLength: optionalNumber
})

<Router history={history}>
  <App/>
</Router>
```

## basename: string

The base URL for all locations. If your app is served from a sub-directory on your server, you'll want to set this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.

```jsx
<Router history={createBrowserHistory({basename: "/calendar"})} />
<Link to="/today"/> // renders <a href="/calendar/today">
```

## getUserConfirmation: func

A function to use to confirm navigation. Defaults to using [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm).

```jsx
// this is the default behavior
function getConfirmation(message, callback) {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<Router history={createBrowserHistory({getUserConfirmation: getConfirmation})} />;
```

## forceRefresh: bool

If `true` the router will use full page refreshes on page navigation. You probably only want this in [browsers that don't support the HTML5 history API](http://caniuse.com/#feat=history).

```jsx
const supportsHistory = 'pushState' in window.history
<Router history={createBrowserHistory({forceRefresh: !supportsHistory})} />
```

## keyLength: number

The length of `location.key`. Defaults to 6.

```jsx
<Router history={createBrowserHistory({keyLength: 12})} />
```

## children: node

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.
