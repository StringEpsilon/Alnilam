import { createPatchMark } from "jest-diff/build/printDiffs";

declare module "tiny-warning" {
	export default function warning(condition: any, message: string): void
}


