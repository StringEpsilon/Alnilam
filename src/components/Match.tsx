import React from "react";
import { useRouterContext } from "../hooks/useRouterContext";
import { RouteProps } from "../RouteProps";
import { RouterContext, RouterContextType } from "../RouterContext";
import { calculateMatch, sanitizeChildren } from "../utils";
import Route from "./Route";

/**
 * Component for matching a path and passing the result to it's children.
 */
export default function Match(props: RouteProps) {
	const context = useRouterContext("Match");
	const location = props.location || context.location;
	const match = calculateMatch(props, context);

	const contextProps: RouterContextType = { ...context, location, match };

	let { children } = props;
	children = sanitizeChildren("Match", children, contextProps, props.path);

	if (!children) {
		return null;
	}
	return (
		<RouterContext.Provider value={contextProps}>
			{children}
		</RouterContext.Provider>
	);
}

if (process.env.NODE_ENV !== "production") {
	Match.propTypes = Route.propTypes;
}
