[back to documentation overview](../readme.md)

## Match

Match always renders it's children, whether or not the current location matches the given path. But it provides the calculated match via context to it's children.

### Props

| prop      | type          | required | purpose |
|-----------|---------------|----------|---------|
| path      | string        | no       | Path to match against the current location
| exact     | bool          | no       | Whether or not the route matched [exactly](../types/matching_options.md#exact)
| strict    | bool          | no       | Whether or not the route matched [strictly](../types/matching_options.md#strict)
| sensitive | bool          | no       | Whether or not to use [case sensitive matching]../types/matching_options.md#sensitive)
| children  | React element | no       | Child elements
| location  | [Location](../types/Location.md)| no       | Overrides current location from history for matching

Note: A ```path``` without a leading slash or with a leading "./" will be considered relative to it's parent Route or Match.

### Example usage

A semi-realistic usecase is demonstrated in this codesandbox:

https://codesandbox.io/s/1m8oxpr13

There, an accordion is controlled via the location using the Match component.

### Caveats

0. ```Match``` does not work outside of a ```<Router>``` and will throw an invariant exception.
1. ```Match``` will block subsequent Match or Route components from rendering inside a Switch
2. To avoid unwanted behavior: When overriding the location, make sure the location prop does not change from null/undefined to a location object or vice versa.
