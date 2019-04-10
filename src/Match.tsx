import React from "react";
import Route from "./Route";
import { RouteProps } from "./RouteProps";
import { RouterContext, RouterContextType } from "./RouterContext";
import { RouterException } from "./RouterException";
import { addLocationPropWarning, calculateMatch, sanitizeChildren } from "./utils";

/**
 * The public API for matching a single path and rendering.
 */
export default class MatchComponent extends React.Component<RouteProps> {
	public static propTypes: object;

	public render(): JSX.Element {
		return (
			<RouterContext.Consumer>
				{(context) => {
					if (!context) {
						throw RouterException("Match");
					}
					const location = this.props.location || context.location;
					const match = calculateMatch(this.props, context);

					const props: RouterContextType = { ...context, location, match };

					let { children } = this.props;
					children = sanitizeChildren("Match", children, props, this.props.path);

					if (!children) {
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
	MatchComponent.propTypes = Route.propTypes;
	addLocationPropWarning(MatchComponent.prototype, "Match");
}
