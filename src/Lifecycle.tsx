import React from "react";

export interface LifecycleProps {
	onMount?: (component: Lifecycle) => void;
	onUpdate?: (component: Lifecycle, prevProps: any) => void;
	onUnmount?: (component: Lifecycle) => void;
	to?: any; // for Redirect.tsx
	message?: any; // for Prompt.tsx
}

export default class Lifecycle extends React.Component<LifecycleProps> {
	public release: ((message?: string) => void) | undefined;

	public componentDidMount(): void {
		if (this.props.onMount) { this.props.onMount.call(this, this); }
	}

	public componentDidUpdate(prevProps: any): void {
		if (this.props.onUpdate) { this.props.onUpdate.call(this, this, prevProps); }
	}

	public componentWillUnmount(): void {
		if (this.props.onUnmount) { this.props.onUnmount.call(this, this); }
	}

	public render(): JSX.Element | null {
		return null;
	}
}
