import { type TransformerConfigKey } from "./config.types";

import type Konva from "konva";

export const transformerConfig: Record<TransformerConfigKey, Konva.TransformerConfig> = {
	frame: {
		rotateEnabled: false,
		enabledAnchors: [],
	},
	image: {
		rotateEnabled: false,
		enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
	},
	line: {
		rotateEnabled: true,
		enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
	},
	default: {
		rotateEnabled: true,
		enabledAnchors: [
			"top-left",
			"top-center",
			"top-right",
			"middle-left",
			"middle-right",
			"bottom-left",
			"bottom-center",
			"bottom-right",
		],
	},
};
