export const objectsAreEqual = <
	T extends Record<string, unknown>,
	P extends Record<string, unknown>,
>(
	obj1: T | undefined,
	obj2: P | undefined,
): boolean => {
	let objEqual = false;
	if (!obj1 || !obj2) return objEqual;

	const obj1Keys = Object.keys(obj1).sort();
	const obj2Keys = Object.keys(obj2).sort();

	if (obj1Keys.length !== obj2Keys.length) return objEqual;
	else {
		const areObjectsEqual = obj1Keys.every((key, index) => {
			const obj1Val = obj1[key] as keyof typeof obj2;
			const obj2Val = obj2[obj2Keys[index] as keyof typeof obj2];
			return obj1Val === obj2Val;
		});

		if (areObjectsEqual) {
			objEqual = true;
		}
	}

	return objEqual;
};
