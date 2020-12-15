import { useEffect, useRef } from "react";

export interface LifecycleProps {
	onMount: () => void;
	onUpdate: (prevProps: any) => void;
	to?: any; // for Redirect.tsx
}

export default function Lifecycle(props: LifecycleProps) {
	const prevProps = useRef<LifecycleProps>(props);
	useEffect(() => {
		props.onMount();
	}, []);
	useEffect(() => {
		props.onUpdate(prevProps.current);
		prevProps.current = props;
	})
	
	return null;
}
