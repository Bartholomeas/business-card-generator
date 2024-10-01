export const DEFAULT_ERROR = {
	title: "Coś poszło nie tak.",
	description: "Spróbuj ponownie później.",
};

export const getRequiredMessage = (name: string): string => {
	if (!name) return "To pole jest wymagane.";
	const splittedName = name.split(" ")[1];
	if (splittedName?.endsWith("a")) return `${name} jest wymagane.`;
	else if (splittedName?.endsWith("y")) return `${name} jest wymagana.`;
	else if (splittedName?.endsWith("u")) return `${name} jest wymagany.`;
	else if (name.endsWith("a")) return `${name} jest wymagana.`;
	else if (name.endsWith("o")) return `${name} jest wymagane.`;
	else return `${name} jest wymagany.`;
};
