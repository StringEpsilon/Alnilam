import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory as createHistory } from "history";
import { Router, Match as MatchComponent } from "..";
import MemoryRouter from "./utils/MemoryRouter";
import renderStrict from "./utils/renderStrict";
import { RouteProps } from "../Route";

describe("A <Route>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("without a <Router>", () => {
		it("throws an error", () => {
			jest.spyOn(console, "error").mockImplementation(() => { });

			expect(() => {
				renderStrict(<MatchComponent><div /></MatchComponent>, node);
			}).toThrow(/You should not use <Route> outside a <Router>/);
		});
	});

	it("renders when it matches", () => {
		const text = "cupcakes";

		renderStrict(
			<MemoryRouter initialEntries={["/cupcakes"]}>
				<MatchComponent path="/cupcakes">
					<h1>{text}</h1>
				</MatchComponent>
			</MemoryRouter>,
			node
		);

		expect(node.innerHTML).toContain(text);
	});

	it("also renders when it does not match", () => {
		const text = "bubblegum";

		renderStrict(
			<MemoryRouter initialEntries={["/bunnies"]}>
				<MatchComponent path="/flowers">
					<h1>{text}</h1>
				</MatchComponent>
			</MemoryRouter>,
			node
		);

		expect(node.innerHTML).toContain(text);
	});

	it("matches using nextContext when updating", () => {
		const history = createHistory({
			initialEntries: ["/sushi/california"]
		});

		renderStrict(
			<Router history={history}>
				<MatchComponent path="/sushi/:roll">
					{({ match }) => <h1>{match.url}</h1>}
				</MatchComponent>
				/>
			</Router>,
			node
		);

		history.push("/sushi/spicy-tuna");

		expect(node.innerHTML).toContain("/sushi/spicy-tuna");
	});

	describe("with dynamic segments in the path", () => {
		it("decodes them", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/a%20dynamic%20segment"]}>
					<MatchComponent path="/:id">
						{({ match }) => <h1>{match.params.id}</h1>}
					</MatchComponent>
					/>
				</MemoryRouter>,
				node
			);

			expect(node.innerHTML).toContain("a dynamic segment");
		});
	});

	describe("with an array of paths", () => {
		it("matches the first provided path", () => {
			const node = document.createElement("div");
			ReactDOM.render(
				<MemoryRouter initialEntries={["/hello"]}>
					<MatchComponent path={["/hello", "/world"]}>
						{() => <div>Hello World</div>}
					</MatchComponent>
				</MemoryRouter>,
				node
			);

			expect(node.innerHTML).toContain("Hello World");
		});

		it("matches other provided paths", () => {
			const node = document.createElement("div");
			ReactDOM.render(
				<MemoryRouter initialEntries={["/other", "/world"]} initialIndex={1}>
					<MatchComponent path={["/hello", "/world"]}>
						{() => <div>Hello World</div>}
					</MatchComponent>
				</MemoryRouter>,
				node
			);

			expect(node.innerHTML).toContain("Hello World");
		});

		it("provides the matched path as a string", () => {
			const node = document.createElement("div");
			ReactDOM.render(
				<MemoryRouter initialEntries={["/other", "/world"]} initialIndex={1}>
					<MatchComponent path={["/hello", "/world"]}>
						{({ match }) => <div>{match.path}</div>}
					</MatchComponent>
				</MemoryRouter>,
				node
			);

			expect(node.innerHTML).toContain("/world");
		});

		it("doesn't remount when moving from one matching path to another", () => {
			const node = document.createElement("div");
			const history = createHistory();
			const mount = jest.fn();
			class MatchedRoute extends React.Component {
				componentWillMount() {
					mount();
				}

				render() {
					return <div>Hello World</div>;
				}
			}
			history.push("/hello");
			ReactDOM.render(
				<Router history={history}>
					<MatchComponent path={["/hello", "/world"]} >
						<MatchedRoute />
					</MatchComponent>
				</Router>,
				node
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
					<MatchComponent path="/パス名">
						{({ match }) => <h1>{match.url}</h1>}
					</MatchComponent>
				</MemoryRouter>,
				node
			);

			expect(node.innerHTML).toContain("/パス名");
		});
	});

	describe("with escaped special characters in the path", () => {
		it("is able to match", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza (1)"]}>
					<MatchComponent path="/pizza \(1\)">
						{({ match }: any) => <h1>{match.url}</h1>}
					</MatchComponent>
				</MemoryRouter>,
				node
			);

			expect(node.innerHTML).toContain("/pizza (1)");
		});
	});


	describe("the `location` prop", () => {
		it("overrides `context.location`", () => {
			const text = "bubblegum";

			renderStrict(
				<MemoryRouter initialEntries={["/cupcakes"]}>
					<MatchComponent
						location={{ pathname: "/bubblegum", search: "", state: "", hash: "", }}
						path="/bubblegum">
						{({ match }) => <h1>{match.url}</h1>}
					</MatchComponent>
				</MemoryRouter>,
				node
			);

			expect(node.innerHTML).toContain("/bubblegum");
		});
	});

	describe("the `children` prop", () => {
		describe("that is an element", () => {
			it("renders", () => {
				const text = "bubblegum";

				renderStrict(
					<MemoryRouter initialEntries={["/"]}>
						<MatchComponent path="/">
							<h1>{text}</h1>
						</MatchComponent>
					</MemoryRouter>,
					node
				);

				expect(node.innerHTML).toContain(text);
			});
		});

		describe("that is a function", () => {
			it("receives { history, location, match } props", () => {
				const history = createHistory();

				renderStrict(
					<Router history={history}>
						<MatchComponent
							path="/"
							children={(props: RouteProps) => {
								expect(props).not.toBe(null);
								if (props) {
									expect(props.history).toBe(history);
									expect(typeof props.location).toBe("object");
									expect(typeof props.match).toBe("object");
								}
								return null;
							}}
						/>
					</Router>,
					node
				);
				expect.assertions(4);
			});

			it("renders", () => {
				const text = "bubblegum";

				renderStrict(
					<MemoryRouter initialEntries={["/"]}>
						<MatchComponent path="/" children={() => <h1>{text}</h1>} />
					</MemoryRouter>,
					node
				);

				expect(node.innerHTML).toContain(text);
			});

			describe("that returns `undefined`", () => {
				it("logs a warning to the console and renders nothing", () => {
					jest.spyOn(console, "warn").mockImplementation(() => { });

					renderStrict(
						<MemoryRouter initialEntries={["/"]}>
							<MatchComponent path="/" >
								{() => undefined}
							</MatchComponent>
						</MemoryRouter>,
						node
					);

					expect(node.innerHTML).toEqual("");

					expect(console.warn).toHaveBeenCalledWith(
						expect.stringContaining(
							"You returned `undefined` from the `children` function"
						)
					);
				});
			});
		});

	});

});
