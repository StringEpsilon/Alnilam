import { History, Location } from "history";
import React from "react";
import { MatchResult } from "./matchPath";
export interface RouteProps {
	history?: History;
	match?: MatchResult | null;
	location?: Location;
	// TODO: remove any?
	children?: ((props: any) => React.ReactNode) | React.ReactNode;
	path?: string | string[];
	exact?: boolean;
	sensitive?: boolean;
	strict?: boolean;
	computedMatch?: MatchResult;
}
