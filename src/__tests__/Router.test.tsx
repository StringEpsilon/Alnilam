import { createMemoryHistory as createHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "..";

import renderStrict from "./utils/renderStrict";

describe("A <Router>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("with no children", () => {
		it("does not throw an error", () => {
			expect(() => {
				renderStrict(<Router history={createHistory()} />, node);
			}).not.toThrow();
		});
	});

	describe("with one child", () => {
		it("does not throw an error", () => {
			expect(() => {
				renderStrict(
					<Router history={createHistory()}>
						<p>Bar</p>
					</Router>,
					node,
				);
			}).not.toThrow();
		});
	});

	describe("inside another Router", () => {
		it("throws an error", () => {
			try {
				expect(() => {
					renderStrict(
						<Router history={createHistory()}>
							<Router history={createHistory()} />
						</Router >,
						node,
					);
				}).toThrow();
			} catch (e) {
				// .
			}
		});
	});

	describe("with more than one child", () => {
		it("does not throw an error", () => {
			expect(() => {
				renderStrict(
					<Router history={createHistory()}>
						<p>Bubblegum</p>
						<p>Cupcakes</p>
					</Router>,
					node,
				);
			}).not.toThrow();
		});
	});
});
