import React from "react";
import RouterContext from "./RouterContext";
import { createLocation, Location } from "history";
import PropTypes from "prop-types";

function isModifiedEvent(event: React.MouseEvent | React.KeyboardEvent) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

interface LinkProps {
	onClick?: (event: React.MouseEvent) => void;
	innerRef?: any;
	replace?: (to: string | Location) => void;
	to: string | Location
	target?: string;
	"aria-current"?: any,
	className?: any,
	style?: any,
}

/**
 * The public API for rendering a history-aware <a>.
 */
class Link extends React.Component<LinkProps> {
	static contextType = RouterContext;
	static propTypes: ObjectMap<any>;

	constructor(props: LinkProps) {
		super(props);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleKeyPress(event: React.KeyboardEvent) {
		if (isModifiedEvent(event)) {
			return;
		}
		if (event.defaultPrevented) {
			return;
		}
		if (event.key === "Enter") {
			event.preventDefault();
			const method = this.props.replace ?
				this.context.history.replace as (to: string | Location) => void :
				this.context.history.push as (to: string | Location) => void;

			method(this.props.to);
		}
	}

	handleClick(event: React.MouseEvent) {
		if (this.props.onClick) {
			this.props.onClick(event);
		}

		if (event.defaultPrevented) {
			// onClick prevented default
			return;
		}

		if (event.button !== 0) {
			// ignore everything but left clicks
			return;
		}

		if (this.props.target && this.props.target !== "_self") {
			// let browser handle "target=_blank" etc.
			return;
		}

		if (isModifiedEvent(event)) {
			// ignore clicks with modifier keys
			return;
		}

		event.preventDefault();
		const method = this.props.replace ?
			this.context.history.replace as (to: string | Location) => void :
			this.context.history.push as (to: string | Location) => void;

		method(this.props.to);
	}

	render() {
		const { innerRef, replace, to, ...rest } = this.props; // eslint-disable-line no-unused-vars


		if (!this.context) {
			throw new Error(__DEV__ ? "You should not use <Link> outside a <Router>" : "Invariant failed");
		}

		const location =
			typeof to === "string"
				// void(0) because of the typing missmatch in createLocation().
				? createLocation(to, null, void (0), this.context.location)
				: to;
		const href = location ? this.context.history.createHref(location) : "";

		return (
			<a
				{...rest}
				onClick={this.handleClick}
				onKeyPress={this.handleKeyPress}
				href={href}
				ref={innerRef}
			/>
		);
	}
}

if (__DEV__) {
	const toType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);
	const innerRefType = PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.any })
	]);

	Link.propTypes = {
		innerRef: innerRefType,
		onClick: PropTypes.func,
		replace: PropTypes.bool,
		target: PropTypes.string,
		to: toType.isRequired
	};
}

export default Link;
