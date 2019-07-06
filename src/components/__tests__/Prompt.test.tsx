import { createMemoryHistory as createHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Prompt, Router } from "../..";
import renderStrict from "../../testutils/renderStrict";

describe("A <Prompt>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("without a <Router>", () => {
		it("throws an error", () => {
			jest.spyOn(console, "error").mockImplementation(() => null);

			expect(() => {
				renderStrict(<Prompt />, node);
			}).toThrow(/You should not use <Prompt> outside a <Router>/);
		});
	});

	it("calls getUserConfirmation with the prompt message", () => {
		const getUserConfirmation = jest.fn((message, callback) => {
			callback(false);
		});

		const history = createHistory({
			getUserConfirmation,
		});

		renderStrict(
			<Router history={history}>
				<Prompt message="Are you sure?" />
			</Router>,
			node,
		);

		history.push("/somewhere");

		expect(getUserConfirmation).toHaveBeenCalledWith(
			expect.stringMatching("Are you sure?"),
			expect.any(Function),
		);
	});

	describe("with when=false", () => {
		it("does not call getUserConfirmation", () => {
			const getUserConfirmation = jest.fn((message, callback) => {
				callback(false);
			});

			const history = createHistory({
				getUserConfirmation,
			});

			renderStrict(
				<Router history={history}>
					<Prompt message="Are you sure?" when={false} />
				</Router>,
				node,
			);

			history.push("/somewhere");

			expect(getUserConfirmation).not.toHaveBeenCalled();
		});
	});
});
