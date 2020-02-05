import { createPath, Location } from "history";
import { createLocation } from "../utils";
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
export default class StaticRouter extends React.Component<StaticRouterProps> {
	public static propTypes: {
		basename: PropTypes.Requireable<string>,
		context: PropTypes.Requireable<object>,
		location: PropTypes.Requireable<string | object>,
	};

	public render(): JSX.Element {
		const { basename = "", context = {}, location = "/", ...rest } = this.props;

		const history = {
			createHref: (path: string) => addLeadingSlash(basename + createURL(path)),
			action: "POP",
			location: stripBasename(basename, createLocation(location)),
			push: this.handlePush,
			replace: this.handleReplace,
			go: staticHandler("go"),
			goBack: staticHandler("goBack"),
			goForward: staticHandler("goForward"),
			listen: this.handleListen,
			block: this.handleBlock,
		};

		return <Router {...rest} history={history} staticContext={context} />;
	}

	private handlePush = (location: Location) => this.navigateTo(location, "PUSH");
	private handleReplace = (location: Location) => this.navigateTo(location, "REPLACE");
	private handleListen = () => noop;
	private handleBlock = () => noop;

	private navigateTo(location: Location, action: any /*TODO*/) {
		const { basename = "", context } = this.props;
		context.action = action;
		context.location = addBasename(basename, createLocation(location));
		context.url = createURL(context.location);
	}
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
