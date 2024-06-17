// React
import { FC, useRef, useState } from "react";
// Ant Design
import {
    Popover,
    Button
} from 'antd';
// React Color
import {
    SketchPicker,
    ColorResult,
    RGBColor,
} from 'react-color';
// Common Hooks
import {
    useDeepCompareEffect
} from "common/hooks";

type OwnProps = {
    valueType?: 'string' | 'object';
    value?: any;
    onChange?: (value: any) => void;
}

const ColorPicker: FC<OwnProps> = ({
    valueType,
    value,
    onChange
}) => {
    const [color, setcolor] = useState(value || 'rgba(255, 255, 255, 1)');

    const handlers = useRef({
        onChange: (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
            let newColor: string | RGBColor;

            if (valueType === 'string') {
                newColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
            } else {
                newColor = color.rgb;
            }

            setcolor(newColor);

            if (typeof onChange === 'function') {
                onChange(newColor);
            }
        },
    });

    const getBackgroundColor = (color: any) => {
        if (typeof color === 'string') {
            return color;
        }
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
    };

    useDeepCompareEffect(() => {
        setcolor(value || color);
    }, [value]);

    return (
        <Popover trigger="click" placement="bottom" content={<SketchPicker color={color} onChange={handlers.current?.onChange} />}>
            <Button style={{ background: getBackgroundColor(color) }} shape="circle" />
        </Popover>
    );
};

export { ColorPicker };

export default ColorPicker;