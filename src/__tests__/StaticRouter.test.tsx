import { Location } from "history";
import React from "react";
import ReactDOM from "react-dom";
// tslint:disable-next-line:no-submodule-imports
import ReactDOMServer from "react-dom/server";
import { Prompt, Redirect, Route, StaticRouter } from "..";
import renderStrict from "./utils/renderStrict";

describe("A <StaticRouter>", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("reports redirects on the context object", () => {
		const context: any = {};

		ReactDOMServer.renderToStaticMarkup(
			<StaticRouter context={context}>
				<Redirect to="/somewhere-else" />
			</StaticRouter>,
		);

		expect(context.action).toBe("REPLACE");
		expect(context.url).toBe("/somewhere-else");
	});

	it("reports push redirects on the context object", () => {
		const context: any = {};

		ReactDOMServer.renderToStaticMarkup(
			<StaticRouter context={context}>
				<Redirect to="/somewhere-else" push={true} />
			</StaticRouter>,
		);

		expect(context.action).toBe("PUSH");
		expect(context.url).toBe("/somewhere-else");
	});

	describe("with a string location prop", () => {
		it("parses the location into an object", () => {
			let location;
			function LocationChecker(props: any) {
				location = props.location;
				return null;
			}

			ReactDOMServer.renderToStaticMarkup(
				<StaticRouter location="/the/path?the=query#the-hash">
					<Route component={LocationChecker} />
				</StaticRouter>,
			);

			expect(location).toMatchObject({
				pathname: "/the/path",
				search: "?the=query",
				hash: "#the-hash",
			});
		});

		describe("with a URL-encoded pathname", () => {
			it("decodes the pathname", () => {
				function PropsChecker(props: any) {
					expect(props.location.pathname).toEqual("/estático");
					expect(props.match.params.type).toBe("estático");
					return null;
				}

				ReactDOMServer.renderToStaticMarkup(
					<StaticRouter location="/est%C3%A1tico">
						<Route path="/:type" component={PropsChecker} />
					</StaticRouter>,
				);

				expect.assertions(2);
			});
		});
	});

	describe("with an object location prop", () => {
		it("adds missing properties", () => {
			function LocationChecker(props: any) {
				expect(props.location).toMatchObject({
					pathname: "/the/path",
					search: "",
					hash: "",
				});
				return null;
			}

			ReactDOMServer.renderToStaticMarkup(
				<StaticRouter location={{ pathname: "/the/path", search: "", state: "", hash: "" }}>
					<Route component={LocationChecker} />
				</StaticRouter>,
			);
			expect.assertions(1);
		});

		describe("with a URL-encoded pathname", () => {
			it("decodes the pathname", () => {
				function PropsChecker(props: any) {
					expect(props.location.pathname).toEqual("/estático");
					expect(props.match.params.type).toBe("estático");
					return null;
				}

				ReactDOMServer.renderToStaticMarkup(
					<StaticRouter location={{ pathname: "/est%C3%A1tico", search: "", state: "", hash: "" }}>
						<Route path="/:type" component={PropsChecker} />
					</StaticRouter>,
				);

				expect.assertions(2);
			});
		});
	});

	it("knows how to serialize location objects", () => {
		const context: any = {};

		ReactDOMServer.renderToStaticMarkup(
			<StaticRouter context={context}>
				{/* tslint:disable-next-line:no-object-literal-type-assertion*/}
				<Redirect to={{ pathname: "/somewhere-else", search: "", hash: "" } as Location} />
			</StaticRouter>,
		);

		expect(context.action).toBe("REPLACE");
		expect(context.location.pathname).toBe("/somewhere-else");
		expect(context.location.search).toBe("");
		expect(context.location.hash).toBe("");
		expect(context.url).toBe("/somewhere-else");
	});

	describe("with a basename", () => {
		it("strips the basename from location pathnames", () => {
			function LocationChecker(props: any) {
				expect(props.location.pathname).toEqual("/path");
				return null;
			}

			const context = {};

			ReactDOMServer.renderToStaticMarkup(
				<StaticRouter
					context={context}
					basename="/the-base"
					location="/the-base/path"
				>
					<Route component={LocationChecker} />
				</StaticRouter>,
			);

			expect.assertions(1);
		});

		it("adds the basename to redirect URLs", () => {
			const context: any = {};

			ReactDOMServer.renderToStaticMarkup(
				<StaticRouter context={context} basename="/the-base">
					<Redirect to="/somewhere-else" />
				</StaticRouter>,
			);

			expect(context.action).toBe("REPLACE");
			expect(context.url).toBe("/the-base/somewhere-else");
		});

		it("adds the basename to push redirect URLs", () => {
			const context: any = {};

			ReactDOMServer.renderToStaticMarkup(
				<StaticRouter context={context} basename="/the-base">
					<Redirect to="/somewhere-else" push={true} />
				</StaticRouter>,
			);

			expect(context.action).toBe("PUSH");
			expect(context.url).toBe("/the-base/somewhere-else");
		});
	});

	describe("with no basename", () => {
		it("createHref does not append extra leading slash", () => {
			const pathname = "/test-path-please-ignore";

			function HrefChecker(props: { to: string }) {
				return (
					<Route
						children={({ history: { createHref } }) => (

							<a href={createHref(props.to)}/>
						)}
					/>
				);
			}

			renderStrict(
				<StaticRouter>
					<HrefChecker to={pathname} />
				</StaticRouter>,
				node,
			);

			const a = node.getElementsByTagName("a")[0];

			expect(a.getAttribute("href")).toEqual(pathname);
		});
	});

	describe("render a <Prompt>", () => {
		it("does not throw", () => {
			expect(() => {
				renderStrict(
					<StaticRouter>
						<Prompt message="this is only a test" />
					</StaticRouter>,
					node,
				);
			}).not.toThrow();
		});
	});
});
