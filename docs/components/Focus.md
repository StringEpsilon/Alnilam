[back to documentation overview](../readme.md)

## Focus

Focus is a simple component that renders a div with tabIndex=-1 and focuses that div on every location change.

### Props

| prop     | type          | required | purpose |
|----------|---------------|----------|---------|
| onMount  | boolean       | no       | If true, ```Focus``` will also focus the internal div on mount, not just on location change.

### Caveats

0. Will throw an exception if used outside a ```Router```.