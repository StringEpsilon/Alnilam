import { createLocation, Location, locationsAreEqual } from "history";
import PropTypes from "prop-types";
import React from "react";
import generatePath from "./generatePath";
import Lifecycle from "./Lifecycle";
import RouterContext from "./RouterContext";
import { RouterException } from "./RouterException";

interface RedirectProps {
	computedMatch?: Match;
	from?: string | Location;
	to: string | Location;
	push?: boolean;
}

/**
 * The public API for navigating programmatically with a component.
 */
function Redirect(props: RedirectProps) {
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
						onUpdate={(self, prevProps) => {
							if (!locationsAreEqual(prevProps.to, location)) {
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

if (__DEV__) {
	Redirect.propTypes = {
		push: PropTypes.bool,
		from: PropTypes.string,
		to: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,

		]).isRequired,
	};
}

export default Redirect;
