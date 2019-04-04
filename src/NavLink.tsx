import { Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import Link from "./Link";
import matchPath, { MatchResult } from "./matchPath";
import RouterContext from "./RouterContext";
import { RouterException } from "./RouterException";

function joinClassnames(...classnames: any[]): string {
	return classnames.filter((i) => i).join(" ");
}

export interface NavLinkProps {
	"aria-current"?: string | null;
	activeClassName?: string;
	activeStyle?: object;
	className?: string;
	exact?: boolean;
	isActive?: (match: MatchResult | null, location: Location) => boolean;
	location?: Location;
	strict?: boolean;
	style?: any;
	to: string | Location;
	children: React.ReactNode;

	staticContext?: any;
}

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
export default function NavLink(props: NavLinkProps) {
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
		...rest
	} = props;

	// let ariaCurrent: string|null = props["aria-current"] || "page";
	const path = typeof to === "object" ? to.pathname : to;

	// Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
	const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

	return (
		<RouterContext.Consumer>
			{(context) => {
				if (!context) {
					throw RouterException("NavLink");
				}

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
		</RouterContext.Consumer>
	);
}

if (process.env.NODE_ENV !== "production") {
	const ariaCurrentType = PropTypes.oneOf([
		"page",
		"step",
		"location",
		"date",
		"time",
		"true",
	]);

	NavLink.propTypes = {
		...Link.propTypes,
		"aria-current": ariaCurrentType,
		activeClassName: PropTypes.string,
		activeStyle: PropTypes.object,
		className: PropTypes.string,
		exact: PropTypes.bool,
		isActive: PropTypes.func,
		location: PropTypes.object,
		strict: PropTypes.bool,
		style: PropTypes.object,
	};
}
