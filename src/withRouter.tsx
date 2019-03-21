import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";

import Route, { RouteProps } from "./Route";

interface WithRouterProps {
	wrappedComponentRef?: Function,
	remainingProps?: any[],
}

/**
 * A public higher-order component to access the imperative API
 */
function withRouter<P>(Component: React.ComponentType<P>) {
	const WrappedComponent = (props: WithRouterProps) => {
		const { wrappedComponentRef, ...remainingProps } = props;

		return (
			// TODO: remove "any".
			<Route children={(routeComponentProps: any) => (
				<Component
					{...remainingProps}
					{...routeComponentProps}
					ref={wrappedComponentRef}
				/>
			)}
			/>
		);
	};

	WrappedComponent.displayName = `withRouter(${Component.displayName || Component.name})`;
	WrappedComponent.WrappedComponent = Component;

	if (__DEV__) {
		WrappedComponent.propTypes = {
			wrappedComponentRef: PropTypes.func
		};
	}

	return hoistStatics(WrappedComponent, Component);
}

export default withRouter;
