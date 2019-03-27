import React from "react";
import warning from "tiny-warning";

export function addLocationPropWarning(prototype: any, componentName: string): void {
	prototype.componentDidUpdate = function (prevProps: any) {
		warning(
			!(!!this.props.location !== !!prevProps.location),
			`<${componentName}> elements should not change from uncontrolled to controlled (or vice versa).`,
		);
	};
}

export function sanitizeChildren(name: string, children: any, props: any, path?: string | string[]): any | null {
	// Preact uses an empty array as children by
	// default, so use null if that's the case.
	if (Array.isArray(children) && children.length === 0) {
		return null;
	}
	if (typeof children === "function") {
		const childrenFunction = children as (props: any) => React.ElementType;
		children = childrenFunction ? childrenFunction(props) : null;

		if (children === undefined) {
			if (__DEV__) {
				warning(
					false,
					"You returned `undefined` from the `children` function of " +
					`<${name}${path ? ` path="${path}"` : ""}>, but you ` +
					"should have returned a React element or `null`",
				);
			}
			children = null;
		}
	} else if (!!children && typeof children === "object" && typeof children.type === "function") {
		return React.cloneElement(children, props);
	}
	return children;
}