import React from "react";
import RouterContext from "./RouterContext";

import { createLocation, History, Location } from "history";
import PropTypes from "prop-types";
import { RouterException } from "./RouterException";

function isModifiedEvent(event: React.MouseEvent) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

interface LinkProps {
	onClick?: (event: React.MouseEvent) => void;
	innerRef?: any;
	replace?: boolean;
	to: string | Location;
	target?: string;
	"aria-current"?: any;
	className?: any;
	style?: any;
}

/**
 * The public API for rendering a history-aware <a>.
 */
class Link extends React.Component<LinkProps> {
	public static propTypes: ObjectMap<any>;

	public handleClick(event: React.MouseEvent, history: History) {
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
			history.replace as (to: string | Location) => void :
			history.push as (to: string | Location) => void;

		method(this.props.to);
	}

	public render() {
		const { innerRef, replace, to, ...rest } = this.props; // eslint-disable-line no-unused-vars

		return (
			<RouterContext.Consumer>
				{(context) => {
					if (!context) {
						throw RouterException("Link");
					}

					const location =
						typeof to === "string"
							// void(0) because of the typing missmatch in createLocation().
							? createLocation(to, null, void (0), context.location)
							: to;
					const href = location ? context.history.createHref(location) : "";

					return (
						<a
							{...rest}
							onClick={(event) => {
								return this.handleClick(event, context.history);
							}}
							href={href}
							ref={innerRef}
						/>
					);
				}}
			</RouterContext.Consumer>
		);
	}
}

if (__DEV__) {
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

export default Link;
