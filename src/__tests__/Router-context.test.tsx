import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory as createHistory } from "history";
import { Router, RouterContext } from "..";

import renderStrict from "./utils/renderStrict";
import { RouterContextType } from "../RouterContext";

describe("A <Router>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("context", () => {
		let context: RouterContextType | null = null;
		function ContextChecker() {
			return (
				<RouterContext.Consumer>
					{value => {
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
					<ContextChecker />
				</Router>,
				node
			);

			expect(context).not.toBeNull();
			if (context) {
				expect(context.history).toBe(history);
			}
		});

		it("has a `location` property", () => {
			const history = createHistory();

			renderStrict(
				<Router history={history}>
					<ContextChecker />
				</Router>,
				node
			);
			expect(context).not.toBeNull();
			if (context) {
				expect(context.location).toBe(history.location);
			}
		});

		it("has a `match` property", () => {
			const history = createHistory({
				initialEntries: ["/"]
			});

			renderStrict(
				<Router history={history}>
					<ContextChecker />
				</Router>,
				node
			);

			expect(context).not.toBeNull();
			if (context) {
				expect(context.match).toMatchObject({
					path: "/",
					url: "/",
					params: {},
					isExact: true
				});
			}
		});

		it("does not have a `staticContext` property", () => {
			const history = createHistory();

			renderStrict(
				<Router history={history}>
					<ContextChecker />
				</Router>,
				node
			);

			expect(context).not.toBeNull();
			if (context) {
				expect(context.staticContext).toBe(undefined);
			}
		});
	});
});
