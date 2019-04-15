import React from "react";
import { RouterContext } from "./RouterContext";

import { createLocation, History, Location } from "history";
import PropTypes from "prop-types";
import { RouterException } from "./RouterException";

const isExternalUrl = new RegExp(/^https?:\/\//);

function isModifiedEvent(event: React.MouseEvent) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export interface LinkProps {
	/** Target path or location of the link. */
	to: string | Location;
	/** Whether or not to replace the current location (default: false). */
	replace?: boolean;
	/** onClick callback. */
	onClick?: (event: React.MouseEvent) => void;
	/** Ref passed down to the underlying anchor */
	innerRef?: any;
	/** "target" attribute of the anchor element. */
	target?: string;
	/** 'aria-current' attribute passed to the anchor. */
	"aria-current"?: any;
	/** className passed on to the anchor element. */
	className?: any;
	/** style object passed on to the anchor element. */
	style?: any;
	/** Children for the anchor element. */
	children?: any;
}

/**
 * Component for rendering a history-aware anchor element.
 *
 * @param props - Link properties
 */
export default function Link(props: LinkProps) {
	const { innerRef, replace, to, ...rest } = props;
	return (
		<RouterContext.Consumer>
			{(context) => {
				if (!context) {
					throw RouterException("Link");
				}
				let isExternal = false;
				let href = "";

				if (typeof to === "string") {
					if (isExternalUrl.test(to)) {
						isExternal = true;
						href = to;
					} else {
						href = context.history.createHref(
							// void(0) because of the typing missmatch in createLocation().
							createLocation(to, null, void (0), context.location),
						);
					}
				} else {
					href = to ? context.history.createHref(to) : "";
				}
				return (
					<a
						{...rest}
						onClick={isExternal ? props.onClick : (event) => {
							return handleClick(event, context.history, props);
						}}
						href={href}
						ref={innerRef}
					/>
				);
			}}
		</RouterContext.Consumer>
	);
}

function handleClick(event: React.MouseEvent, history: History, props: LinkProps): void {
	if (props.onClick) {
		props.onClick(event);
	}

	if (event.defaultPrevented) {
		// onClick prevented default
		return;
	}

	if (event.button !== 0) {
		// ignore everything but left clicks
		return;
	}

	if (props.target && props.target !== "_self") {
		// let browser handle "target=_blank" etc.
		return;
	}

	if (isModifiedEvent(event)) {
		// ignore clicks with modifier keys
		return;
	}

	event.preventDefault();
	const method = props.replace ?
		history.replace as (to: string | Location) => void :
		history.push as (to: string | Location) => void;

	method(props.to);
}

if (process.env.NODE_ENV !== "production") {
	const innerRefType = PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any }),
	]);

	Link.propTypes = {
		innerRef: innerRefType,
		onClick: PropTypes.func,
		replace: PropTypes.bool,
		target: PropTypes.string,
		to: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
		]).isRequired,
	};
}
