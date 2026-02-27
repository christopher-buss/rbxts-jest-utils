/**
 * Forces you to pass the exact type the slot requires.
 *
 * A convenience wrapper for swapping between `fromPartial` / `fromAny` and a
 * strict check — the compiler will error if any required
 * properties are missing.
 *
 * @example
 *
 * ```ts
 * it("should reject incomplete data", () => {
 * 	// Will fail — not all properties of Request are provided.
 * 	getUser(
 * 		fromExact({
 * 			body: {
 * 				id: "123",
 * 			},
 * 		}),
 * 	);
 * });
 * ```
 *
 * @template T - The exact type the slot expects.
 * @param mock - The full value matching `T`.
 * @returns The input, unchanged.
 */
export function fromExact<T>(mock: T): T {
	return mock;
}
