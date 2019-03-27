import hoistStatics from "hoist-non-react-statics";
import PropTypes from "prop-types";
import React from "react";

import Route, { RouteProps } from "./Route";

interface WithRouterProps {
	wrappedComponentRef?: (props: any) => any;
	remainingProps?: any[];
}

/**
 * A public higher-order component to access the imperative API
 */
function withRouter<P>(Component: React.ComponentType<P>) {
	const WrappedComponent = (props: WithRouterProps) => {
		const { wrappedComponentRef, ...remainingProps } = props;

		return (
			<Route children={(routeComponentProps: any) => (
				<Component
					{...remainingProps}
					{...routeComponentProps}
					ref={wrappedComponentRef}
				/>
			)} />
		);
	};

	WrappedComponent.displayName = `withRouter(${Component.displayName || Component.name})`;
	WrappedComponent.WrappedComponent = Component;

	if (__DEV__) {
		WrappedComponent.propTypes = {
			wrappedComponentRef: PropTypes.func,
		};
	}

	return hoistStatics(WrappedComponent, Component);
}

export default withRouter;
