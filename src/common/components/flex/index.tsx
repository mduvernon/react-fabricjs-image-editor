// React
import { FC, HTMLAttributes } from "react";
import FlexItem from "./item";

type OwnProps = HTMLAttributes<any> & {
    className?: string;
    display?: 'flex' | 'inline-flex';
    flexDirection?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
    flexWrap?: 'nowrap' | 'wrap-reverse' | 'wrap';
    flexFlow?: string;
    justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly';
    alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
    alignContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'stretch';
    alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
    order?: number;
    flexGrow?: number | string;
    flexShrink?: number | string;
    flexBasis?: number | string;
    flex?: number | string;
}

type FlexComponent = FC<OwnProps> & {
    Item: typeof FlexItem;
};

const Flex: FlexComponent = ({
    className = '',
    display,
    flexDirection,
    flexWrap,
    flexFlow,
    justifyContent,
    alignItems,
    alignContent,
    alignSelf,
    order,
    flexGrow,
    flexShrink,
    flexBasis,
    flex,
    style,
    children,
    ...props
}) => {

    const newStyle = Object.assign(
        {},
        {
            display: 'flex',
            flexDirection,
            flexWrap,
            flexFlow,
            justifyContent,
            alignItems,
            alignContent,
            alignSelf,
            order,
            flexGrow,
            flexShrink,
            flexBasis,
            flex,
        },
        style,
    ) as any;

    return (
        <div
            className={`rde-flex ${className}`}
            style={Object.keys(newStyle).reduce((prev, key) => {
                if (newStyle[key]) {
                    return Object.assign(prev, { [key]: newStyle[key] });
                }
                return prev;
            }, {})}
            {...props}
        >
            {children}
        </div>
    )
}

Flex.Item = FlexItem;

export { Flex };

export default Flex;