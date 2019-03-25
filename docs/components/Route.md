[back to documentation overview](../readme.md)

## Route

---

### Props

| prop      | type          |required  |purpose|
|-----------|---------------|----------|-------|
| path      | string        | no       | Path to match.
| exact     | bool          | no       | Whether or not to match the path *exactly*
| strict    | bool          | no       | When true, will not match on missing trailing slash
| sensitive | bool          | no       | Turns on case sensitive matching
| children  | React element | no       | Child elements
| render    | func          | no       |
| component | func          | no       |
| location  | [Location](../types/Location.md)| no       | Overrides current location from history for matching

---

### Example usage

```jsx

```

---

### Caveats

0. ```Route``` does not work outside of a ```<Router>```.
1. To avoid unwanted behavior: When overriding the location, make sure the location prop does not change from null/undefined to a location object or vice versa. 