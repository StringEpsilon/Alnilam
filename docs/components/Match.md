[back to documentation overview](../readme.md)

## Match

Match always renders it's children, whether or not the current location matches the given path. But it provides the calculated match as a prop to the child.

Like Route and NavLink, Match will provide the same props to the children as [withRouter](../functions/withRouter) would.

---

### Props

| prop      | type          | required | purpose |
|-----------|---------------|----------|---------|
| path      | string        | no       | Path to match.
| exact     | bool          | no       | Whether or not to match the path *exactly*
| strict    | bool          | no       | When true, will not match on missing trailing slash
| sensitive | bool          | no       | Turns on case sensitive matching
| children  | React element | no       | Child elements
| location  | [Location](../types/Location.md)| no       | Overrides current location from history for matching

---

### Example usage

A semi-realistic usecase is demonstrated in this codesandbox:

https://codesandbox.io/s/mz0p66ql9y

There, an accordion is controlled via the location using the Match component.

---

### Caveats

0. ```Match``` dpes not work outside of a ```<Router>```.
1. ```Match``` will block subsequent Match or Route components from rendering inside a Switch
2. To avoid unwanted behavior: When overriding the location, make sure the location prop does not change from null/undefined to a location object or vice versa. 