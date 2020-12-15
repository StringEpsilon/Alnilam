import React from "react";
import ReactDOM from "react-dom";
import {act} from "react-dom/test-utils";

function renderStrict(element: React.ReactNode, node: HTMLElement) {
	act(() => {

		ReactDOM.render(<React.StrictMode>{element}</React.StrictMode>, node);
	});
}

export default renderStrict;
