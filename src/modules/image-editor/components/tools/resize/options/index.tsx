// React
import { FC, MouseEvent } from "react";
// Ant Design
import { Button } from 'antd';
// Constants
import {
    RESIZE_PLATFORMS_DIMENSIONS,
    RESIZE_PLATFROM_NAMES
} from "common/constants";
// Styles
import "./style.scss";

type OwnProps = {
    onSelect?: (size: { width: number, height: number }, event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    currentSize?: any;
};

const ResizeOptions: FC<OwnProps> = ({
    className = '',
    onSelect = undefined,
    currentSize = {},
}) => {

    const _handleSizeClick = (size: { width: number, height: number }, event: MouseEvent<any>) => {
        if (typeof onSelect === 'function') {
            onSelect(size, event)
        }
    };

    const _forLoopOptions = (object: any) => {
        const options: { label: string; value: string }[] = []

        for (const key in object) {
            options.push({
                label: object[key],
                value: key,
            })
        }

        return options
    }

    return (
        <div className={`rde-editor__tools-resize-options-wrapper ${className}`}>
            <div className="rde-editor__tools-resize-options-header">
                <h2 className='title'>
                    Resize Options
                </h2>
            </div>
            <div className="rde-editor__tools-resize-options-list d-flex flex-column">
                {_forLoopOptions(RESIZE_PLATFROM_NAMES)?.map(({ label, value }, idx) => (
                    <Button
                        className="rde-editor__tools-resize-options-item d-flex flex-row"
                        onClick={(e) => _handleSizeClick(RESIZE_PLATFORMS_DIMENSIONS[value], e)}
                        key={idx}
                    >
                        <div className="rde-editor__tools-resize-options-item-label">{label}</div>
                        <div className="rde-editor__tools-resize-options-item-value">
                            <span>{RESIZE_PLATFORMS_DIMENSIONS[value].width} x {RESIZE_PLATFORMS_DIMENSIONS[value].height} px</span>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export { ResizeOptions }

export default ResizeOptions;