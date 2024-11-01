export type PossibleLinePoints =
	| [number, number]
	| [number, number, number, number]
	| [number, number, number, number, number, number]
	| [number, number, number, number, number, number, number, number];

export const isLine = (points: PossibleLinePoints): points is [number, number, number, number] =>
	points.length === 4;

export const isQuadraticCurve = (
	points: PossibleLinePoints,
): points is [number, number, number, number, number, number] => points.length === 6;

export const isBezierCurve = (
	points: PossibleLinePoints,
): points is [number, number, number, number, number, number, number, number] =>
	points.length === 8;
