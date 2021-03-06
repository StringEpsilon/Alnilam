import React from "react";
import ReactDOM from "react-dom";
import { Redirect, Route, Switch } from "../..";
import MemoryRouter from "../../testutils/MemoryRouter";
import renderStrict from "../../testutils/renderStrict";
import waitForRedirects from "../../testutils/waitForRedirects";

describe("A <Switch>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("without a <Router>", () => {
		it("throws an error", () => {
			jest.spyOn(console, "error").mockImplementation(() => null);

			expect(() => {
				renderStrict(<Switch />, node);
			}).toThrow(/You should not use <Switch> outside a <Router>/);
		});
	});

	it("renders the first <Route> that matches the URL", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/one"]}>
				<Switch>
					<Route path="/one" > <h1>one</h1> </Route>
					<Route path="/two" > <h1>two</h1> </Route>
				</Switch>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain("one");
	});

	it("renders the first <Route> that matches the URL with a relative path", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/milkyway/alnilam"]}>
				<Route path="/milkyway">
					<Switch>
						<Route path="./alnilam" > <h1>one</h1> </Route>
						<Route path="./rigel" > <h1>two</h1> </Route>
					</Switch>
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain("one");
	});

	it("does not render a second <Route> that also matches the URL", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/one"]}>
				<Switch>
					<Route path="/one" > <h1>one</h1> </Route>
					<Route path="/one" > <h1>two</h1> </Route>
				</Switch>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).not.toContain("two");
	});

	it("renders the first <Redirect> that matches the URL", (done) => {
		renderStrict(
			<MemoryRouter initialEntries={["/three"]}>
				<Switch>
					<Route path="/one" > <h1>one</h1> </Route>
					<Route path="/two" > <h1>two</h1> </Route>
					<Redirect from="/three" to="/two" />
				</Switch>
			</MemoryRouter>,
			node,
		);

		waitForRedirects(() => {
			expect(node.innerHTML).toContain("two");
			done();
		});
	});

	it("does not render a second <Redirect> that also matches the URL", (done) => {
		renderStrict(
			<MemoryRouter initialEntries={["/three"]}>
				<Switch>
					<Route path="/one" > <h1>one</h1> </Route>
					<Route path="/two" > <h1>two</h1> </Route>
					<Redirect from="/three" to="/two" />
					<Redirect from="/three" to="/one" />
				</Switch>
			</MemoryRouter>,
			node,
		);

		waitForRedirects(() => {
			expect(node.innerHTML).toContain("two");
			done();
		});
	});

	it("renders a Route with no `path` prop", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/two"]}>
				<Switch>
					<Route path="/one" > <h1>one</h1> </Route>
					<Route > <h1>two</h1> </Route>
				</Switch>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain("two");
	});

	it("renders a Redirect with no `from` prop", (done) => {
		renderStrict(
			<MemoryRouter initialEntries={["/three"]}>
				<Switch>
					<Route path="/one" > <h1>one</h1> </Route>
					<Redirect to="/one" />
					<Route path="/two" > <h1>two</h1> </Route>
				</Switch>
			</MemoryRouter>,
			node,
		);

		waitForRedirects(() => {
			expect(node.innerHTML).toContain("one");
			done();
		});
	});

	it("handles subsequent redirects", (done) => {
		renderStrict(
			<MemoryRouter initialEntries={["/one"]}>
				<Switch>
					<Redirect from="/one" to="/two" />
					<Redirect from="/two" to="/three" />
					<Route path="/three"> <h1>three</h1> </Route>
				</Switch>
			</MemoryRouter>,
			node,
		);

		waitForRedirects(() => {
			expect(node.innerHTML).toContain("three");
			done();
		});
	});

	it("handles comments", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/cupcakes"]}>
				<Switch>
					<Route path="/bubblegum">
						<div>bub</div>
					</Route>
					{/* this is a comment */}
					<Route path="/cupcakes">
						<div>cup</div>
					</Route>
				</Switch>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).not.toContain("bub");
		expect(node.innerHTML).toContain("cup");
	});

	it("renders with non-element children", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/one"]}>
				<Switch>
					<Route path="/one" > <h1>one</h1> </Route>
					{false}
					{undefined}
				</Switch>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toMatch(/one/);
	});

	it("can use a `location` prop instead of `router.location`", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/one"]}>
				<Switch location={{ pathname: "/two", search: "", hash: "", state: "" }}>
					<Route path="/one">
						<h1>one</h1>
					</Route>
					<Route path="/two">
						<h1>two</h1>
					</Route>
				</Switch>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toMatch(/two/);
	});
});
