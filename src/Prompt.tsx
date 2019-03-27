import PropTypes from "prop-types";
import React from "react";
import Lifecycle from "./Lifecycle";
import RouterContext from "./RouterContext";

interface PromptProps {
	message?: string;
	when?: boolean;
}

/**
 * The public API for prompting the user before navigating away from a screen.
 */
function Prompt({ message, when = true }: PromptProps) {
	return (
		<RouterContext.Consumer>
			{(context) => {
				if (!context) {
					throw new Error(!__DEV__ ? "Invariant failed" : "You should not use <Prompt> outside a <Router>");
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
			}}
		</RouterContext.Consumer>
	);
}

if (__DEV__) {
	const messageType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

	Prompt.propTypes = {
		when: PropTypes.bool,
		message: messageType.isRequired,
	};
}

export default Prompt;
