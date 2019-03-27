import hoistStatics from "hoist-non-react-statics";
import PropTypes from "prop-types";
import React from "react";
import Match from "./Match";

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
			<Match>
				{(routeComponentProps: any) => (
					<Component
						{...remainingProps}
						{...routeComponentProps}
						ref={wrappedComponentRef}
					/>
				)}
			</Match>
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
