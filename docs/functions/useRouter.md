[back to documentation overview](../readme.md)

## useRouter()

`useRouter()` is a hook that mimics `withRouter()`. It returns an object containing `history`, `match`, `location`, and `previousLocation`, allowing you to skip wrapping your component in `withRouter()` to gain access to these props.

### Signature

```useRouter(): RoutingProps```

### Examples

Accessing history to navigate programmatically:

```jsx
import { useRouter } from "alnilam";

const customButton = () => {
  const { history } = useRouter();
  return (
    <button onClick={() => history.push("/custom/button/target")}>
      This button navigates on click!
    </button>
  );
}
```

Accessing match and location information:

```jsx
import { useRouter } from "alnilam";

const customButton = () => {
  const { match, location } = useRouter();
  return (
    <div>
      The current location is {location.pathname}. <br/>
      These are the current path parameters: {JSON.stringify(match.params)}
    </div>
  );
}
```

### Caveats:
* useRouter() will throw an invariant exception if used outside a `<Router />`.
