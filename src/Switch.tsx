import { Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import matchPath, { MatchResult } from "./matchPath";
import { useRouterContext } from "./useRouterContext";

interface SwitchChildProps {
	from?: string;
	path?: string | string[];
}

export interface SwitchProps {
	/** Overrides current location from history for matching */
	location?: Location;
	/** Children */
	children?: React.ReactElement;
}

/**
 * Component for rendering only the first <Route> that matches.
 */
export default function Switch(props: SwitchProps) {
	const context = useRouterContext("Switch");

	const location = props.location || context.location;

	let element: React.ReactElement | null = null;
	let match: MatchResult | null | undefined;

	// We use React.Children.forEach instead of React.Children.toArray().find()
	// here because toArray adds keys to all child elements and we do not want
	// to trigger an unmount/remount for two <Route>s that render the same
	// component at different URLs.
	React.Children.forEach<any>(props.children, (child) => {
		if (!match && React.isValidElement(child)) {
			element = child;
			const childProps: SwitchChildProps = child.props as SwitchChildProps;

			const path = childProps.path || childProps.from;

			match = path
				? matchPath(
					location.pathname,
					{ ...childProps, path },
					context.match ? context.match.path : "",
				)
				: context.match;
		}
	});
	return match && !!element
		? React.cloneElement(element, { location, computedMatch: match })
		: null;
}

if (process.env.NODE_ENV !== "production") {
	Switch.propTypes = {
		children: PropTypes.node,
		location: PropTypes.object,
	};
}
