import PropTypes from "prop-types";
import React from "react";
import { useRouterContext } from "../hooks/useRouterContext";
import { RouterException } from "../RouterException";
import Lifecycle from "./Lifecycle";

export interface PromptProps {
	/** Messsage shown to the user in the prompt */
	message?: string;
	/** Stops <Prompt/> from showing when false. */
	when?: boolean;
}

/**
 * Component for prompting the user before navigating away from a screen.
 */
export default function Prompt({ message, when = true }: PromptProps) {
	const context = useRouterContext("Prompt");
	if (!context) {
		throw RouterException("Prompt");
	}

	if (!when || context.staticContext) { return null; }

	const method = context.history.block;

	return (
		<Lifecycle
			onMount={(self) => {
				self.release = method(message);
			}}
			onUpdate={(self, prevProps) => {
				if (prevProps.message !== message && self.release) {
					self.release();
					self.release = method(message);
				}
			}}
			onUnmount={(self) => {
				if (self.release) {
					self.release();
				}
			}}
			message={message}
		/>
	);
}

if (process.env.NODE_ENV !== "production") {
	Prompt.propTypes = {
		when: PropTypes.bool,
		message: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string,
		]).isRequired,
	};
}
