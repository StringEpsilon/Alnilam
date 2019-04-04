import { History, Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import matchPath, { MatchResult } from "./matchPath";
import RouterContext from "./RouterContext";
import { RouterException } from "./RouterException";
import { addLocationPropWarning, sanitizeChildren } from "./utils";

export interface RouteProps {
	history?: History;
	match?: MatchResult | null;
	location?: Location;
	// TODO: remove any?
	children?: ((props: any) => React.ReactNode) | React.ReactNode;
	path?: string | string[];
	exact?: boolean;
	sensitive?: boolean;
	strict?: boolean;
	computedMatch?: MatchResult;
}

/**
 * The public API for matching a single path and rendering.
 */
export default class Route extends React.Component<RouteProps> {
	public static propTypes: object;

	public render() {
		return (
			<RouterContext.Consumer>
				{(context) => {
					if (!context) {
						throw RouterException("Route");
					}
					const location = this.props.location || context.location;
					const path = this.props.path;
					const match = this.props.computedMatch
						? this.props.computedMatch // <Switch> already computed the match for us
						: this.props.path
							? matchPath(location.pathname, this.props, context.match ? context.match.path : "")
							: context.match;

					const props = { ...context, location, match };

					const children = sanitizeChildren("Route", this.props.children, props, path);

					if (!match || !children) {
						return null;
					}

					return (
						<RouterContext.Provider value={props}>
							{children}
						</RouterContext.Provider>
					);
				}}
			</RouterContext.Consumer>
		);
	}
}

if (process.env.NODE_ENV !== "production") {
	Route.propTypes = {
		children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
		exact: PropTypes.bool,
		location: PropTypes.object,
		path: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
		]),
		sensitive: PropTypes.bool,
		strict: PropTypes.bool,
	};
	addLocationPropWarning(Route.prototype, "Route");
}
