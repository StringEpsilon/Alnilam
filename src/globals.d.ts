declare var __DEV__:boolean;

interface Match {
	path: string;
	url: string;
	isExact: boolean;
	// TODO: find better typing for params, maybe make Match generic?
	params: ObjectMap<string>;
}

interface MatchOptions {
	path: string | string[];
	exact?: boolean;
	strict?: boolean;
	end?: boolean;
	sensitive?: boolean;
}

interface ObjectMap<T> {
	[key: string]: T;
}

declare module "tiny-warning"{
    export default function warning(condition: any, message: string): void
}
