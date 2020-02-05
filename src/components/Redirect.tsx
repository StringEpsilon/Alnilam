import { Location } from "history";
import { createLocation, resolveLocation } from "../utils";
import PropTypes from "prop-types";
import React from "react";
import generatePath from "../generatePath";
import { useRouterContext } from "../hooks/useRouterContext";
import { MatchResult } from "../matchPath";
import Lifecycle from "./Lifecycle";
import { create } from "domain";

export interface RedirectProps {
	/** The path redirect destination */
	to: string | Location;
	/** Wether to replace (default) or push onto history. */
	push?: boolean;
	/** When child of `Switch`, redirect only if location matches from. */
	from?: string | Location;
	/** Alnilam internal. */
	computedMatch?: MatchResult;
}

function locationsAreEqual(a: Location, b: Location) {
	return a.pathname === b.pathname &&
		a.hash === b.hash &&
		a.search === b.search;
}

/**
 * Component for navigating programmatically with a component.
 */
export default function Redirect(props: RedirectProps) {
	const { computedMatch, to, push = false } = props;
	const context = useRouterContext("Redirect");
	const { history, staticContext, location } = context;

	const method = push ? history.push : history.replace;
	const targetLocation = resolveLocation(
		createLocation(
			computedMatch
				? typeof to === "string"
					? generatePath(to, computedMatch.params)
					: {
						...to,
						pathname: generatePath(to.pathname, computedMatch.params),
					}
				: to,
		),
		context.location.pathname
	);

	// When rendering in a static context,
	// set the new location immediately.
	if (staticContext) {
		console.log("asjdkasdkasdk");
		method(targetLocation);
		return null;
	}

	return (
		<Lifecycle
			onMount={() => {
				method(targetLocation);
			}}
			onUpdate={(self, prevProps: RedirectProps) => {
				if (self.props.to !== prevProps.to && !locationsAreEqual(location, targetLocation)) {
					method(targetLocation);
				}
			}}
			to={to}
		/>
	);
}

if (process.env.NODE_ENV !== "production") {
	Redirect.propTypes = {
		push: PropTypes.bool,
		from: PropTypes.string,
		to: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,

		]).isRequired,
	};
}
