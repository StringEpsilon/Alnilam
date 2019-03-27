import { History, Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import { isValidElementType } from "react-is";
import warning from "tiny-warning";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";
import { addLocationPropWarning, sanitizeChildren } from "./utils";

export interface RouteProps {
	history?: History;
	match?: Match | null;
	location?: Location;
	// TODO: remove any?
	children?: ((props: any) => React.ReactNode) | React.ReactNode;
	path?: string | string[];
	exact?: boolean;
	sensitive?: boolean;
	strict?: boolean;
	computedMatch?: Match;
}

function isEmptyChildren(children: any) {
	return React.Children.count(children) === 0;
}

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component<RouteProps> {
	public static propTypes: ObjectMap<any>;

	public render() {
		return (
			<RouterContext.Consumer>
				{(context) => {
					if (!context) {
						throw new Error(__DEV__ ? "You should not use <Route> outside a <Router>" : "Invariant failed");
					}
					const location = this.props.location || context.location;
					const path = this.props.path;
					const match = this.props.computedMatch
						? this.props.computedMatch // <Switch> already computed the match for us
						: this.props.path
							? matchPath(location.pathname, this.props)
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

if (__DEV__) {
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

export default Route;
