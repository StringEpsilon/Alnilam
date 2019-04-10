import { History, Location } from "history";
import React from "react";
import { MatchResult } from "./matchPath";

export interface RouterContextType {
	history: History;
	location: Location;
	match?: MatchResult | null;
	staticContext: any; // TODO
	previosLocation?: Location;
}

export const RouterContext = React.createContext<RouterContextType | null>(null);
RouterContext.displayName = "RouterContext";
