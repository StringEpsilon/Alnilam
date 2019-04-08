import { History, Location } from "history";
import React from "react";
import { MatchResult } from "./matchPath";

export type RouterContextType = {
	history: History;
	location: Location;
	match?: MatchResult | null;
	staticContext: any; // TODO
	previosLocation?: Location;
} | undefined;

export const RouterContext = React.createContext<RouterContextType | null>(null);
RouterContext.displayName = "RouterContext";
