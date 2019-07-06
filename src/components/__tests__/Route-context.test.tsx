import { createMemoryHistory as createHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router } from "../..";
import { RouterContext, RouterContextType } from "../../RouterContext";
import renderStrict from "../../testutils/renderStrict";

describe("A <Route>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("context", () => {
		let context: RouterContextType | null = null;
		function ContextChecker() {
			return (
				<RouterContext.Consumer>
					{(value) => {
						context = value;
						return null;
					}}
				</RouterContext.Consumer>
			);
		}

		afterEach(() => {
			context = undefined;
		});

		it("has a `history` property", () => {
			const history = createHistory();

			renderStrict(
				<Router history={history}>
					<Route ><ContextChecker /></Route>
				</Router>,
				node,
			);

			expect(context).toBeTruthy();
			if (context) {
				expect(context.history).toBe(history);
			}
		});

		it("has a `location` property", () => {
			const history = createHistory();

			renderStrict(
				<Router history={history}>
					<Route ><ContextChecker /></Route>
				</Router>,
				node,
			);
			expect(context).toBeTruthy();
			if (context) {
				expect(context.location).toBe(history.location);
			}
		});

		it("has a `match` property", () => {
			const history = createHistory({
				initialEntries: ["/"],
			});

			renderStrict(
				<Router history={history}>
					<Route >
						<ContextChecker />
					</Route>
				</Router>,
				node,
			);
			expect(context).toBeTruthy();
			if (context) {
				expect(context.match).toMatchObject({
					path: "/",
					url: "/",
					params: {},
					isExact: true,
				});
			}
		});
	});
});
