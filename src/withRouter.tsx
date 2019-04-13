import hoistStatics from "hoist-non-react-statics";
import PropTypes from "prop-types";
import React from "react";
import { RouterContext } from "./RouterContext";
import { RouterException } from "./RouterException";

export interface WithRouterProps {
	wrappedComponentRef?: (props: any) => any;
}

/**
 * A higher-order component to access the alnilam routing context / props.
 */
export default function withRouter(Component: React.ComponentType<any>): any {
	const displayName = `withRouter(${Component.displayName || Component.name})`;

	const WrappedComponent = (props: WithRouterProps) => {
		const { wrappedComponentRef, ...rest } = props;

		return (
			<RouterContext.Consumer>
				{(context) => {
					if (!context) {
						throw RouterException(displayName);
					}
					return <Component
						{...rest}
						{...context}
						ref={wrappedComponentRef}
					/>;
				}}
			</RouterContext.Consumer>
		);
	};

	WrappedComponent.displayName = displayName;
	WrappedComponent.WrappedComponent = Component;

	if (process.env.NODE_ENV !== "production") {
		WrappedComponent.propTypes = {
			wrappedComponentRef: PropTypes.func,
		};
	}

	return hoistStatics(WrappedComponent, Component);
}
