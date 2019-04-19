[back to documentation overview](../readme.md)

## Router

The root component for everything else in alnilam. Also determines how your routing will behave.

### Props

| prop     | type          | required | purpose |
|----------|---------------|----------|---------|
| history  | History       | yes      | history object used for navigation / integration
| manageFocus | boolean    | no       | if true, Router will render a [```<Focus/>```](./Focus.md) component around it's children.
| children | React element | no       | Child elements

Acceptable as a value for the history prop is any history object from the [```history``` library](https://github.com/ReactTraining/history).

### Example usage

```jsx
import { Router } from "alnilam";
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```

### Caveats

0. Do not change the history prop value at runtime. That will break the Router. Future versions might not accept the updated prop at all.
1. Nesting one Router inside another will have various unforeseen sideeffects. Alnilam will throw an exception in development mode.