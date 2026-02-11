import { afterEach, expect } from "@rbxts/jest-globals";
import { Array, Error } from "@rbxts/luau-polyfill";

/**
 * Callback function that can be executed after a test completes.
 *
 * @returns - The result of the callback, which can be a promise or a regular
 *   value.
 */
export type AfterThisCallback = (() => Promise<unknown>) | (() => unknown);

/**
 * Queues a cleanup callback that runs after the current test.
 *
 * Callbacks run in reverse order (LIFO). This lets factory functions own both
 * setup and teardown, so you don't need `let` variables or
 * `beforeEach`/`afterEach` hooks.
 *
 * @example
 *
 * ```ts
 * it("connects to an event", () => {
 * 	expect.assertions(1);
 *
 * 	const connection = signal.Connect(() => {});
 * 	afterThis(() => connection.Disconnect());
 *
 * 	signal.Fire();
 *
 * 	expect(received).toBe(true);
 * });
 * ```
 *
 * @param func - Cleanup callback, sync or async.
 */
export function afterThis(func: AfterThisCallback): void {
	// eslint-disable-next-line ts/no-unnecessary-condition -- Type is not defined outside of jest tests
	if (expect.getState().currentTestName === undefined) {
		throw new Error("You can only use afterThis inside a test!");
	}

	pendingAfterThis.callbackStack.push(func);
}

const pendingAfterThis = {
	callbackStack: [] as Array<AfterThisCallback>,
	cleanCallbackStack(): void {
		this.callbackStack = [];
	},
};

async function handlePendingAfterThis(): Promise<void> {
	const reverseCallbacks = Array.reverse([...pendingAfterThis.callbackStack]);

	for (const callback of reverseCallbacks) {
		await callback();
	}

	pendingAfterThis.cleanCallbackStack();
}

afterEach(handlePendingAfterThis);
