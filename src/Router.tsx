import { History, Location } from "history";
import PropTypes from "prop-types";
import React from "react";
import warning from "tiny-warning";
import RouterContext from "./RouterContext";

export interface RouterProps {
	basename?: string;
	context?: any; // TODO
	location?: Location;
	history: History | any; // the "any" is to work around the static router.
	staticContext?: any;
}

/**
 * The public API for putting history on context.
 */
class Router extends React.Component<RouterProps, { location: Location }> {
	public static propTypes: ObjectMap<any>;

	private static computeRootMatch(pathname: string): Match {
		return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
	}
	private isMounted: boolean;
	private pendingLocation: Location | null;
	private unlisten: any;

	constructor(props: RouterProps) {
		super(props);

		this.state = {
			location: props.history.location,
		};

		// This is a bit of a hack. We have to start listening for location
		// changes here in the constructor in case there are any <Redirect>s
		// on the initial render. If there are, they will replace/push when
		// they mount and since cDM fires in children before parents, we may
		// get a new location before the <Router> is mounted.
		this.isMounted = false;
		this.pendingLocation = null;

		if (!props.staticContext) {
			this.unlisten = props.history.listen((location: Location) => {
				if (this.isMounted) {
					this.setState({ location });
				} else {
					this.pendingLocation = location;
				}
			});
		}
	}

	public componentDidMount() {
		this.isMounted = true;

		if (this.pendingLocation) {
			this.setState({ location: this.pendingLocation });
		}
	}

	public componentWillUnmount() {
		if (this.unlisten) { this.unlisten(); }
	}

	public render() {
		return (
			<RouterContext.Provider
				children={this.props.children || null}
				value={{
					history: this.props.history,
					location: this.state.location,
					match: Router.computeRootMatch(this.state.location.pathname),
					staticContext: this.props.staticContext,
				}}
			/>
		);
	}
}

if (__DEV__) {
	Router.propTypes = {
		children: PropTypes.node,
		history: PropTypes.object.isRequired,
		staticContext: PropTypes.object,
	};

	Router.prototype.componentDidUpdate = function(prevProps) {
		warning(
			prevProps.history === this.props.history,
			"You cannot change <Router history>",
		);
	};
}

export default Router;
