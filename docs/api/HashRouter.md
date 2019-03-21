# &lt;HashRouter>

There is no HashRouter component in Alnilam. Instead you can use a ```<Router>``` with a history object created with ```createHashHistory()```.

**IMPORTANT NOTE:** Hash history does not support `location.key` or `location.state`. As this technique is only intended to support legacy browsers, we encourage you to configure your server to work with a browser history instead.

```jsx
import { Router } from 'alnilam';
import { createHashHistory } from 'history';

const hashHistory = createHashHistory();
<Router history={hashHistory}>
  <App/>
</Router>
```

## basename: string

The base URL for all locations. A properly formatted basename should have a leading slash, but no trailing slash.

```jsx
const hashHistory = createHashHistory({basename: "/calendar"});

<Router history={hashHistory} />
<Link to="/today"/> // renders <a href="#/calendar/today">
```

## getUserConfirmation: func

A function to use to confirm navigation. Defaults to using [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm).

```jsx
// this is the default behavior
function getConfirmation(message, callback) {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

const hashHistory = createHashHistory({getUserConfirmation: getConfirmation});

<Router history={hashHistory} />;
```

## hashType: string

The type of encoding to use for `window.location.hash`. Available values are:

- `"slash"` - Creates hashes like `#/` and `#/sunshine/lollipops`
- `"noslash"` - Creates hashes like `#` and `#sunshine/lollipops`
- `"hashbang"` - Creates ["ajax crawlable"](https://developers.google.com/webmasters/ajax-crawling/docs/learn-more) (deprecated by Google) hashes like `#!/` and `#!/sunshine/lollipops`

Defaults to `"slash"`.

## children: node

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.
