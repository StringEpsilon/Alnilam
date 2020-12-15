import React, { useEffect, useRef } from "react";
import { useRouterContext } from "../hooks/useRouterContext";
import { RouterContext, RoutingProps } from "../RouterContext";
import withRouter from "../withRouter";

export interface FocusProps extends RoutingProps {
	onMount: boolean;
	children: any,
}

/**
 * Component that refocuses to an internally rendered div on location change.
 */
function Focus(props: FocusProps) {
	const context = useRouterContext("Focus");
	const focusRef: React.RefObject<any> = useRef(React.createRef());
	const pathname = props.location.pathname;

	useEffect(() => {
		if (focusRef.current) {
			focusRef.current.focus();
		}
	}, [pathname]);

	useEffect(() => {
		if (props.onMount && focusRef.current){
			focusRef.current.focus();
		}
	}, []);


	return (
		<div tabIndex={-1} ref={focusRef}>
			{props.children}
		</div>
	);
	
}

export default withRouter(Focus);
