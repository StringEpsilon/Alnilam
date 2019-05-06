[back to documentation overview](../readme.md)

## Match

Whenever an Alnilam component or function passes you a match, you'll get an object with the following shape:

| Property  | type   | purpose                                         |
|-----------|--------|-----------------------------------------------------|
| params    | object | Key/value pairs parsed from the URL corresponding to the dynamic segments of the path |
| isExact   | bool   | Whether or not the route matched [exactly](../types/matching_options.md#exact) |
| path      | string | The path pattern used to match. Useful for nesting. |
| url       | string | The matched portion of the URL. Useful for nesting. |
