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

	it("Doesn't break when rendered inside stateless component", () => {

		const Stateless = (props: any) => {
			if (props.flag === 1) {
				return <Redirect to="/go-out" />;
			}

			return <b>Stateless!</b>;
		};

		expect(() => {
			renderStrict(
				<MemoryRouter>
					<Stateless flag={1} />
				</MemoryRouter>,
				node,
			);
		}).not.toThrow();
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
