import { createLocation, Location, locationsAreEqual } from "history";
import PropTypes from "prop-types";
import React from "react";
import generatePath from "./generatePath";
import Lifecycle from "./Lifecycle";
import { MatchResult } from "./matchPath";
import { RouterContext } from "./RouterContext";
import { RouterException } from "./RouterException";

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

/**
 * Component for navigating programmatically with a component.
 */
export default function Redirect(props: RedirectProps) {
	const { computedMatch, to, push = false } = props;
	return (
		<RouterContext.Consumer>
			{(context) => {
				if (!context) {
					throw RouterException("Redirect");
				}

				const { history, staticContext } = context;

				const method = push ? history.push : history.replace;
				const location = createLocation(
					computedMatch
						? typeof to === "string"
							? generatePath(to, computedMatch.params)
							: {
								...to,
								pathname: generatePath(to.pathname, computedMatch.params),
							}
						: to,
				);

				// When rendering in a static context,
				// set the new location immediately.
				if (staticContext) {
					method(location);
					return null;
				}

				return (
					<Lifecycle
						onMount={() => {
							method(location);
						}}
						onUpdate={(self, prevProps: RedirectProps) => {
							const prevLocation = createLocation(prevProps.to);
							if (!locationsAreEqual(prevLocation, location)) {
								method(location);
							}
						}}
						to={to}
					/>
				);
			}}
		</RouterContext.Consumer>
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
