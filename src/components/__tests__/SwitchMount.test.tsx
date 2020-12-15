import { createMemoryHistory } from "verlauf";
import React from "react";
import ReactDOM from "react-dom";
import renderStrict from "../../testutils/renderStrict";
import Route from "../Route";
import Router from "../Router";
import Switch from "../Switch";

describe("A <Switch>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("does not remount a <Route>'s component", () => {
		let mountCount = 0;

		class MountCounter extends React.Component<any> {
			public componentDidMount() {
				mountCount++;
			}

			public render() {
				return null;
			}
		}
		const memoryHistory = createMemoryHistory({ initialEntries: ["/one"] });
		renderStrict(
			<Router history={memoryHistory} >
				<Switch>
					<Route path="/one" ><MountCounter /></Route>
					<Route path="/two" ><MountCounter /></Route>
				</Switch>
			</Router>,
			node,
		);

		expect(mountCount).toBe(1);
		memoryHistory.push("/two");

		expect(mountCount).toBe(1);
		memoryHistory.push("/one");

		expect(mountCount).toBe(1);
	});
});
