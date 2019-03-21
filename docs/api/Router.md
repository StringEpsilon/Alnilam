# &lt;Router>

The common interface for all router components. You can make your own Router components that encapsulat the history properly, but there is not much
reason to.

```jsx
import { Router } from "alnilam";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```

## history: object

A [`history`](https://github.com/ReactTraining/history) object to use for navigation.

```jsx
import createBrowserHistory from "history/createBrowserHistory";

const customHistory = createBrowserHistory();

<Router history={customHistory} />;
```

## children: node

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.

```jsx
<Router>
  <App />
</Router>
```
