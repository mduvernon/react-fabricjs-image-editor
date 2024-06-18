// React
import { FC, MouseEvent, useRef } from "react";
// Ant Design
import { Button } from 'antd';
// Common Components
import { Icon } from "common/components";
// Modules
import { Canvas, FabricObject } from "modules/canvas";

type OwnProps = {
    preview?: boolean;
    onChangePreview?: (preview: MouseEvent<HTMLButtonElement>) => void;
    onTooltip?: (el: HTMLDivElement, target?: FabricObject) => void;
    onClick?: (e: any) => void;
    objects?: any;
};

const EditorImagePreview: FC<OwnProps> = ({
    preview,
    onChangePreview,
    onTooltip,
    onClick,
    objects
}) => {

    const container = useRef(null);

    return (
        (
            Boolean(preview) && (
                <div className={`rde-preview ${preview ? 'preview' : ''}`}>
                    <div
                        ref={container}
                        style={{
                            overflow: 'hidden',
                            display: 'flex',
                            flex: '1',
                            height: '100%',
                        }}
                    >
                        <Canvas
                            editable={false}
                            className="rde-canvas"
                            canvasOption={{
                                perPixelTargetFind: true,
                            }}
                            keyEvent={{
                                grab: false,
                            }}
                            onLoad={(handler) => handler.importJSON(objects)}
                            onTooltip={onTooltip}
                            onClick={onClick}
                            maxZoom={500}
                        />
                        <Button className="rde-action-btn rde-preview-close-btn" onClick={onChangePreview}>
                            <Icon name="times" size={1.5} />
                        </Button>
                    </div>
                </div>
            )
        )
    )
};

export { EditorImagePreview };

export default EditorImagePreview;