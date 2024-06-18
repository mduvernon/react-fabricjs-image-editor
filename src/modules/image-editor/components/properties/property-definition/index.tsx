import MarkerProperty from '../marker-property';
import GeneralProperty from '../general-property';
import StyleProperty from '../style-property';
import TooltipProperty from '../tooltip-property';
import ImageProperty from '../image-property';
import TextProperty from '../text-property';
import MapProperty from '../map-property';
import LinkProperty from '../link-property';
import VideoProperty from '../video-property';
import ElementProperty from '../element-property';
import IframeProperty from '../iframe-property';
import AnimationProperty from '../animation-property';
import ShadowProperty from '../shadow-property';
import UserProperty from '../user-property';
import TriggerProperty from '../trigger-property';
import ImageFilterProperty from '../image-filter-property';
import ChartProperty from '../chart-property';

const PropertyDefinition = {
    map: {
        map: {
            title: 'Map',
            component: MapProperty,
        },
        image: {
            title: 'Image',
            component: ImageProperty,
        },
    },
    group: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
    },
    'i-text': {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        marker: {
            title: 'Marker',
            component: MarkerProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    textbox: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        text: {
            title: 'Text',
            component: TextProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    image: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        image: {
            title: 'Image',
            component: ImageProperty,
        },
        filter: {
            title: 'Filter',
            component: ImageFilterProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    triangle: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    rect: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    circle: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    polygon: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    line: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    arrow: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    video: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        video: {
            title: 'Video',
            component: VideoProperty,
        },
    },
    element: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        video: {
            title: 'Element',
            component: ElementProperty,
        },
    },
    iframe: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        video: {
            title: 'Iframe',
            component: IframeProperty,
        },
    },
    svg: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        link: {
            title: 'Link',
            component: LinkProperty,
        },
        tooltip: {
            title: 'Tooltip',
            component: TooltipProperty,
        },
        style: {
            title: 'Style',
            component: StyleProperty,
        },
        shadow: {
            title: 'Shadow',
            component: ShadowProperty,
        },
        animation: {
            title: 'Animation',
            component: AnimationProperty,
        },
        trigger: {
            title: 'Trigger',
            component: TriggerProperty,
        },
        userProperty: {
            title: 'User Property',
            component: UserProperty,
        },
    },
    chart: {
        general: {
            title: 'General',
            component: GeneralProperty,
        },
        chartOption: {
            title: 'Chart Option',
            component: ChartProperty,
        },
    },
};

export { PropertyDefinition };

export default PropertyDefinition;

