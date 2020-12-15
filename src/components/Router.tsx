import { History, Location } from "verlauf";
import PropTypes from "prop-types";
import React from "react";
import warning from "tiny-warning";
import { MatchResult } from "../matchPath";
import { RouterContext } from "../RouterContext";
import Focus from "./Focus";

export interface RouterProps {
	basename?: string;
	location?: Location;
	history: History | any; // the "any" is to work around the static router.
	manageFocus?: boolean;
	staticContext?: any;
}

interface RouterState {
	location: Location;
	previousLocation?: Location;
	history: History;
	staticContext: any;
}

function computeRootMatch(pathname: string): MatchResult {
	return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
}

/**
 * The public API for putting history on context.
 */
export default class Router extends React.Component<RouterProps, RouterState> {
	static propTypes: any;
	// tslint:disable-next-line:variable-name
	private _isMounted: boolean;
	private pendingLocation: Location | null;
	private unlisten: any;

	constructor(props: RouterProps) {
		super(props);

		this.state = {
			location: props.history.location,
			history: this.props.history,
			staticContext: this.props.staticContext,
		};

		// This is a bit of a hack. We have to start listening for location
		// changes here in the constructor in case there are any <Redirect>s
		// on the initial render. If there are, they will replace/push when
		// they mount and since cDM fires in children before parents, we may
		// get a new location before the <Router> is mounted.
		this._isMounted = false;
		this.pendingLocation = null;

		if (!props.staticContext) {
			this.unlisten = props.history.listen((location: Location) => {
				if (this._isMounted) {
					const previousLocation = this.state.location;
					this.setState({
						location,
						previousLocation,
					});
				} else {
					this.pendingLocation = location;
				}
			});
		}
	}

	public componentDidMount(): void {
		this._isMounted = true;

		if (this.pendingLocation) {
			const previousLocation = this.state.location;
			this.setState({ location: this.pendingLocation, previousLocation });
		}
	}

	public componentWillUnmount(): void {
		if (this.unlisten) { this.unlisten(); }
	}

	public render(): JSX.Element {
		if (process.env.NODE_ENV !== "production") {
			if (this.context && this.context.history) {
				throw new Error("A <Router> can't work inside another <Router>");
			}
		}
		return (
			<RouterContext.Provider
				value={{
					...this.state,
					match: computeRootMatch(this.state.location.pathname),
				}}
			>
				{this.props.manageFocus ?
					<Focus>
						{this.props.children}
					</Focus>
					:
					this.props.children
				}
			</RouterContext.Provider>
		);
	}
}

if (process.env.NODE_ENV !== "production") {
	Router.propTypes = {
		children: PropTypes.node,
		history: PropTypes.object.isRequired,
		staticContext: PropTypes.object,
	};

	Router.prototype.componentDidUpdate = function (prevProps) {
		warning(
			prevProps.history === this.props.history,
			"Changing Router history has no effect.",
		);
	};
}
