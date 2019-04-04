import { createMemoryHistory, Location } from "history";
import React from "react";
import Router from "../../Router";

interface MemoryRouterProps {
	basename?: string;
	context?: any; // TODO
	location?: Location;
	staticContext?: any;
	getUserConfirmation?: any; // TODO
	initialEntries?: string[];
	initialIndex?: number;
	keyLength?: number;
}

/**
 * The public API for a <Router> that stores location in memory.
 */
class MemoryRouter extends React.Component<MemoryRouterProps> {
	public static propTypes: object;
	public history = createMemoryHistory(this.props);

	public render() {
		return <Router history={this.history} children={this.props.children} />;
	}
}

export default MemoryRouter;
