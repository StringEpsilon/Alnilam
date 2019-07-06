import React from "react";
import { RouterContext, RoutingProps } from "../RouterContext";
import withRouter from "../withRouter";

export interface FocusProps extends RoutingProps {
	onMount: boolean;
}

/**
 * Component that refocuses to an internally rendered div on location change.
 */
class Focus extends React.Component<FocusProps> {
	public static contextType = RouterContext;
	private focusRef: React.RefObject<HTMLDivElement>;

	public constructor(props: any) {
		super(props);

		this.focusRef = React.createRef();
	}

	public componentDidMount() {
		if (this.props.onMount && this.focusRef.current) {
			this.focusRef.current.focus();
		}
	}

	public componentDidUpdate(prevProps: FocusProps) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			if (this.focusRef.current) {
				this.focusRef.current.focus();
			}
		}
	}

	public render() {
		return (
			<div tabIndex={-1} ref={this.focusRef}>
				{this.props.children}
			</div>
		);
	}
}

export default withRouter(Focus);
