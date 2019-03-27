import { History, Location } from "history";
import React from "react";

export type RouterContextType = {
	history: History;
	location: Location;
	match?: Match | null;
	staticContext: any; // TODO
} | undefined;

const context = React.createContext<RouterContextType | null>(null);
export default context;
