import React from "react";
import ReactDOM from "react-dom";
import { Route, useMatch } from "../../index";
import MemoryRouter from "../../testutils/MemoryRouter";
import renderStrict from "../../testutils/renderStrict";

describe("useMatch", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("matches a basic path", () => {
		const Matcher = () => {
			const match = useMatch("/milkyway");
			expect(match).not.toBeNull();
			expect(match.path).toBe("/milkyway");
			return null;
		};

		renderStrict(
			<MemoryRouter initialEntries={["/milkyway"]}>
				<Matcher />
			</MemoryRouter>,
			node,
		);

		expect.assertions(2);
	});

	it("matches a path with params", () => {
		const Matcher = () => {
			const match = useMatch("/milkyway/:system");
			expect(match).not.toBeNull();
			expect(match.path).toBe("/milkyway/:system");
			expect(match.url).toBe("/milkyway/sol");
			expect(match.params.system).toBe("sol");
			return null;
		};

		renderStrict(
			<MemoryRouter initialEntries={["/milkyway/sol"]}>
				<Matcher />
			</MemoryRouter>,
			node,
		);

		expect.assertions(4);
	});

	it("matches a relative path", () => {
		const Matcher = () => {
			const match = useMatch("./sol");
			expect(match).not.toBeNull();
			expect(match.path).toBe("/milkyway/sol");
			return null;
		};

		renderStrict(
			<MemoryRouter initialEntries={["/milkyway/sol"]}>
				<Route path="/milkyway">
					<Matcher />
				</Route>
			</MemoryRouter>,
			node,
		);

		expect.assertions(2);
	});

	it("matches a relative path as a param:", () => {
		const Matcher = () => {
			const match = useMatch("./:system");
			expect(match).not.toBeNull();
			expect(match.path).toBe("/milkyway/:system");
			expect(match.url).toBe("/milkyway/sol");
			expect(match.params.system).toBe("sol");
			return null;
		};

		renderStrict(
			<MemoryRouter initialEntries={["/milkyway/sol"]}>
				<Route path="/milkyway">
					<Matcher />
				</Route>
			</MemoryRouter>,
			node,
		);

		expect.assertions(4);
	});
});
