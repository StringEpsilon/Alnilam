import React from "react";
import { isValidElementType } from "react-is";
import PropTypes from "prop-types";
import warning from "tiny-warning";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";
import { Location, History } from "history";

export interface RouteProps {
	history?: History;
	match?: Match | null;
	location?: Location;
	// TODO: remove any?
	component?: React.ComponentType<any> | React.ComponentType<any>;
	// TODO: remove any?
	render?: ((props: any) => React.ReactNode);
	// TODO: remove any?
	children?: ((props: any) => React.ReactNode) | React.ReactNode;
	path?: string | string[];
	exact?: boolean;
	sensitive?: boolean;
	strict?: boolean;
	computedMatch?: Match,
}

function isEmptyChildren(children: any) {
	return React.Children.count(children) === 0;
}

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component<RouteProps> {
	static propTypes: ObjectMap<any>;

	render() {
		return (
			<RouterContext.Consumer>
				{context => {
				if (!context) {
					throw new Error(__DEV__ ?  "You should not use <Route> outside a <Router>" : "Invariant failed")
				}
					const location = this.props.location || context.location;
					const match = this.props.computedMatch
						? this.props.computedMatch // <Switch> already computed the match for us
						: this.props.path
							? matchPath(location.pathname, this.props)
							: context.match;

					const props = { ...context, location, match };

					let { children, component, render } = this.props;

					// Preact uses an empty array as children by
					// default, so use null if that's the case.
					if (Array.isArray(children) && children.length === 0) {
						children = null;
					}

					if (typeof children === "function") {
						const childrenFunction = children as Function;
						children = childrenFunction ? childrenFunction(props) : null;

						if (children === undefined) {
							if (__DEV__) {
								const { path } = this.props;

								warning(
									false,
									"You returned `undefined` from the `children` function of " +
									`<Route${path ? ` path="${path}"` : ""}>, but you ` +
									"should have returned a React element or `null`"
								);
							}

							children = null;
						}
					}

					return (
						<RouterContext.Provider value={props}>
							{children && !isEmptyChildren(children)
								? children
								: props.match
									? component
										? React.createElement(component, props)
										: render
											? render(props)
											: null
									: null}
						</RouterContext.Provider>
					);
				}}
			</RouterContext.Consumer>
		);
	}
}

if (__DEV__) {
	Route.propTypes = {
		children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
		component: (props: ObjectMap<any>, propName: string) => {
			if (props[propName] && !isValidElementType(props[propName])) {
				return new Error(
					`Invalid prop 'component' supplied to 'Route': the prop is not a valid React component`
				);
			}
		},
		exact: PropTypes.bool,
		location: PropTypes.object,
		path: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string)
		]),
		render: PropTypes.func,
		sensitive: PropTypes.bool,
		strict: PropTypes.bool
	};

	Route.prototype.componentDidMount = function () {
		warning(
			!(
				this.props.children &&
				!isEmptyChildren(this.props.children) &&
				this.props.component
			),
			"You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored"
		);

		warning(
			!(
				this.props.children &&
				!isEmptyChildren(this.props.children) &&
				this.props.render
			),
			"You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored"
		);

		warning(
			!(this.props.component && this.props.render),
			"You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
		);
	};

	Route.prototype.componentDidUpdate = function (prevProps) {
		warning(
			!(!!this.props.location !== !!prevProps.location),
			'<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
		);
	};
}

export default Route;
