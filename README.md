Stellar declarative routing in typescript, for React.

:star: :star2: :star: 

## Why "Alnilam"?

[Alnilam](https://en.wikipedia.org/wiki/Alnilam) a star that was used in celestial
navigation. It's one of the stars in Orions belt - which happens to be my 
favorite constellation - and it's official designation is *Epsilon* Orionis. 
I'm also a a fan of contrived package names ;-)

## Thanks

Thanks to all original contributors of [React-Router](https://github.com/ReactTraining/react-router). 

## What / Why is Alnilam?

It's a fork of react-router-dom. As for why:

1) The fork gets rid of the router / ui separation. Just one package and no react
native support. This makes the whole thing a LOT easier to understand, imho.

2) No more BrowserRouter, HashRouter, and MemoryRouter, as those are just 
fancy wrappers for ```createHistory()``` and ```<Router/>```. Keep it simple,

3) Break things faster the original library can't because it would require major releases. 
Like upping the required react version, change how routes render and so on.

4) Port the entire thing to typescript.

5) As a learning experience. My first typescript project, my first library, 
my first NPM package. 


## TODO for 1.0

* [ ] Verify that the build output and package.json are in order
* [ ] Publish the package.
* [ ] Outline API changes and refactorings for future work.
* [ ] Figure out typing for withRouter()
* [ ] Figure out how to properly publish types along side the normal output.
* [ ] Integrate typescript to rollup build without mandating tslib dependency. Somehow