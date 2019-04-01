import pathToRegexp from "path-to-regexp";

interface CacheEntry {
	regexp: pathToRegexp.PathRegExp;
	keys: pathToRegexp.Key[];
}

const cache: { [key: string]: ObjectMap<CacheEntry> } = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path: string, options: pathToRegexp.RegExpOptions): CacheEntry {
	const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
	const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

	if (pathCache[path]) { return pathCache[path]; }

	const keys: pathToRegexp.Key[] = [];
	const regexp = pathToRegexp(path, keys, options);
	const result = { regexp, keys };

	if (cacheCount < cacheLimit) {
		pathCache[path] = result;
		cacheCount++;
	}

	return result;
}

function resolvePath(path: string, basePath: string): string {
	// Normalize basePath so that it never ends in a slash:
	if (basePath.endsWith("/")) {
		basePath = basePath.substr(0, basePath.length - 1);
	}

	switch (path[0]) {
		// paths like "/foo" -> not relative.
		case "/": {
			return path;
		}
		case "\\": {
			return path;
		}
		// paths like "./foo" -> relative.
		case ".": {
			switch (path.charAt(1)) {
				case "/": {
					return basePath + "/" + path.substr(2);
				}
				case ".": {
					throw new Error("Alnilam does not support paths with starting with '../'");
				}
			}
			break;
		}
		// paths like "foo/" -> relative
		default: {
			return basePath + "/" + path;
		}
	}
	return path;
}

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname: string, options: any = {}, basePath?: string): Match | null {
	if (typeof options === "string") { options = { path: options }; }

	const { path: rawPath, exact = false, strict = false, sensitive = false } = options;

	let paths: string[] = [].concat(rawPath);
	if (basePath) {
		paths = paths.map((path: string) => resolvePath(path, basePath));
	}

	return paths.reduce((matched: Match | null, path: string) => {
		if (matched) {
			return matched;
		}
		const { regexp, keys } = compilePath(path, {
			end: exact,
			sensitive,
			strict,
		});
		const match = regexp.exec(pathname);

		if (!match) { return null; }

		const [url, ...values] = match;
		const isExact = pathname === url;

		if (exact && !isExact) { return null; }

		return {
			isExact, // whether or not we matched exactly
			params: keys.reduce((memo: ObjectMap<string>, key, index) => {
				memo[key.name] = values[index];
				return memo;
			}, {}),
			path, // the path used to match
			url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
		};
	}, null);
}

export default matchPath;
