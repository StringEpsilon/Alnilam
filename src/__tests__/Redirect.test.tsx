import { createLocation } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Route, Switch } from "../index";
import MemoryRouter from "./utils/MemoryRouter";
import renderStrict from "./utils/renderStrict";

describe("A <Redirect>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("inside a functional component", () => {
		const Stateless = (props: any) => {
			return <Redirect to={props.to} />;
		};

		it("doesn't break / throw when rendered with string `to`", () => {
			expect(() => {
				renderStrict(
					<MemoryRouter>
						<Stateless to="/go-out" />
					</MemoryRouter>,
					node,
				);
			}).not.toThrow();
		});

		it("doesn't break / throw when rendered with location `to`", () => {
			const to = createLocation("/go-out?search=foo#hash");
			expect(() => {
				renderStrict(
					<MemoryRouter>
						<Stateless to={to} />
					</MemoryRouter>,
					node,
				);
			}).not.toThrow();
		});
	});

	describe("inside a <Route>", () => {
		it("respects relative routes", () => {
			let url;
			let routedMatch;

			renderStrict(
				<MemoryRouter initialEntries={["/milkyway/sol"]}>
					<Route path="/milkyway">
						<Redirect
							from="./sol"
							to="./proxima"
						/>
						<Route path="./proxima">
							{({ match }) => {
								routedMatch = match;
								url = match && match.url;
								return null;
							}}
						</Route>
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(routedMatch).not.toBe(null);
			expect(url).toBe("/milkyway/proxima");
		});

		it("respects relative routes with params", () => {
			let routedMatch;

			renderStrict(
				<MemoryRouter initialEntries={["/milkyway/sol"]}>
					<Route path="/:galaxy">
						<Redirect
							from="./sol"
							to="./proxima"
						/>
						<Route path="./proxima">
							{({ match }) => {
								routedMatch = match;
								return null;
							}}
						</Route>
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(routedMatch).not.toBe(null);
			expect(routedMatch.params).toEqual({
				galaxy: "milkyway",
			});
			expect(routedMatch.url).toBe("/milkyway/proxima");
		});
	});

	describe("inside a <Switch>", () => {
		it("automatically interpolates params", () => {
			let params;

			renderStrict(
				<MemoryRouter initialEntries={["/users/mjackson/messages/123"]}>
					<Switch>
						<Redirect
							from="/users/:username/messages/:messageId"
							to="/:username/messages/:messageId"
						/>
						<Route path="/:username/messages/:messageId">
							{({ match }) => {
								params = match.params;
								return null;
							}}
						</Route>
					</Switch>
				</MemoryRouter>,
				node,
			);

			expect(params).toMatchObject({
				username: "mjackson",
				messageId: "123",
			});
		});
	});
});
