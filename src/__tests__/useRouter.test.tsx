import React from "react";
import ReactDOM from "react-dom";
import { useRouter } from "../index";
import MemoryRouter from "./utils/MemoryRouter";
import renderStrict from "./utils/renderStrict";

describe("useRouter", () => {
	const node = document.createElement("div");

	afterEach(() => {
		ReactDOM.unmountComponentAtNode(node);
	});

	it("provides { match, location, history, previousLocation } props", () => {

		const PropsChecker = () => {
			const { match, location, history, previousLocation} = useRouter();
			expect(match).not.toBeNull();
			expect(location).not.toBeNull();
			expect(history).not.toBeNull();
			expect(previousLocation).not.toBeNull();
			return null;
		};

		renderStrict(
			<MemoryRouter>
				<PropsChecker />
			</MemoryRouter>,
			node,
		);

		expect.assertions(4);
	});
});
