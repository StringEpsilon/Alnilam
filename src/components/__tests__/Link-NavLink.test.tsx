import { Location } from "verlauf";
import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, withRouter } from "../..";
import MemoryRouter from "../../testutils/MemoryRouter";
import renderStrict from "../../testutils/renderStrict";
import MatchComponent from "../Match";

describe("A <Link> - used as a NavLink", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	describe("when active", () => {
		it("applies its default activeClassName", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza">Pizza!</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("active");
			}
		});

		it("applies its default activeClassName with relative route", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/milkyway/proxima"]}>
					<MatchComponent path="/milkyway">
						<Link to="proxima">Pizza!</Link>
					</MatchComponent>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("active");
			}
		});

		it("applies a custom activeClassName instead of the default", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza" activeClassName="selected">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");
			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
				expect(a.className).toContain("selected");
			}
		});

		it("applies its activeStyle", () => {
			const defaultStyle = { color: "black" };
			const activeStyle = { color: "red" };

			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza" style={defaultStyle} activeStyle={activeStyle}>
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.style.color).toBe(activeStyle.color);
			}
		});

		it("applies the default aria-current", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza">Pizza!</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.getAttribute("aria-current")).toEqual("page");
			}
		});

		it("applies a custom aria-current instead of the default", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza" aria-current="true">
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.getAttribute("aria-current")).toEqual("true");
			}
		});

		it("handles locations without a pathname", () => {
			expect(() => {
				renderStrict(
					<MemoryRouter initialEntries={["/pizza"]}>
						<Link to={{ search: "foo=bar" } as Location}>Pizza!</Link>
					</MemoryRouter>,
					node,
				);
			}).not.toThrow();
		});

		it("it automatically escapes special characters in the path", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza (1)"]}>
					<Link to="/pizza (1)">Pizza!</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");
			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("active");
				expect(a.getAttribute("href")).toEqual("/pizza (1)");
			}
		});

		it("renders child components that use withRouter", () => {
			class WrappedComponent extends React.Component {
				public render() {
					return null;
				}
			}

			const Component = withRouter(WrappedComponent);

			let ref: any;
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza">
						<Component wrappedComponentRef={(r: any) => (ref = r)} />
					</Link>
				</MemoryRouter>,
				node,
			);

			expect(ref instanceof WrappedComponent).toBe(true);
		});
	});

	describe("when inactive", () => {
		it("does not apply its default activeClassName", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/salad">Salad?</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
			}
		});

		it("does not apply its activeClassName", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/salad" activeClassName="selected">
						Salad?
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");
			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
				expect(a.className).not.toContain("selected");
			}
		});

		it("does not apply its activeStyle", () => {
			const defaultStyle = { color: "black" };
			const activeStyle = { color: "red" };

			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/salad" style={defaultStyle} activeStyle={activeStyle}>
						Salad?
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.style.color).toBe(defaultStyle.color);
			}
		});

		it("does not apply an aria-current value if no override value is given", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/salad" activeClassName="selected" aria-current="page">
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.getAttribute("aria-current")).toBeNull();
			}
		});

		it("does not apply an aria-current value if an override value is given", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/salad" activeClassName="selected">
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.getAttribute("aria-current")).toBeNull();
			}
		});

		it("renders child components that use withRouter", () => {
			// tslint:disable-next-line:max-classes-per-file
			class WrappedComponent extends React.Component {
				public render() {
					return null;
				}
			}

			const Component = withRouter(WrappedComponent);

			let ref: any;
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link exact={true} to="/salad">
						<Component wrappedComponentRef={(r: any) => (ref = r)} />
					</Link>
				</MemoryRouter>,
				node,
			);

			expect(ref instanceof WrappedComponent).toBe(true);
		});
	});

	describe("isActive", () => {
		it("applies active default props when isActive returns true", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza" isActive={() => true}>
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("active");
			}
		});

		it("applies activeClassName when isActive returns true", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza" activeClassName="selected" isActive={() => true}>
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");
			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
				expect(a.className).toContain("selected");
			}
		});

		it("does not apply default activeClassName when isActive returns false", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pizza" isActive={() => false}>
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
			}
		});

		it("does not apply custom activeClassName when isActive returns false", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link
						to="/pizza"
						activeClassName="selected"
						isActive={() => false}
					>
						Pizza!
				</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");
			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
				expect(a.className).not.toContain("selected");
			}
		});
	});

	it("does not do exact matching by default", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/pizza/anchovies"]}>
				<Link to="/pizza" activeClassName="active">
					Pizza!
				</Link>
			</MemoryRouter>,
			node,
		);

		const a = node.querySelector("a");

		expect(a).not.toBeNull();
		if (a) {
			expect(a.className).toContain("active");
		}
	});

	describe("with `exact=true`", () => {
		it("applies default activeClassName for exact matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link exact={true} to="/pizza">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("active");
			}
		});

		it("does not apply default activeClassName for partial matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza/anchovies"]}>
					<Link exact={true} to="/pizza">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
			}
		});

		it("applies custom activeClassName for exact matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link exact={true} to="/pizza" activeClassName="selected">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("selected");
			}
		});

		it("applies custom activeClassName for partial matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza/anchovies"]}>
					<Link exact={true} to="/pizza" activeClassName="selected">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("selected");
			}
		});
	});

	it("does not do strict matching by default", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/pizza"]}>
				<Link to="/pizza/">Pizza!</Link>
			</MemoryRouter>,
			node,
		);

		const a = node.querySelector("a");

		expect(a).not.toBeNull();
		if (a) {
			expect(a.className).toContain("active");
		}
	});

	describe("with `strict=true`", () => {
		it("applies default activeClassName for strict matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza/"]}>
					<Link strict={true} to="/pizza/">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("active");
			}
		});

		it("does not apply default activeClassName for non-strict matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link strict={true} to="/pizza/">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
			}
		});

		it("applies custom activeClassName for strict matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza/"]}>
					<Link strict={true} to="/pizza/" activeClassName="selected">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("selected");
			}
		});

		it("does not apply custom activeClassName for non-strict matches", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link strict={true} to="/pizza/" activeClassName="selected">
						Pizza!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("selected");
			}
		});
	});

	describe("the `location` prop", () => {
		it("overrides the current location", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pizza"]}>
					<Link to="/pasta" location={{ pathname: "/pasta" } as Location}>
						Pasta!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).toContain("active");
			}
		});

		it("is not overwritten by the current location", () => {
			renderStrict(
				<MemoryRouter initialEntries={["/pasta"]}>
					<Link to="/pasta" location={{ pathname: "/pizza" } as Location}>
						Pasta!
					</Link>
				</MemoryRouter>,
				node,
			);

			const a = node.querySelector("a");

			expect(a).not.toBeNull();
			if (a) {
				expect(a.className).not.toContain("active");
			}
		});
	});

	describe("doesn't interfere with withRouter", () => {
		it("allows withRouter to access the correct match without route", () => {
			const PropChecker = withRouter((props: any) => {
				expect(props.match).not.toBeNull();
				expect(props.match.url).toBe("/");
				return null;
			});

			renderStrict(
				<MemoryRouter initialEntries={["/pizza/"]}>
					<Link to="/pizza/">
						<PropChecker />
					</Link>
				</MemoryRouter>,
				node,
			);

			expect.assertions(2);
		});

		it("allows withRouter to access the correct match inside a route", () => {
			const PropChecker = withRouter((props: any) => {
				expect(props.match).not.toBeNull();
				expect(props.match.url).toBe("/pizza/");
				return null;
			});

			renderStrict(
				<MemoryRouter initialEntries={["/pizza/"]}>
					<Route path="/pizza">
						<Link to="/pizza/">
							<PropChecker />
						</Link>
					</Route>
				</MemoryRouter>,
				node,
			);

			expect.assertions(2);
		});

		it("allows withRouter to access the correct match with params inside a route", () => {
			const PropChecker = withRouter((props: any) => {
				expect(props.match).not.toBeNull();
				expect(props.match.url).toBe("/pizza/cheese");
				expect(props.match.params).toEqual({ topping: "cheese" });
				return null;
			});
			renderStrict(
				<MemoryRouter initialEntries={["/pizza/cheese"]}>
					<Route path="/pizza/:topping">
						<Link to="/pizza/">
							<PropChecker />
						</Link>
					</Route>
				</MemoryRouter>,
				node,
			);

			expect.assertions(3);
		});
	});
});
