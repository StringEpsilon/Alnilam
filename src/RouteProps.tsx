import { Location } from "verlauf";
import React from "react";
import { MatchResult } from "./matchPath";

export interface RouteProps {
	/** Child components / elements to render in case of a match. */
	children?: ((props: any) => React.ReactNode) | React.ReactNode | React.ReactNode[];
	/** Path to match against the current location */
	path?: string | string[];
	/** Whether or not to match the path level exactly */
	exact?: boolean;
	/** Whether or not to match the path case sensitive */
	sensitive?: boolean;
	/** Whether or not to match with strict trailing slashes */
	strict?: boolean;
	/** Overrides the location from history for matching */
	location?: Location;

	/** Alnilam internal. */
	computedMatch?: MatchResult;
}
