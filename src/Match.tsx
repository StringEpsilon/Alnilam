import React from "react";
import matchPath from "./matchPath";
import Route, { RouteProps } from "./Route";
import RouterContext, { RouterContextType } from "./RouterContext";
import { RouterException } from "./RouterException";
import { addLocationPropWarning, sanitizeChildren } from "./utils";

/**
 * The public API for matching a single path and rendering.
 */
class MatchComponent extends React.Component<RouteProps> {
	public static propTypes: ObjectMap<any>;

	public render() {
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
							? matchPath(location.pathname, this.props)
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

if (__DEV__) {
	MatchComponent.propTypes = Route.propTypes;
	addLocationPropWarning(MatchComponent.prototype, "Match");
}

export default MatchComponent;
