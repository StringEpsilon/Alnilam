import { RoutingProps } from "../RouterContext";
import { useRouterContext } from "./useRouterContext";

/** Returns the current routing props (history, match, location, previousLocation) */
export function useRouter(): RoutingProps {
	return useRouterContext("useRouter");
}
