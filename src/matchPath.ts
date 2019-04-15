import pathToRegexp from "path-to-regexp";

/**
 * Match result details.
 */
export interface MatchResult {
	/** The path pattern used to match. */
	path: string;
	/** The match portion fo the URL.  */
	url: string;
	/** Whether or not the route matched exactly */
	isExact: boolean;
	/** Key/value pairs parsed from the URL corresponding to the dynamic segments of the path */
	params: object;
}

/**
 * Matching options.
 */
export interface MatchOptions {
	/** The path to match against the current location */
	path?: string | string[];
	/** If true, only match when paths have the same depth */
	exact?: boolean;
	/** If true, only match if trailing slashes are identical */
	strict?: boolean;
	/** if true, only match on identical casing */
	sensitive?: boolean;
}

/**
 * Evaluates the match between the given pathname and options path.
 *
 * @param pathname - The URL path segment to match against.
 * @param options - Matching parameters / options.
 * @param basePath - Base path for matching relative paths.
 */
export default function matchPath(
	pathname: string,
	options: MatchOptions | string = {},
	basePath?: string)
	: MatchResult | null {

	if (typeof options === "string") { options = { path: options }; }

	const { path: rawPath, exact = false, strict = false, sensitive = false } = options;

	const paths: string[] = ([] as string[]).concat(rawPath || [""]);

	return paths.reduce((matched: MatchResult | null, path: string) => {
		if (basePath) {
			path = resolvePath(path, basePath);
		}
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
			params: keys.reduce((memo: { [keys: string]: string }, key, index) => {
				memo[key.name] = values[index];
				return memo;
			}, {}),
			path, // the path used to match
			url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
		};
	}, null);
}

interface CacheEntry {
	regexp: pathToRegexp.PathRegExp;
	keys: pathToRegexp.Key[];
}

const cache: { [key: string]: CacheEntry } = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path: string, options: pathToRegexp.RegExpOptions): CacheEntry {
	const cacheKey = `${path}${options.end}${options.strict}${options.sensitive}`;

	if (cache[cacheKey]) { return cache[cacheKey]; }

	const keys: pathToRegexp.Key[] = [];
	const regexp = pathToRegexp(path, keys, options);
	const result = { regexp, keys };

	if (cacheCount < cacheLimit) {
		cache[cacheKey] = result;
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
					throw new Error("Paths starting with '../' are not supported. Got: " + path);
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
