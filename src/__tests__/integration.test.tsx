import React from "react";
import ReactDOM from "react-dom";
import { Route } from "..";
import MemoryRouter from "./utils/MemoryRouter";
import renderStrict from "./utils/renderStrict";

describe("Integration Tests", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("renders nested matches", () => {
		const TEXT1 = "Ms. Tripp";
		const TEXT2 = "Mrs. Schiffman";

		renderStrict(
			<MemoryRouter initialEntries={["/nested"]}>
				<Route path="/">
					<div>
						<h1>{TEXT1}</h1>
						<Route path="/nested"><h2>{TEXT2}</h2></Route>
					</div>
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain(TEXT1);
		expect(node.innerHTML).toContain(TEXT2);
	});

	it("renders nested matches with relative paths", () => {
		const TEXT1 = "Ms. Tripp";
		const TEXT2 = "Mrs. Schiffman";

		renderStrict(
			<MemoryRouter initialEntries={["/milkyway/proxima"]}>
				<Route path="/milkyway">
					<div>
						<h1>{TEXT1}</h1>
						<Route path="./proxima"><h2>{TEXT2}</h2></Route>
					</div>
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain(TEXT1);
		expect(node.innerHTML).toContain(TEXT2);
	});

	it("renders nested matches with relative paths and route params", () => {
		renderStrict(
			<MemoryRouter initialEntries={["/milkyway/proxima"]}>
				<Route path="/:galaxy">
					<Route path="./:star">
						{(props: any) =>
							<>
								<h2>{props.match.params.galaxy}</h2>
								<h3>{props.match.params.star}</h3>
							</>
						}
					</Route>
				</Route>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain("milkyway");
		expect(node.innerHTML).toContain("proxima");
	});

	it("renders only as deep as the matching Route", () => {
		const TEXT1 = "Ms. Tripp";
		const TEXT2 = "Mrs. Schiffman";

		renderStrict(
			<MemoryRouter initialEntries={["/"]}>
				<Route path="/" >
					<div>
						<h1>{TEXT1}</h1>
						<Route path="/nested">
							<h2>{TEXT2}</h2>
						</Route>
					</div>
				</Route>
				/>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain(TEXT1);
		expect(node.innerHTML).not.toContain(TEXT2);
	});

	it("renders multiple matching routes", () => {
		const TEXT1 = "Mrs. Schiffman";
		const TEXT2 = "Mrs. Burton";

		renderStrict(
			<MemoryRouter initialEntries={["/double"]}>
				<div>
					<aside>
						<Route path="/double" >
							<h1>{TEXT1}</h1>
						</Route>
					</aside>
					<main>
						<Route path="/double" >
							<h1>{TEXT2}</h1>
						</Route>
					</main>
				</div>
			</MemoryRouter>,
			node,
		);

		expect(node.innerHTML).toContain(TEXT1);
		expect(node.innerHTML).toContain(TEXT2);
	});
});
