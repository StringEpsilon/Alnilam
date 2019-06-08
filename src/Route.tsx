import PropTypes from "prop-types";
import React from "react";
import { RouteProps } from "./RouteProps";
import { RouterContext } from "./RouterContext";
import { useRouterContext } from "./useRouterContext";
import { calculateMatch, sanitizeChildren } from "./utils";

/**
 * Component for matching a single path and rendering children on match.
 */
export default function Route(props: RouteProps) {
	const context = useRouterContext("Route");

	const location = props.location || context.location;
	const path = props.path;
	const match = calculateMatch(props, context);

	const contextProps = { ...context, location, match };

	const children = sanitizeChildren("Route", props.children, contextProps, path);

	if (!match || !children) {
		return null;
	}

	return (
		<RouterContext.Provider value={contextProps}>
			{children}
		</RouterContext.Provider>
	);
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
