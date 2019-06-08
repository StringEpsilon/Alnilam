import React from "react";
import warning from "tiny-warning";
import matchPath from "./matchPath";
import { RouteProps } from "./RouteProps";
import { RouterContextType } from "./RouterContext";

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
	} else if (!!children) {
		return React.Children.map(children, (child) => {
			if (React.isValidElement(child) && typeof child.type !== "string") {
				return React.cloneElement(child, props);
			} else {
				return child;
			}
		});
	}
	return children;
}
