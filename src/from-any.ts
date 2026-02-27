/**
 * Lets you pass anything to a slot expecting a type, while retaining
 * autocomplete for the original type.
 *
 * Unlike `fromPartial`, this will **not** fail if the value doesn't match
 * the expected type at all — handy for testing error paths with intentionally
 * wrong data.
 *
 * @example
 *
 * ```ts
 * it("should handle bad input", () => {
 * 	getUser(
 * 		fromAny({
 * 			body: {
 * 				id: 124123,
 * 			},
 * 		}),
 * 	);
 * });
 * ```
 *
 * @template T - The target type the slot expects.
 * @template U - The actual type of the value passed in.
 * @param mock - Any value; autocomplete still suggests properties of `T`.
 * @returns The input, cast to `T`.
 */
// eslint-disable-next-line ts/no-unnecessary-type-parameters -- U is intentionally single-use to prevent the union from collapsing to unknown, preserving autocomplete on T
export function fromAny<T, U>(mock: NoInfer<T> | U): T {
	return mock as T;
}
