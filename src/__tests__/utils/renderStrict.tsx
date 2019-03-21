import React from "react";
import ReactDOM from "react-dom";

function renderStrict(element: React.ReactNode, node: HTMLElement) {
	ReactDOM.render(<React.StrictMode>{element}</React.StrictMode>, node);
}

export default renderStrict;
