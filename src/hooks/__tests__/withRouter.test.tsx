import { createMemoryHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import * as ReactIs from "react-is";
import { Match, Route, Router, StaticRouter, withRouter } from "../../index";
import MemoryRouter from "../../testutils/MemoryRouter";
import renderStrict from "../../testutils/renderStrict";

describe("withRouter", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("provides { match, location, history } props", () => {

		const PropsChecker = withRouter((props: any) => {
			expect(typeof props).toBe("object");
			if (props) {
				expect(typeof props.match).toBe("object");
				expect(typeof props.location).toBe("object");
				expect(typeof props.history).toBe("object");
			}
			return null;
		});

		renderStrict(
			<MemoryRouter>
				<PropsChecker />
			</MemoryRouter>,
			node,
		);

		expect.assertions(4);
	});

	it("provides proper 'previousLocation' (and the non-typo'd one) props", () => {
		const mockComponent = jest.fn(() => null);
		const PropsChecker = withRouter(mockComponent);
		const history = createMemoryHistory();
		renderStrict(
			<Router history={history}>
				<PropsChecker />
			</Router>,
			node,
		);

		expect(mockComponent).toBeCalledWith(
			expect.objectContaining({
				location: expect.objectContaining({
					hash: "",
					pathname: "/",
					search: "",
				}),
			}),
			{},
		);

		mockComponent.mockClear();
		history.push("/milkyway/rigel");

		expect(mockComponent).toBeCalledWith(
			expect.objectContaining({
				location: expect.objectContaining({
					hash: "",
					pathname: "/milkyway/rigel",
					search: "",
				}),
				previousLocation: expect.objectContaining({
					hash: "",
					pathname: "/",
					search: "",
				}),
			}),
			{},
		);

	});

	it("provides the parent match as a prop to the wrapped component", () => {
		let parentMatch: any;

		const PropsChecker = withRouter((props: any) => {
			expect(typeof parentMatch).toBe("object");
			expect(typeof props).toBe("object");
			if (props) {
				expect(props.match).toBe(parentMatch);
			}
			return null;
		});

		renderStrict(
			<MemoryRouter initialEntries={["/bubblegum"]}>
				<Route path="/:flavor" >
					{({ match }) => {
						parentMatch = match;
						return <PropsChecker />;
					}}
				</Route>
			</MemoryRouter>,
			node,
		);

		expect.assertions(3);
	});

	it("works when parent match is null", () => {
		const PropChecker = withRouter((props: any) => {
			expect(typeof props).toBe("object");
			expect(props.match).toBe(null);
			return null;
		});

		renderStrict(
			<MemoryRouter initialEntries={["/somepath"]}>
				<Match path="/no-match"
					children={({ match }) => {
						expect(match).toBe(null);
						return <PropChecker />;
					}}
				/>
			</MemoryRouter>,
			node,
		);

		expect.assertions(3);
	});

	describe("inside a <StaticRouter>", () => {
		it("provides the staticContext prop", () => {
			const PropsChecker = withRouter((props: any) => {
				expect(typeof props).toBe("object");
				expect(typeof props.staticContext).toBe("object");
				expect(props.staticContext).toBe(context);
				return null;
			});

			const context = {};

			renderStrict(
				<StaticRouter context={context}>
					<Route> <PropsChecker /> </Route>
				</StaticRouter>,
				node,
			);

			expect.assertions(3);
		});
	});

	it("exposes the wrapped component as WrappedComponent", () => {
		const Component = () => <div />;
		const decorated = withRouter(Component);
		expect(decorated.WrappedComponent).toBe(Component);
	});

	it("exposes the instance of the wrapped component via wrappedComponentRef", () => {
		class WrappedComponent extends React.Component {
			public render() {
				return null;
			}
		}
		const Component = withRouter(WrappedComponent);

		let ref: any;
		renderStrict(
			<MemoryRouter initialEntries={["/bubblegum"]}>
				<Route path="/bubblegum">
					<Component wrappedComponentRef={(r: any) => (ref = r)} />
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(ref instanceof WrappedComponent).toBe(true);
	});

	it("hoists non-react statics from the wrapped component", () => {
		// tslint:disable-next-line:max-classes-per-file
		class Component extends React.Component {
			public static hello: string;
			public static foo() {
				return "bar";
			}

			public render() {
				return null;
			}
		}
		Component.hello = "world";

		const decorated = withRouter(Component);

		expect(decorated.hello).toBe("world");
		expect(typeof decorated.foo).toBe("function");
		expect(decorated.foo()).toBe("bar");
	});

	it("does not allow ref forwarding", () => {
		const WrappedComponent = React.forwardRef((props: any, ref: any) => <div {...props} ref={ref} />);
		const Component = withRouter(WrappedComponent);
		expect(ReactIs.isForwardRef(<Component />)).toBe(false);
	});
});
