import { createMemoryHistory as createHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router } from "..";
import { RouteProps } from "../Route";
import MemoryRouter from "./utils/MemoryRouter";
import renderStrict from "./utils/renderStrict";

describe("A <Route>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("without a <Router>", () => {
		it("throws an error", () => {
			jest.spyOn(console, "error").mockImplementation(() => ({}));

			expect(() => {
				renderStrict(<Route />, node);
			}).toThrow(/You should not use <Route> outside a <Router>/);
		});
	});

	it("renders when it matches", () => {
		const text = "cupcakes";

		renderStrict(
			<MemoryRouter initialEntries={["/cupcakes"]}>
				<Route path="/cupcakes">
					<h1>{text}</h1>
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain(text);
	});

	it("renders when it matches at the root URL", () => {
		const text = "cupcakes";

		renderStrict(
			<MemoryRouter initialEntries={["/"]}>
				<Route path="/">
					<h1>{text}</h1>
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain(text);
	});

	it("does not render when it does not match", () => {
		const text = "bubblegum";

		renderStrict(
			<MemoryRouter initialEntries={["/bunnies"]}>
				<Route path="/flowers">
					<h1>{text}</h1>
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).not.toContain(text);
	});

	it("matches using nextContext when updating", () => {
		const history = createHistory({
			initialEntries: ["/sushi/california"],
		});

		renderStrict(
			<Router history={history}>
				<Route path="/sushi/:roll">
					{({ match }) => <h1>{match.url}</h1>}
				</Route>
			</Router>,
			node,
		);

		history.push("/sushi/spicy-tuna");

		expect(node.innerHTML).toContain("/sushi/spicy-tuna");
	});

	describe("with dynamic segments in the path", () => {
		it("decodes them", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/a%20dynamic%20segment"]}>
					<Route path="/:id" >
						{({ match }) => <h1>{match.params.id}</h1>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain("a dynamic segment");
		});
	});

	describe("with an array of paths", () => {
		it("matches the first provided path", () => {
			ReactDOM.render(
				<MemoryRouter initialEntries={["/hello"]}>
					<Route path={["/hello", "/world"]} >
						{() => <div>Hello World</div>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain("Hello World");
		});

		it("matches other provided paths", () => {
			ReactDOM.render(
				<MemoryRouter initialEntries={["/other", "/world"]} initialIndex={1}>
					<Route path={["/hello", "/world"]} >
						{() => <div>Hello World</div>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain("Hello World");
		});

		it("provides the matched path as a string", () => {
			ReactDOM.render(
				<MemoryRouter initialEntries={["/other", "/world"]} initialIndex={1}>
					<Route path={["/hello", "/world"]} >
						{({ match }) => <div>{match.path}</div>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain("/world");
		});

		it("doesn't remount when moving from one matching path to another", () => {
			const history = createHistory();
			const mount = jest.fn();
			class MatchedRoute extends React.Component {
				public componentWillMount() {
					mount();
				}

				public render() {
					return <div>Hello World</div>;
				}
			}
			history.push("/hello");
			ReactDOM.render(
				<Router history={history}>
					<Route path={["/hello", "/world"]}>
						<MatchedRoute />
					</Route>
				</Router>,
				node,
			);

			expect(mount).toHaveBeenCalledTimes(1);
			expect(node.innerHTML).toContain("Hello World");

			history.push("/world/somewhere/else");

			expect(mount).toHaveBeenCalledTimes(1);
			expect(node.innerHTML).toContain("Hello World");
		});
	});

	describe("with a unicode path", () => {
		it("is able to match", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/パス名"]}>
					<Route path="/パス名" >
						{({ match }) => <h1>{match.url}</h1>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain("/パス名");
		});
	});

	describe("with escaped special characters in the path", () => {
		it("is able to match", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza (1)"]}>
					<Route path="/pizza \(1\)">
						{({ match }) => <h1>{match.url}</h1>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain("/pizza (1)");
		});
	});

	describe("with `exact=true`", () => {
		it("renders when the URL does not have a trailing slash", () => {
			const text = "bubblegum";

			renderStrict(
				<MemoryRouter initialEntries={["/somepath/"]}>
					<Route exact={true} path="/somepath">
						{() => <h1>{text}</h1>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain(text);
		});

		it("renders when the URL has trailing slash", () => {
			const text = "bubblegum";

			renderStrict(
				<MemoryRouter initialEntries={["/somepath"]}>
					<Route exact={true} path="/somepath/">
						<h1>{text}</h1>}
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain(text);
		});

		describe("and `strict=true`", () => {
			it("does not render when the URL has a trailing slash", () => {
				const text = "bubblegum";

				renderStrict(
					<MemoryRouter initialEntries={["/somepath/"]}>
						<Route
							exact={true}
							strict={true}
							path="/somepath"
							render={() => <h1>{text}</h1>}
						/>
					</MemoryRouter>,
					node,
				);

				expect(node.innerHTML).not.toContain(text);
			});

			it("does not render when the URL does not have a trailing slash", () => {
				const text = "bubblegum";

				renderStrict(
					<MemoryRouter initialEntries={["/somepath"]}>
						<Route
							exact={true}
							strict={true}
							path="/somepath/"
							render={() => <h1>{text}</h1>}
						/>
					</MemoryRouter>,
					node,
				);

				expect(node.innerHTML).not.toContain(text);
			});
		});
	});

	describe("the `location` prop", () => {
		it("overrides `context.location`", () => {
			const text = "bubblegum";

			renderStrict(
				<MemoryRouter initialEntries={["/cupcakes"]}>
					<Route location={{ pathname: "/bubblegum", search: "", state: "", hash: "" }}
						path="/bubblegum">
						<h1>{text}</h1>
					</Route>
				</MemoryRouter>,
				node,
			);

			expect(node.innerHTML).toContain(text);
		});
	});
});
