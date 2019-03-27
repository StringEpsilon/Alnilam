import React from "react";
import PropTypes from "prop-types";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";
import { Location } from "history";
import { addLocationPropWarning } from "./utils";

interface SwitchChildProps {
	from?: string,
	path?: string | string[],
}


interface SwitchProps {
	location?: Location,
}

/**
 * The public API for rendering the first <Route> that matches.
 */
class Switch extends React.Component<SwitchProps> {
	static propTypes: {
		children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
		location: PropTypes.Requireable<object>;
	};

	render() {
		return (
			<RouterContext.Consumer>
				{context => {
					if (!context) {
						throw new Error(__DEV__ ? "You should not use <Switch> outside a <Router>" : "Invariant failed");
					}

					const location = this.props.location || context.location;

					let element: React.ReactElement | null = null;
					let match: Match | null | undefined;

					// We use React.Children.forEach instead of React.Children.toArray().find()
					// here because toArray adds keys to all child elements and we do not want
					// to trigger an unmount/remount for two <Route>s that render the same
					// component at different URLs.
					React.Children.forEach<any>(this.props.children, child => {
						if (!match && React.isValidElement(child)) {
							element = child;
							let childProps: SwitchChildProps = child.props as SwitchChildProps;

							const path = childProps.path || childProps.from;

							match = path
								? matchPath(location.pathname, { ...childProps, path })
								: context.match;
						}
					});
					return match && !!element
						? React.cloneElement(element, { location, computedMatch: match })
						: null;
				}}
			</RouterContext.Consumer>
		);
	}
}

if (__DEV__) {
	Switch.propTypes = {
		children: PropTypes.node,
		location: PropTypes.object
	};

	addLocationPropWarning(Switch.prototype, "Switch");
}

export default Switch;
