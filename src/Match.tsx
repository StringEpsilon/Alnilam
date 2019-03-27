import { History, Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import matchPath from "./matchPath";
import RouterContext, { RouterContextType } from "./RouterContext";
import { addLocationPropWarning, sanitizeChildren } from "./utils";

export interface MatchProps {
	history?: History;
	location?: Location;
	match?: Match | null;

	// TODO: remove any?
	children: ((props: any) => React.ReactNode) | React.ReactNode;
	path?: string | string[];
	exact?: boolean;
	sensitive?: boolean;
	strict?: boolean;
	computedMatch?: Match;
}

/**
 * The public API for matching a single path and rendering.
 */
class MatchComponent extends React.Component<MatchProps> {
	public static propTypes: ObjectMap<any>;

	public render() {
		return (
			<RouterContext.Consumer>
				{(context) => {
					if (!context) {
						throw new Error(__DEV__ ? "You should not use <Match> outside a <Router>" : "Invariant failed");
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
	MatchComponent.propTypes = {
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
	addLocationPropWarning(MatchComponent.prototype, "Match");
}

export default MatchComponent;
