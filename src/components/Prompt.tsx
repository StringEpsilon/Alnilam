import PropTypes from "prop-types";
import React, { useEffect } from "react";
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
	let release: Function | null = null;

	useEffect(() => {
		if (release){
			release();
		}
		release = method(message);
		return () => {
			if (release){
				release();
			}
		}
	}, [message])
	return null;
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
