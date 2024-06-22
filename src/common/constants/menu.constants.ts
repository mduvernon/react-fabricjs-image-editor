import { ImageGallery } from "modules/image-editor/components/tools/image-gallery";
import { Projects } from "modules/image-editor/components/tools/projects";
import { Resize } from "modules/image-editor/components/tools/resize";
import { Text } from "modules/image-editor/components/tools/text";

import { TOOLS_PROPERTIES, TOOLS_TYPES } from "./tools.constants";

export const MENU_TYPES = {
	PROJECTS: "PROJECTS",
	GALLERY: "GALLERY",
	MARKER: "MARKER",
	TEXT: "TEXT",
	IMAGE: "IMAGE",
	SHAPE: "SHAPE",
	DRAWING: "DRAWING",
	ELEMENT: "ELEMENT",
	RESIZE: "RESIZE",
	SVG: "SVG"
};

export const MENU_PROPERTIES = {
	[MENU_TYPES.PROJECTS]: {
		name: MENU_TYPES.PROJECTS,
		description: "",
		type: "projects",
		icon: { prefix: "fas", name: "project-diagram" },
		isInlineList: false,
		isComponent: true,
		children: Projects
	},
	[MENU_TYPES.GALLERY]: {
		name: MENU_TYPES.GALLERY,
		description: "",
		type: "gallery",
		icon: { prefix: "fas", name: "image" },
		isInlineList: false,
		isComponent: true,
		children: ImageGallery
	},
	[MENU_TYPES.MARKER]: {
		name: MENU_TYPES.MARKER,
		description: "",
		type: "marker",
		icon: { prefix: "fas", name: "map-marker-alt" },
		isInlineList: true,
		children: [
			TOOLS_PROPERTIES[TOOLS_TYPES.MARKER]
		]
	},
	[MENU_TYPES.TEXT]: {
		name: MENU_TYPES.TEXT,
		description: "",
		type: "text",
		icon: { prefix: "fas", name: "font" },
		isInlineList: false,
		isComponent: true,
		children: Text
	},
	[MENU_TYPES.IMAGE]: {
		name: MENU_TYPES.IMAGE,
		description: "",
		type: "image",
		icon: { prefix: "fas", name: "image" },
		isInlineList: true,
		children: [
			TOOLS_PROPERTIES[TOOLS_TYPES.IMAGE],
			TOOLS_PROPERTIES[TOOLS_TYPES.GIF]
		]
	},
	[MENU_TYPES.SHAPE]: {
		name: MENU_TYPES.SHAPE,
		description: "",
		type: "shape",
		icon: { prefix: "fas", name: "draw-polygon" },
		isInlineList: true,
		children: [
			TOOLS_PROPERTIES[TOOLS_TYPES.TRIANGLE],
			TOOLS_PROPERTIES[TOOLS_TYPES.RECTANGLE],
			TOOLS_PROPERTIES[TOOLS_TYPES.CIRCLE],
			TOOLS_PROPERTIES[TOOLS_TYPES.CUBE]
		]
	},
	[MENU_TYPES.DRAWING]: {
		name: MENU_TYPES.DRAWING,
		description: "",
		type: "drawing",
		icon: { prefix: "fas", name: "draw-polygon" },
		isInlineList: true,
		children: [
			TOOLS_PROPERTIES[TOOLS_TYPES.POLYGON],
			TOOLS_PROPERTIES[TOOLS_TYPES.LINE],
			TOOLS_PROPERTIES[TOOLS_TYPES.ARROW]
		]
	},
	[MENU_TYPES.ELEMENT]: {
		name: MENU_TYPES.ELEMENT,
		description: "",
		type: "element",
		icon: { prefix: "fas", name: "chart-line" },
		isInlineList: true,
		children: [
			TOOLS_PROPERTIES[TOOLS_TYPES.CHART],
			TOOLS_PROPERTIES[TOOLS_TYPES.ELEMENT],
			TOOLS_PROPERTIES[TOOLS_TYPES.IFRAME],
			TOOLS_PROPERTIES[TOOLS_TYPES.VIDEO]
		]
	},
	[MENU_TYPES.RESIZE]: {
		name: MENU_TYPES.RESIZE,
		description: "",
		type: "resize",
		icon: { prefix: "fas", name: "expand" },
		isInlineList: false,
		isComponent: true,
		children: Resize
	},
	[MENU_TYPES.SVG]: {
		name: MENU_TYPES.SVG,
		description: '',
		type: 'svg',
		icon: { prefix: 'fas', name: 'bezier-curve' },
		isInlineList: true,
		children: [
			TOOLS_PROPERTIES[TOOLS_TYPES.DEFAULT]
		]
	}
}
