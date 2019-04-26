[back to documentation overview](../readme.md)

## useMatch()

`useRouter()` allowing you to easily match a path against the current location without the need to wrap your component in a `Route` or `Match`, but is not quite as flexible as [`matchPath()`](./matchPath.md). The hook returns a [MatchResult](../types/match.md) object or null.

### Signature

```useMatch(options: MatchOptions | string): MatchResult | null```

### Examples

Making rendering decisions based on match / no match:

```jsx
import { useMatch } from "alnilam";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const LunaPanel = () => {
  // Check if the current location matches luna:
  const match = useMatch("./luna");
  return (
    <ExpansionPanel expanded={!!match}> {/* Expand the panel on match. But the panel is visible regardless. */}
      <ExpansionPanelSummary>
        Expansion Panel 1
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
```

Instead of passing the path, you can instead pass an object in the shape of [```MatchOptions```](../types/matching_options.md) if you want to use these options:

```js
const match = useMatch({ path: "./luna", strict: true, sensitive: true });
```

### Caveats:
* useMatch() will throw an invariant exception if used outside a `<Router />`.
* Matches made with useMatch() will **not** be considered by Alnilam components further down the tree. You have to use `Route` or `Match` if you want nested routing to work properly in your child components.

```js
// given location "/milykway/sol/luna":
const match = useMatch("/milkyway/sol");
return (
  <Route path="./luna"> {/* This route won't match! */}
    The moon!
  </Route>
);

// Again given location "/milykway/sol/luna":
return (
  <Match path="/milkyway/sol">
    <Route path="./luna"> {/* This route will match */}
      The moon!
    </Route>
  </Match>
);
```
