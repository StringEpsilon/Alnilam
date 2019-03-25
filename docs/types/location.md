[back to documentation overview](../readme.md)

## Location

Whenever an Alnilam component or function passes you a match, you'll get an object with the following shape.

[This is an excerpt taken from the official history documenation.](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md)

| Property  | type   | purpose                                  |
|-----------|--------|------------------------------------------|
| pathname  | string | The path portion of the URL.             |
| search    | string | The query string portion of the URL      |
| hash      | string | The hash fragment portion of the URL     | 
| state     | object | Location-specific state that was provided when this location was pushed onto the stack. | 
