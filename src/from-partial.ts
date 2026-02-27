import type { PartialDeep } from "type-fest";

/**
 * Lets you pass a deep partial to a slot expecting a type.
 *
 * Useful for tests where you only care about a subset of properties but the
 * function signature demands the full type. Avoids `as` casts and keeps tests
 * focused on the data that matters.
 *
 * @example
 *
 * ```ts
 * it("should get the user", () => {
 * 	getUser(
 * 		fromPartial({
 * 			body: {
 * 				id: "123",
 * 			},
 * 		}),
 * 	);
 * });
 * ```
 *
 * @template T - The full type the slot expects.
 * @param mock - A deep-partial version of the expected type.
 * @returns The input, cast to `T`.
 */
export function fromPartial<T>(mock: PartialDeep<NoInfer<T>>): T {
	return mock as T;
}
