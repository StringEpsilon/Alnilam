import PropTypes from "prop-types";
import React from "react";
import { RouteProps } from "./RouteProps";
import { RouterContext } from "./RouterContext";
import { RouterException } from "./RouterException";
import { calculateMatch, sanitizeChildren } from "./utils";

/**
 * Component for matching a single path and rendering children on match.
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
					const match = calculateMatch(this.props, context);

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
}
