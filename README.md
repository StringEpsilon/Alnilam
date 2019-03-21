## React-Web-Router

Declarative routing for [React](https://reactjs.org/).

## Thanks

Thanks to all original contributors of [React-Router](https://github.com/ReactTraining/react-router). 

## Motiviation
This is a fork of [React-Router](https://github.com/ReactTraining/react-router) and primarily a learning effort. If enough people are interested however, I'll maintain it properly.

My primary goals for this fork / learning experience:

* Port the library to TypeScript, to get my feed wet in that area.
* Remove the split between react-router and react-router-dom. 
    * react-router-native isn't used much in comparison (8.6k vs. 2.5 million downloads)
    * The split makes the codebase unintuitive (imho)
* Understand how the router actually works.
* Guilt-free refactoring because there is no pressure to keep backwards compatability.

## TODO

* [ ] Verify that the build output and package.json are in order
* [ ] Publish the package.
* [ ] Outline API changes and refactorings for future work.
* [ ] Figure out typing for withRouter()
* [ ] Figure out how to properly publish types along side the normal output.
* [ ] Integrate typescript to rollup build without mandating tslib dependency. Somehow