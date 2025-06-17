/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * @param a The first value to compare
 * @param b The second value to compare
 * @returns True if the values are equivalent, false otherwise
 */
export function deepEqual<T>(a: T, b: T): boolean {
	// Handle primitives and same reference
	if (a === b) return true;

	// Handle null/undefined cases
	if (a == null || b == null) return a === b;

	// Check if one is primitive and the other isn't
	if (typeof a !== "object" || typeof b !== "object") return false;

	// Handle Date comparison
	if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

	// Handle RegExp comparison
	if (a instanceof RegExp && b instanceof RegExp) {
		return a.source === b.source && a.flags === b.flags;
	}

	// Handle Map comparison
	if (a instanceof Map && b instanceof Map) {
		if (a.size !== b.size) return false;
		for (const [key, val] of a) {
			if (!b.has(key) || !deepEqual(val, b.get(key))) return false;
		}
		return true;
	}

	// Handle Set comparison
	if (a instanceof Set && b instanceof Set) {
		if (a.size !== b.size) return false;
		for (const val of a) {
			if (!b.has(val)) return false;
		}
		return true;
	}

	// Handle ArrayBuffer comparison
	if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
		if (a.byteLength !== b.byteLength) return false;
		const aArr = new Uint8Array(a.buffer);
		const bArr = new Uint8Array(b.buffer);
		for (let i = 0; i < aArr.length; i++) {
			if (aArr[i] !== bArr[i]) return false;
		}
		return true;
	}

	// Check constructor mismatch
	if (a.constructor !== b.constructor) return false;

	// Handle objects and arrays
	if (Array.isArray(a)) {
		if (a.length !== (b as any).length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], (b as any)[i])) return false;
		}
		return true;
	}

	// Get all keys including symbols
	const aKeys = Reflect.ownKeys(a as object);
	const bKeys = Reflect.ownKeys(b as object);

	// Check for same number of keys
	if (aKeys.length !== bKeys.length) return false;

	// Check each key
	for (const key of aKeys) {
		if (!Reflect.has(b as object, key)) return false;
		if (!deepEqual((a as any)[key], (b as any)[key])) return false;
	}

	return true;
}
