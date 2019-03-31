import { Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";
import { RouterException } from "./RouterException";
import { addLocationPropWarning } from "./utils";

interface SwitchChildProps {
	from?: string;
	path?: string | string[];
}

interface SwitchProps {
	location?: Location;
}

/**
 * The public API for rendering the first <Route> that matches.
 */
class Switch extends React.Component<SwitchProps> {
	public static propTypes: {
		children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
		location: PropTypes.Requireable<object>;
	};

	public render() {
		return (
			<RouterContext.Consumer>
				{(context) => {
					if (!context) {
						throw RouterException("Switch");
					}

					const location = this.props.location || context.location;

					let element: React.ReactElement | null = null;
					let match: Match | null | undefined;

					// We use React.Children.forEach instead of React.Children.toArray().find()
					// here because toArray adds keys to all child elements and we do not want
					// to trigger an unmount/remount for two <Route>s that render the same
					// component at different URLs.
					React.Children.forEach<any>(this.props.children, (child) => {
						if (!match && React.isValidElement(child)) {
							element = child;
							const childProps: SwitchChildProps = child.props as SwitchChildProps;

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

if (process.env.NODE_ENV !== "production") {
	Switch.propTypes = {
		children: PropTypes.node,
		location: PropTypes.object,
	};

	addLocationPropWarning(Switch.prototype, "Switch");
}

export default Switch;
