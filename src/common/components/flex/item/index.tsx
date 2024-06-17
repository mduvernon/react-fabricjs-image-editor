// React
import { FC, HTMLAttributes, PropsWithChildren } from "react";

type OwnProps = PropsWithChildren & HTMLAttributes<any> & {
    alignSelf?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';
    order?: number;
    flexGrow?: number | string;
    flexShrink?: number | string;
    flexBasis?: number | string;
    flex?: number | string;
}

const FlexItem: FC<OwnProps> = ({
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

export { FlexItem };

export default FlexItem;
