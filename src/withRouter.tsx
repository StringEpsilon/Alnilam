import hoistStatics from "hoist-non-react-statics";
import PropTypes from "prop-types";
import React from "react";
import { useRouterContext } from "./useRouterContext";

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
		const context = useRouterContext(displayName);
		return (
			<Component
				{...rest}
				{...context}
				ref={wrappedComponentRef}
			/>
		);
	};

	WrappedComponent.displayName = displayName;
	WrappedComponent.WrappedComponent = Component;

	if (process.env.NODE_ENV !== "production") {
		WrappedComponent.propTypes = {
			wrappedComponentRef: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.func,
				PropTypes.object,
			]),
		};
	}

	return hoistStatics(WrappedComponent, Component);
}
