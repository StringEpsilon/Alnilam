import React from "react";

export interface LifecycleProps {
	onMount?: (component: Lifecycle) => void;
	onUpdate?: (component: Lifecycle, prevProps: any) => void;
	onUnmount?: (component: Lifecycle) => void;
	to?: any; // for Redirect.tsx
	message?: any; // for Prompt.tsx
}

class Lifecycle extends React.Component<LifecycleProps> {
	public release: ((message?: string) => void) | undefined;

	public componentDidMount() {
		if (this.props.onMount) { this.props.onMount.call(this, this); }
	}

	public componentDidUpdate(prevProps: any) {
		if (this.props.onUpdate) { this.props.onUpdate.call(this, this, prevProps); }
	}

	public componentWillUnmount() {
		if (this.props.onUnmount) { this.props.onUnmount.call(this, this); }
	}

	public render() {
		return null;
	}
}

export default Lifecycle;
