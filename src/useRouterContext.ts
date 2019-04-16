
import { useContext } from "react";
import { RouterContext, RouterContextType } from "./RouterContext";
import { RouterException } from "./RouterException";

export function useRouterContext(componentName: string): RouterContextType {
	const context = useContext(RouterContext);
	if (!context) {
		throw RouterException(componentName);
	}
	return context;
}