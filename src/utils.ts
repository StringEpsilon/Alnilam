import React from "react";
import matchPath from "./matchPath";
import { RouteProps } from "./RouteProps";
import { RouterContextType } from "./RouterContext";
import { parsePath, Location } from "history";

export function calculateMatch(props: RouteProps, context: RouterContextType) {
	const location = props.location || context.location;
	return props.computedMatch
		? props.computedMatch // <Switch> already computed the match for us
		: props.path
			? matchPath(location.pathname, props, context.match ? context.match.path : "")
			: context.match;
}

export function sanitizeChildren(name: string, children: any, props: any, path?: string | string[]): any | null {
	// Preact uses an empty array as children by
	// default, so use null if that's the case.
	if (Array.isArray(children) && children.length === 0) {
		return null;
	}
	if (typeof children === "function") {
		const childrenFunction = children as (props: any) => React.ElementType;
		children = childrenFunction ? childrenFunction(props) : null;
	}
	return children;
}

export function createLocation(target: string | Location): Location {
	if (typeof target !== "string") {
		return target;
	}
	return parsePath(target);
}

const trimTrailingSlashes = (path: string) => path.replace(/\/+$/, '');
const normalizeSlashes = (path: string) => path.replace(/\/\/+/g, '/');
const joinPaths = (paths: string[]) => normalizeSlashes(paths.join('/'));
const splitPath = (path: string) => normalizeSlashes(path).split('/');

function resolvePathname(toPathname: string, fromPathname: string) {
	let segments = splitPath(trimTrailingSlashes(fromPathname));
	let relativeSegments = splitPath(toPathname);

	relativeSegments.forEach(segment => {
		if (segment === '..') {
			// Keep the root "" segment so the pathname starts at /
			if (segments.length > 1) segments.pop();
		} else if (segment !== '.') {
			segments.push(segment);
		}
	});

	return segments.length > 1 ? joinPaths(segments) : '/';
}

/**
* Returns a fully resolve location object relative to the given pathname.
*/
export function resolveLocation(to: string | Location, fromPathname: string = '/') {
	let { pathname: toPathname, search = '', hash = '' } =
		typeof to === 'string' ? parsePath(to) : to;

	let pathname = toPathname
		? toPathname.startsWith('/')
			? resolvePathname(toPathname, '/')
			: resolvePathname(toPathname, fromPathname)
		: fromPathname;

	return { pathname, search, hash };
}
