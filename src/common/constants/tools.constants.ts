

export const TOOLS_TYPES = {
    MARKER: 'marker',
    TEXT: 'text',
    IMAGE: 'image',
    GIF: 'gif',
    TRIANGLE: 'triangle',
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    CUBE: 'cube',
    POLYGON: 'polygon',
    LINE: 'line',
    ARROW: 'arrow',
    CHART: 'chart',
    ELEMENT: 'element',
    IFRAME: 'iframe',
    VIDEO: 'video',
    DEFAULT: 'default',
};

export const TOOLS_PROPERTIES = {
    [TOOLS_TYPES.MARKER]: {
        name: "Marker",
        description: "",
        type: "marker",
        icon: {
            prefix: "fas",
            name: "map-marker-alt"
        },
        option: {
            type: "i-text",
            text: "\uf3c5",
            fontFamily: "Font Awesome 5 Free",
            fontWeight: 900,
            fontSize: 60,
            width: 30,
            height: 30,
            editable: false,
            name: "New marker"
        }
    },
    [TOOLS_TYPES.TEXT]: {
        name: "Text",
        description: "",
        type: "text",
        icon: { prefix: "fas", name: "font" },
        option: {
            type: "textbox",
            text: "hello world!",
            width: 60,
            height: 30,
            fontSize: 32,
            fontFamily: "'Playfair Display'",
            name: "New text"
        }
    },
    [TOOLS_TYPES.IMAGE]: {
        name: "Image",
        description: "",
        type: "image",
        icon: {
            prefix: "fas",
            name: "image"
        },
        option: {
            type: "image",
            name: "New image",
            src: "./images/sample/transparentBg.png"
        }
    },
    [TOOLS_TYPES.GIF]: {
        name: "GIF",
        description: "",
        type: "gif",
        icon: {
            prefix: "fas",
            name: "image"
        },
        option: {
            type: "gif",
            width: 400,
            height: 400,
            name: "New gif",
            src: ""
        }
    },
    [TOOLS_TYPES.TRIANGLE]: {
        name: "Triangle",
        description: "",
        type: "shape",
        icon: {
            prefix: "fas",
            name: "play",
            style: {
                "transform": "rotate(270deg)"
            }
        },
        option: {
            type: "triangle",
            width: 30,
            height: 30,
            name: "New shape"
        }
    },
    [TOOLS_TYPES.RECTANGLE]: {
        name: "Rectangle",
        description: "",
        type: "shape",
        icon: {
            prefix: "fas",
            name: "stop"
        },
        option: {
            type: "rect",
            width: 40,
            height: 40,
            name: "New shape"
        }
    },
    [TOOLS_TYPES.CIRCLE]: {
        name: "Circle",
        description: "",
        type: "shape",
        icon: {
            prefix: "fas",
            name: "circle"
        },
        option: {
            type: "circle",
            radius: 30,
            name: "New shape"
        }
    },
    [TOOLS_TYPES.CUBE]: {
        name: "Cube",
        description: "",
        type: "shape",
        icon: {
            prefix: "fas",
            name: "cube"
        },
        option: {
            type: "cube",
            width: 80,
            height: 80,
            name: "New shape"
        }
    },
    [TOOLS_TYPES.POLYGON]: {
        name: "Polygon",
        description: "",
        type: "drawing",
        icon: {
            prefix: "fas",
            name: "draw-polygon"
        },
        option: {
            type: "polygon",
            name: "New polygon"
        }
    },
    [TOOLS_TYPES.LINE]: {
        name: "Line",
        description: "",
        type: "drawing",
        icon: {
            prefix: "fas",
            name: "minus"
        },
        option: {
            type: "line",
            name: "New line"
        }
    },
    [TOOLS_TYPES.ARROW]: {
        name: "Arrow",
        description: "",
        type: "drawing",
        icon: {
            prefix: "fas",
            name: "long-arrow-alt-right"
        },
        option: {
            type: "arrow",
            name: "New arrow"
        }
    },
    [TOOLS_TYPES.CHART]: {
        name: "Chart",
        description: "",
        type: "element",
        icon: {
            prefix: "fas",
            name: "chart-line"
        },
        option: {
            superType: "element",
            type: "chart",
            name: "New chart",
            width: 356,
            height: 356
        }
    },
    [TOOLS_TYPES.ELEMENT]: {
        name: "Element",
        description: "",
        type: "element",
        icon: {
            prefix: "fab",
            name: "html5"
        },
        option: {
            superType: "element",
            type: "element",
            width: 480,
            height: 270,
            name: "New element"
        }
    },
    [TOOLS_TYPES.IFRAME]: {
        name: "Iframe",
        description: "",
        type: "element",
        icon: {
            prefix: "fas",
            name: "window-maximize"
        },
        option: {
            superType: "element",
            type: "iframe",
            width: 480,
            height: 270,
            name: "New iframe"
        }
    },
    [TOOLS_TYPES.VIDEO]: {
        name: "Video",
        description: "",
        type: "element",
        icon: {
            prefix: "fab",
            name: "youtube"
        },
        option: {
            superType: "element",
            type: "video",
            width: 480,
            height: 270,
            name: "New video",
            autoplay: true,
            muted: true,
            loop: true
        }
    },
    [TOOLS_TYPES.DEFAULT]: {
        name: "Default",
        description: "",
        type: "default",
        icon: {
            prefix: "fas",
            name: "bezier-curve"
        },
        option: {
            type: "svg",
            superType: "svg",
            name: "New SVG",
            loadType: "svg"
        }
    },
};
