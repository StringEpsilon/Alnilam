[back to documentation overview](../readme.md)

## matchPath()

This function is the core matching logic of the library.

You might use it to build your own specialized versions of ```Match``` or ```Route```.

### Parameters

```matchPath(pathName: string, options: any = {} ) : Match | null```

| parameter | type   | required | purpose
|-----------|--------|----------|---------
| pathName  | string | yes      | the URL pathname you want to match
| options   | object | no       | [parameters for matching](../recipes/matching_options.md)
| basePath  | string | no       | Parent (or base) path for matching a relative pathname

#### Path

The path can be any valid URL pathname, except that "../" is not supported.

Relative paths are indicated via either omitting the leading slash or starting with a "./".

A relative path will not match, if you don't provide the basePath argument.

#### Options

Defaults to an empty object. Meaning the default is a case-insentive, non-strict, non-exact matching behavior.

#### basePath

The context for a relatvie path. See example below for how that works.

**Returns**

A [match object](../types/match.md) or null.

### Example usage

### Basic route with a parameter:

```js
import { matchPath } from "alnilam";

const match = matchPath("/sol/1", {
  path: "/sol/:planetId",
  exact: true,
  strict: false
});

/*
match equals:
{
  path: "/sol/:planetId"
  url: "/sol/1"
  isExact: true
  params: { planetId: 1}
}
*/
```

### Relative route:

```js
import { matchPath } from "alnilam";

// Will the path "earth" with the basepath "/sol" as "/sol/earth":
const match = matchPath(
  "/sol/earth",
  {
    path: "earth",
    exact: true,
    strict: false
  },
  /* Note: The pathPath does not have to have a trailing slash. Both "/sol/" and "/sol" will work. */
  "/sol/",
);

/*
match equals:
{
  path: "/sol/earth"
  url: "/sol/earth"
  params: undefined
  isExact: true
}
*/
```