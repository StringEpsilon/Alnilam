
export function RouterException(component: string) {
	const message = __DEV__
		? `You should not use <${component}> outside a <Router>`
		: "Invariant failed";
	return new Error(message);
}
