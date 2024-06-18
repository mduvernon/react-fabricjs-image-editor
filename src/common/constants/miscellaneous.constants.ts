
export const OBJECT_TYPES = {
    I_TEXT: 'i-text',
    TEXTBOX: 'textbox',
    IMAGE: 'image',
    TRIANGLE: 'triangle',
    RECT: 'rect',
    CIRCLE: 'circle',
    POLYGON: 'polygon',
    LINE: 'line',
    ELEMENT: 'element',
    IFRAME: 'iframe',
    VIDEO: 'video',
    SVG: 'svg',
};

export const OBJECT_TYPES_LABELS = {
    [OBJECT_TYPES.I_TEXT]: 'Text',
    [OBJECT_TYPES.TEXTBOX]: 'Textbox',
    [OBJECT_TYPES.IMAGE]: 'Image',
    [OBJECT_TYPES.TRIANGLE]: 'Triangle',
    [OBJECT_TYPES.RECT]: 'Rectangle',
    [OBJECT_TYPES.CIRCLE]: 'Circle',
    [OBJECT_TYPES.POLYGON]: 'Polygon',
    [OBJECT_TYPES.LINE]: 'Line',
    [OBJECT_TYPES.ELEMENT]: 'Element',
    [OBJECT_TYPES.IFRAME]: 'Iframe',
    [OBJECT_TYPES.VIDEO]: 'Video',
    [OBJECT_TYPES.SVG]: 'SVG',
};

export const OBJECT_TYPES_ICONS = {
    [OBJECT_TYPES.I_TEXT]: { prefix: 'fas', name: 'map-marker-alt' },
    [OBJECT_TYPES.TEXTBOX]: { prefix: 'fas', name: 'font' },
    [OBJECT_TYPES.IMAGE]: { prefix: 'fas', name: 'image' },
    [OBJECT_TYPES.TRIANGLE]: { prefix: 'fas', name: 'image' },
    [OBJECT_TYPES.RECT]: { prefix: 'fas', name: 'image' },
    [OBJECT_TYPES.CIRCLE]: { prefix: 'fas', name: 'circle' },
    [OBJECT_TYPES.POLYGON]: { prefix: 'fas', name: 'draw-polygon' },
    [OBJECT_TYPES.LINE]: { prefix: 'fas', name: 'image' },
    [OBJECT_TYPES.ELEMENT]: { prefix: 'fab', name: 'html5' },
    [OBJECT_TYPES.IFRAME]: { prefix: 'fas', name: 'window-maximize' },
    [OBJECT_TYPES.VIDEO]: { prefix: 'fab', name: 'video' },
    [OBJECT_TYPES.SVG]: { prefix: 'fas', name: 'bezier-curve' },
};