import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "..";
import MemoryRouter from "./utils/MemoryRouter";
import renderStrict from "./utils/renderStrict";
import Router from "../Router";
import { createMemoryHistory } from "history";

describe("A <Switch>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("does not remount a <Route>'s component", () => {
		let mountCount = 0;

		class MountCounter extends React.Component<any> {
			componentDidMount() {
				mountCount++;
			}

			render() {
				return null;
			}
		}
		const memoryHistory = createMemoryHistory({ initialEntries: ["/one"] })
		renderStrict(
			<Router history={memoryHistory} >
				<Switch>
					<Route path="/one" component={MountCounter} />
					<Route path="/two" component={MountCounter} />
				</Switch>
			</Router>,
			node
		);

		expect(mountCount).toBe(1);
		memoryHistory.push("/two");

		expect(mountCount).toBe(1);
		memoryHistory.push("/one");

		expect(mountCount).toBe(1);
	});
});
