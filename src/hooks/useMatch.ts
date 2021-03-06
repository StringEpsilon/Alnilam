import { MatchOptions, MatchResult } from "../matchPath";
import { calculateMatch } from "../utils";
import { useRouterContext } from "./useRouterContext";

/**
 * Hook for easy matching inside a functional component.
 *
 * @param options @see MatchOptions.
 * @returns {MatchResult|null|undefined} The match object if successful, otherwise null.
 */
export function useMatch(options: MatchOptions | string): MatchResult | null | undefined {
	const context = useRouterContext("useMatch");
	if (typeof options === "string")	{
		options = { path: options };
	}

	return calculateMatch(options, context);
}
