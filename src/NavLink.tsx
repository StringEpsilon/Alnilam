import React from "react";
import Route from "./Route";
import PropTypes from "prop-types";

import Link from "./Link";
import { Location } from "history";

function joinClassnames(...classnames: any[]): string {
	return classnames.filter(i => i).join(" ");
}

interface NavLinkProps {
	"aria-current"?: string | null,
	activeClassName?: string;
	activeStyle?: object;
	className?: string;
	exact?: boolean;
	isActive?: (match: Match, location: Location) => boolean;
	location?: Location;
	strict?: boolean;
	style?: any;
	to: string | Location;
	children: React.ReactNode,
}

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
function NavLink(props: NavLinkProps) {
	const {
		"aria-current": ariaCurrent = "page",
		activeClassName = "active",
		activeStyle,
		className,
		exact,
		isActive,
		location,
		strict,
		style,
		to,
		...rest
	} = props;

	//let ariaCurrent: string|null = props["aria-current"] || "page";
	const path = typeof to === "object" ? to.pathname : to;

	// Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
	const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

	return (
		<Route
			path={escapedPath}
			exact={exact}
			strict={strict}
			location={location}
			children={({ location, match }) => {
				const isActiveFlag = !!(isActive
					? isActive(match, location)
					: match);

				const classNameValue = isActiveFlag
					? joinClassnames(className, activeClassName)
					: className;
				return (
					<Link
						aria-current={isActiveFlag ? ariaCurrent : null}
						className={classNameValue}
						style={isActiveFlag ? { ...style, ...activeStyle } : style}
						to={to}
						{...rest}
					/>
				);
			}}
		/>
	);
}



if (__DEV__) {
	const ariaCurrentType = PropTypes.oneOf([
		"page",
		"step",
		"location",
		"date",
		"time",
		"true"
	]);

	NavLink.propTypes = {
		...Link.propTypes,
		"aria-current": ariaCurrentType,
		activeClassName: PropTypes.string,
		activeStyle: PropTypes.object,
		className: PropTypes.string,
		exact: Route.propTypes.exact,
		isActive: PropTypes.func,
		location: PropTypes.object,
		strict: Route.propTypes.strict,
		style: PropTypes.object
	};
}

export default NavLink;
