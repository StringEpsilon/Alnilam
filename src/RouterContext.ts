import { History, Location } from "history";
import React from "react";
import { MatchResult } from "./matchPath";

export type RouterContextType = {
	history: History;
	location: Location;
	match?: MatchResult | null;
	staticContext: any; // TODO
} | undefined;

const context = React.createContext<RouterContextType | null>(null);
context.displayName = "RouterContext";
export default context;
