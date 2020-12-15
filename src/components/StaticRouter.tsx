import { createLocation, createPath, Location } from "verlauf";
import PropTypes from "prop-types";
import React from "react";
import Router from "./Router";

export interface StaticRouterProps {
	basename?: string;
	context?: any;
	location?: Location | string;
}

function addLeadingSlash(path: string) {
	return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename: string, location: Location): Location {
	if (!basename) { return location; }

	return {
		...location,
		pathname: addLeadingSlash(basename) + location.pathname,
	};
}

function stripBasename(basename: string, location: Location): Location {
	if (!basename) { return location; }

	const base = addLeadingSlash(basename);

	if (location.pathname.indexOf(base) !== 0) { return location; }

	return {
		...location,
		pathname: location.pathname.substr(base.length),
	};
}

function createURL(location: string | Location): string {
	return typeof location === "string" ? location : createPath(location);
}

function staticHandler(methodName: string): () => void {
	return () => {
		throw new Error(process.env.NODE_ENV !== "production"
			? `You cannot ${methodName} with <StaticRouter>`
			: "Invariant failed",
		);
	};
}

function noop(): void { return; }

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */
export default function StaticRouter(props: StaticRouterProps) {
	const navigateTo = (location: Location, action: any /*TODO*/) => {
		const { basename = "", context } = props;
		context.action = action;
		context.location = addBasename(basename, createLocation(location));
		context.url = createURL(context.location);
	} 
	const handlePush = (location: Location) => navigateTo(location, "PUSH");
	const handleReplace = (location: Location) => navigateTo(location, "REPLACE");
	const handleListen = () => noop;
	const handleBlock = () => noop;

	const { basename = "", context = {}, location = "/", ...rest } = props;

	const history = {
		createHref: (path: string) => addLeadingSlash(basename + createURL(path)),
		action: "POP",
		location: stripBasename(basename, createLocation(location)),
		push: handlePush,
		replace: handleReplace,
		go: staticHandler("go"),
		goBack: staticHandler("goBack"),
		goForward: staticHandler("goForward"),
		listen: handleListen,
		block: handleBlock,
	};

	return <Router {...rest} history={history} staticContext={context} />;
}


if (process.env.NODE_ENV !== "production") {
	StaticRouter.propTypes = {
		basename: PropTypes.string,
		context: PropTypes.object,
		location: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
		]),
	};
}
