import { createLocation, History, Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import matchPath, { MatchResult } from "./matchPath";
import { useRouterContext } from "./useRouterContext";

const isExternalUrl = new RegExp(/^https?:\/\//);

function isModifiedEvent(event: React.MouseEvent) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function joinClassnames(...classnames: any[]): string {
	// Using Boolean() here is just a fancy way of writing "(i) => !!i".
	// Makes for shorter transpiled code.
	return classnames.filter(Boolean).join(" ");
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
	/** Style object to apply when active */
	activeStyle?: object;
	/** className to apply when active */
	activeClassName?: string;
	/** Alternative function to determine when the Link is active. */
	isActive?: (match: MatchResult | null, location: Location) => boolean;
	/** Overrides the location for determining when the Link is active */
	location?: Location;
	/** Whether or not to use exact matching for determining "activeness" */
	exact?: boolean;
	/** Whether or not to use strict matching for determining "activeness" */
	strict?: boolean;
	/** Alnilam Internal. */
	staticContext?: any;
}

/**
 * Component for rendering a history-aware anchor element.
 *
 * @param props - Link properties
 */
export default function Link(props: LinkProps) {
	const {
		"aria-current": ariaCurrent = "page",
		activeClassName = "active",
		activeStyle,
		className,
		exact,
		isActive,
		location: locationProp,
		strict,
		style,
		to,
		staticContext,
		innerRef,
		replace,
		...rest
	} = props;

	// let ariaCurrent: string|null = props["aria-current"] || "page";
	const path = typeof to === "object" ? to.pathname : to;

	// Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
	const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
	const context = useRouterContext("Link");

	const pathToMatch = locationProp
		? locationProp.pathname
		: context.location.pathname;

	const match = escapedPath
		? matchPath(
			pathToMatch,
			{ path: escapedPath, exact, strict },
			context.match ? context.match.path : "",
		)
		: null;

	const isActiveFlag = !!(isActive
		? isActive(match, context.location)
		: match);

	const classNameValue = isActiveFlag
		? joinClassnames(className, activeClassName)
		: className;

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
			aria-current={isActiveFlag ? ariaCurrent : null}
			className={classNameValue}
			style={isActiveFlag ? { ...style, ...activeStyle } : style}
			href={href}
			ref={innerRef}
		/>
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
