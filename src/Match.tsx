import React from "react";
import matchPath from "./matchPath";
import Route, { RouteProps } from "./Route";
import { RouterContext, RouterContextType } from "./RouterContext";
import { RouterException } from "./RouterException";
import { addLocationPropWarning, sanitizeChildren } from "./utils";

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
					const match = this.props.computedMatch
						? this.props.computedMatch // <Switch> already computed the match for us
						: this.props.path
							? matchPath(location.pathname, this.props, context.match ? context.match.path : "")
							: context.match;

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
