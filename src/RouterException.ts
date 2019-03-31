
export function RouterException(component: string) {
	const message = process.env.NODE_ENV !== "production"
		? `You should not use <${component}> outside a <Router>`
		: "Invariant failed";
	return new Error(message);
}
