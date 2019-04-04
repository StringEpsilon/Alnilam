import pathToRegexp from "path-to-regexp";

/**
 * Public API for generating a URL pathname from a path and parameters.
 */
export default function generatePath(path: string = "/", params: object = {}) {
	return path === "/" ?
		path :
		compilePath(path)(params, { pretty: true });
}

const cache: { [key: string]: pathToRegexp.PathFunction } = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path: string) {
	if (cache[path]) {
		return cache[path];
	}

	const generator = pathToRegexp.compile(path);

	if (cacheCount < cacheLimit) {
		cache[path] = generator;
		cacheCount++;
	}

	return generator;
}
