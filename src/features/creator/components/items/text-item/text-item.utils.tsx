export const getTextValueWidth = (value: string, fontSize = 16): string => `${
	value.split("\n").sort((a, b) => b.length - a.length)[0] ??
	""
		.split("")
		.reduce(
			(acc, curr) =>
				curr.charCodeAt(0) >= 32 && curr.charCodeAt(0) <= 126
					? acc + fontSize * (3 / 5)
					: acc + fontSize,
			0,
		)
}
px`;
