import React from "react";

export interface LifecycleProps {
	onMount?: (component: Lifecycle) => void;
	onUpdate?: (component: Lifecycle, prevProps: any) => void;
	onUnmount?: (component: Lifecycle) => void;
	to?: any; // for Redirect.tsx
	message?: any; // for Prompt.tsx
}

class Lifecycle extends React.Component<LifecycleProps> {
	release: ((message?: string) => void) | undefined;

	componentDidMount() {
		if (this.props.onMount) this.props.onMount.call(this, this);
	}

	componentDidUpdate(prevProps: any) {
		if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
	}

	componentWillUnmount() {
		if (this.props.onUnmount) this.props.onUnmount.call(this, this);
	}

	render() {
		return null;
	}
}

export default Lifecycle;
