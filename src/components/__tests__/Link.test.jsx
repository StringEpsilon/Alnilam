import React from "react";
import ReactDOM from "react-dom";
import { Link } from "../../index";
import MemoryRouter from "../../testutils/MemoryRouter";
import renderStrict from "../../testutils/renderStrict";
import { createHashHistory, createMemoryHistory } from "history";
import Router from "../Router";
import ReactTestUtils from "react-dom/test-utils";

describe("A <Link>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("calls onClick eventhandler and history.push", () => {
		const clickHandler = jest.fn();
		const memoryHistory = createMemoryHistory();
		memoryHistory.push = jest.fn();
		const to = "/the/path?the=query#the-hash";

		renderStrict(
			<Router history={memoryHistory}>
				<Link to={to} onClick={clickHandler}>link</Link>
			</Router>,
			node
		);

		const a = node.querySelector("a");
		ReactTestUtils.Simulate.click(a, {
			defaultPrevented: false,
			button: 0,
		});

		expect(clickHandler).toBeCalledTimes(1);
		expect(memoryHistory.push).toBeCalledTimes(1);
		expect(memoryHistory.push).toBeCalledWith(to);
	})

	it("calls onClick eventhandler and history.push", () => {
		const clickHandler = jest.fn();
		const memoryHistory = createMemoryHistory({ initialEntries: ["/root"] });
		const push = jest.spyOn(memoryHistory, "push");
		const to = { hash: "#the-hash" }

		renderStrict(
			<Router history={memoryHistory}>
				<Link to={to} onClick={clickHandler} mergeLocations={true}>link</Link>
			</Router>,
			node
		);

		expect(memoryHistory.location).toMatchObject({
			hash: "",
			pathname: "/root",
		});

		const a = node.querySelector("a");
		ReactTestUtils.Simulate.click(a, {
			defaultPrevented: false,
			button: 0,
		});
		expect(memoryHistory.location).toMatchObject({
			hash: "#the-hash",
			pathname: "/root",
		});
	})

	it("prevents default on exception in onClick callback", () => {
		const memoryHistory = createMemoryHistory();
		memoryHistory.push = jest.fn();
		const onClick = () => { throw new Error };
		const mockPreventDefault = jest.fn();

		renderStrict(
			<Router history={memoryHistory}>
				<Link to="/foo/bar" onClick={onClick}>link</Link>
			</Router>,
			node
		);
		console.error = jest.fn(); // keep console clean.
		try {
			const a = node.querySelector("a");
			ReactTestUtils.Simulate.click(a, {
				defaultPrevented: false,
				preventDefault: mockPreventDefault,
				button: 1,
			});
		} catch (e) {
			// nothing to do.
		}

		console.error.mockRestore();
		expect(mockPreventDefault).toHaveBeenCalled();
		expect(memoryHistory.push).toBeCalledTimes(0);
	})

	it("does not call history.push if link has protocol", () => {
		const memoryHistory = createMemoryHistory();
		memoryHistory.push = jest.fn();

		renderStrict(
			<Router history={memoryHistory}>
				<Link to={"https://en.wikipedia.org/wiki/Star"}>link</Link>
			</Router>,
			node
		);

		const a = node.querySelector("a");
		ReactTestUtils.Simulate.click(a, {
			defaultPrevented: false,
			button: 1,
		});

		expect(memoryHistory.push).toBeCalledTimes(0);
	})


	it("does not call history.push on right click", () => {
		const memoryHistory = createMemoryHistory();
		memoryHistory.push = jest.fn();
		const to = "/the/path?the=query#the-hash";

		renderStrict(
			<Router history={memoryHistory}>
				<Link to={to}>link</Link>
			</Router>,
			node
		);

		const a = node.querySelector("a");
		ReactTestUtils.Simulate.click(a, {
			defaultPrevented: false,
			button: 1,
		});

		expect(memoryHistory.push).toBeCalledTimes(0);
	})

	it("does not call history.push on prevented event.", () => {
		const memoryHistory = createMemoryHistory();
		memoryHistory.push = jest.fn();
		const to = "/the/path?the=query#the-hash";

		renderStrict(
			<Router history={memoryHistory}>
				<Link to={to}>link</Link>
			</Router>,
			node
		);

		const a = node.querySelector("a");
		ReactTestUtils.Simulate.click(a, {
			defaultPrevented: true,
			button: 0,
		});

		expect(memoryHistory.push).toBeCalledTimes(0);
	})

	it("does not call history.push target not specifying 'self'", () => {
		const memoryHistory = createMemoryHistory();
		memoryHistory.push = jest.fn();
		const to = "/the/path?the=query#the-hash";

		renderStrict(
			<Router history={memoryHistory}>
				<Link to={to} target="_blank">link</Link>
			</Router>,
			node
		);

		const a = node.querySelector("a");
		ReactTestUtils.Simulate.click(a, {
			defaultPrevented: false,
			button: 0,
		});

		expect(memoryHistory.push).toBeCalledTimes(0);
	})

	describe("with no <Router>", () => {
		it("throws an error", () => {
			jest.spyOn(console, "error").mockImplementation(() => { });

			expect(() => {
				renderStrict(<Link to="/">link</Link>, node);
			}).toThrow(/You should not use <Link> outside a <Router>/);

			expect(console.error).toHaveBeenCalledTimes(2);
		});
	});

	describe("with no `to` prop", () => {
		it("logs an error to the console", () => {
			jest.spyOn(console, "error").mockImplementation(() => { });

			renderStrict(
				<MemoryRouter>
					<Link>link</Link>
				</MemoryRouter>,
				node
			);

			expect(console.error).toHaveBeenCalledWith(
				expect.stringContaining("The prop `to` is marked as required in `Link`")
			);
		});
	});

	it("accepts a string `to` prop", () => {
		const to = "/the/path?the=query#the-hash";

		renderStrict(
			<MemoryRouter>
				<Link to={to}>link</Link>
			</MemoryRouter>,
			node
		);

		const a = node.querySelector("a");
		expect(a.getAttribute("href")).toEqual("/the/path?the=query#the-hash");
	});

	it("accepts an object `to` prop", () => {
		const to = {
			pathname: "/the/path",
			search: "?the=query",
			hash: "#the-hash"
		};

		renderStrict(
			<MemoryRouter>
				<Link to={to}>link</Link>
			</MemoryRouter>,
			node
		);

		const a = node.querySelector("a");

		expect(a.getAttribute("href")).toEqual("/the/path?the=query#the-hash");
	});

	describe("with no pathname", () => {
		it("resolves using the current location", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/somewhere"]}>
					<Link to="?rendersWithPathname=true">link</Link>
				</MemoryRouter>,
				node
			);

			const a = node.querySelector("a");

			expect(a.getAttribute("href")).toEqual(
				"/somewhere?rendersWithPathname=true"
			);
		});
	});

	it("exposes its ref via an innerRef callback prop", done => {
		function refCallback(n) {
			if (n) {
				expect(n.tagName).toEqual("A");
				done();
			}
		}

		renderStrict(
			<MemoryRouter>
				<Link to="/" innerRef={refCallback}>
					link
        		</Link>
			</MemoryRouter>,
			node
		);
	});

	it("exposes its ref via an innerRef RefObject prop", done => {
		const refObject = {
			get current() {
				return null;
			},
			set current(n) {
				if (n) {
					expect(n.tagName).toEqual("A");
					done();
				}
			}
		};

		renderStrict(
			<MemoryRouter>
				<Link to="/" innerRef={refObject}>
					link
        		</Link>
			</MemoryRouter>,
			node
		);
	});

	describe("with a <HashRouter>", () => {
		afterEach(() => {
			window.history.replaceState(null, "", "#");
		});

		function createLinkNode(to) {
			renderStrict(
				<Router history={createHashHistory()}>
					<Link to={to} />
				</Router>,
				node
			);

			return node.querySelector("a");
		}

		it("has the correct href", () => {
			const linkNode = createLinkNode("/foo");
			expect(linkNode.getAttribute("href")).toEqual("#/foo");
		});

		it("has the correct href with a leading slash if it is missing", () => {
			const linkNode = createLinkNode("foo");
			expect(linkNode.getAttribute("href")).toEqual("#/foo");
		});

	});
});
