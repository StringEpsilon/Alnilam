[back to documentation overview](../readme.md)

## matchPath()

This function is the core matching logic of the library.

You might use it to build your own specialized versions of ```Match``` or ```Route```.

### Parameters

```matchPath(pathName: string, options: any = {} ) : Match | null```

| parameter | type   | default | purpose
|-----------|--------|---------|---------
| pathName  | string | -       | the URL pathname you want to match
| options   | object | {}      | [parameters for matching](../recipes/matching_options.md)

**Returns**

A [match object](../types/match.md) or null.

### Example usage

```js
import { matchPath } from "alnilam";

const match = matchPath("/sol/1", {
  path: "/users/:planetId",
  exact: true,
  strict: false
});

/*
match equals:
{
  params: { planetId: 1}
  isExact: true
  path: "/users/:planetId"
  url: "/users/1"
}
*/

```

