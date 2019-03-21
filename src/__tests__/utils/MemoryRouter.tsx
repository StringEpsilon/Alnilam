import React from "react";
import { createMemoryHistory, Location } from "history";

import Router from "../../Router";

interface MemoryRouterProps {
	basename?: string,
	context?: any, // TODO
	location?: Location,
	staticContext?: any,
	getUserConfirmation?: any; // TODO
	initialEntries?: string[];
	initialIndex?: number;
	keyLength?: number;
}

/**
 * The public API for a <Router> that stores location in memory.
 */
class MemoryRouter extends React.Component<MemoryRouterProps> {
	history = createMemoryHistory(this.props);
	static propTypes: ObjectMap<any>;

	render() {
		return <Router history={this.history} children={this.props.children} />;
	}
}

export default MemoryRouter;
