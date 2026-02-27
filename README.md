# @rbxts/jest-utils

A collection of utilities for testing roblox-ts code with Jest.

## Installation

```sh
npm i @rbxts/jest-utils
```

Peer dependency: [`@rbxts/jest-globals`](https://www.npmjs.com/package/@rbxts/jest-globals)

## API

### `afterThis`

Queues a cleanup callback that runs after the current test. Callbacks run in
reverse order (LIFO), so factory functions can own both setup and teardown
without `let` variables or `beforeEach`/`afterEach` hooks.

```ts
it("connects to an event", () => {
	expect.assertions(1);

	const connection = signal.Connect(() => {
		/* ... */
	});
	afterThis(() => connection.Disconnect());

	signal.Fire();

	expect(received).toBe(true);
});
```

### `fromPartial`

Pass a deep partial to a slot expecting a full type. Useful when you only care
about a subset of properties but the function signature demands the complete
type.

```ts
it("should get the user", () => {
	getUser(
		fromPartial({
			body: {
				id: "123",
			},
		}),
	);
});
```

### `fromAny`

Pass anything to a typed slot while retaining autocomplete for the original
type. Unlike `fromPartial`, this won't error if the value doesn't match the
expected type at all — handy for testing error paths with intentionally wrong
data.

```ts
it("should handle bad input", () => {
	getUser(
		fromAny({
			body: {
				id: 124123,
			},
		}),
	);
});
```

### `fromExact`

Forces you to pass the exact type the slot requires. A convenience wrapper for
swapping between `fromPartial`/`fromAny` and a strict check — the compiler will
error if any required properties are missing.

```ts
it("should reject incomplete data", () => {
	// Will fail — not all properties of Request are provided.
	getUser(
		fromExact({
			body: {
				id: "123",
			},
		}),
	);
});
```

## Why `fromPartial` / `fromAny` / `fromExact`?

In roblox-ts tests you often need to pass mock objects to functions that expect
full types. The typical escape hatch is `as` casts, but those are noisy, hide
intent, and lose autocomplete. These utilities make the cast explicit and
semantic — your test reads as "I'm deliberately passing a partial" rather than
"I'm forcing the compiler to shut up."

Inspired by [`@total-typescript/shoehorn`](https://github.com/total-typescript/shoehorn).

## License

[MIT](LICENSE)
