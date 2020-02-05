declare module "history" {
	type HistoryAction = "POP" | "REPLACE" | "PUSH";
	export interface Location {
		pathname: string;
		hash?: string;
		search?: string;
		state?: object;
	}
	export interface HistoryEvent {
		action: HistoryAction;
		location: Location;
	}
	export interface History {
		action: HistoryAction;
		location: Location;
		createHref: (to: string | Location) => string;
		push: (to: string | Location, state?: object) => void;
		replace: (to: string | Location, state?: object) => void;
		go: (n: number) => void;
		back: () => void;
		forward: () => void;
		listen: (callback: (action: HistoryAction) => void) => Function;
		block: (callback?: Function) => Function;
	}
	export function createPath(location?: Location): string;
	export function parsePath(path: string): Location;

	export function createMemoryHistory(options?: { initialEntries?: string[], initialIndex?: number }): History
	export function createBrowserHistory(): History
	export function createHashHistory(): History
}
