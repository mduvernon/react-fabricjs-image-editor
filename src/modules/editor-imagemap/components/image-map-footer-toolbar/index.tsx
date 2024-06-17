// React
import { FC, useRef, useState, Fragment } from 'react';
// Ant Design
import { Button, Switch, Tooltip } from 'antd';
// i18next
import i18n from 'i18next';
// Canvas constants
import { code } from 'modules/canvas/constants';
// Common components
import {
    CommonButton
} from 'common/components';
import { useDeepCompareEffect } from 'common/hooks';

type OwnProps = {
    canvasRef: any;
    preview: boolean;
    onChangePreview: (preview: boolean) => void;
    zoomRatio: number;
}

const ImageMapFooterToolbar: FC<OwnProps> = ({
    canvasRef,
    preview,
    onChangePreview,
    zoomRatio
}) => {

    const [interactionMode, setInteractionMode] = useState('selection');

    useDeepCompareEffect(() => {
        if (canvasRef.current) {
            attachEventListener(canvasRef);
        }
    }, [canvasRef.current]);

    const attachEventListener = (canvasRef) => {
        canvasRef.current?.canvas?.wrapperEl.addEventListener('keydown', events.current?.keydown, false);
    };

    const detachEventListener = (canvasRef) => {
        canvasRef.current?.canvas?.wrapperEl.removeEventListener('keydown', events.current?.keydown);
    };

    const handlers = useRef({
        selection: () => {
            if (canvasRef.current?.handler.interactionHandler.isDrawingMode()) {
                return;
            }

            canvasRef.current?.handler.interactionHandler.selection();

            setInteractionMode('selection');
        },
        grab: () => {
            if (canvasRef.current?.handler.interactionHandler.isDrawingMode()) {
                return;
            }

            canvasRef.current?.handler.interactionHandler.grab();

            setInteractionMode('grab');
        },
    });

    const events = useRef({
        keydown: (e: any) => {
            if (canvasRef.current?.canvas?.wrapperEl !== document.activeElement) {
                return false;
            }

            if (e.code === code.KEY_Q) {
                handlers.current?.selection();

            } else if (e.code === code.KEY_W) {
                handlers.current?.grab();
            }
        },
    });

    if (!canvasRef?.current) {
        return null;
    }

    const zoomValue = parseInt((zoomRatio * 100).toFixed(2), 10);

    return (
        <Fragment>
            <div className="rde-editor-footer-toolbar-interaction">
                <Button.Group>
                    <CommonButton
                        type={interactionMode === 'selection' ? 'primary' : 'default'}
                        style={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px' }}
                        onClick={() => {
                            handlers.current?.selection();
                        }}
                        icon="mouse-pointer"
                        tooltipTitle={i18n.t('action.selection')}
                    />
                    <CommonButton
                        type={interactionMode === 'grab' ? 'primary' : 'default'}
                        style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
                        onClick={() => {
                            handlers.current?.grab();
                        }}
                        tooltipTitle={i18n.t('action.grab')}
                        icon="hand-rock"
                    />
                </Button.Group>
            </div>
            <div className="rde-editor-footer-toolbar-zoom">
                <Button.Group>
                    <CommonButton
                        style={{ borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px' }}
                        onClick={() => {
                            canvasRef.current?.handler.zoomHandler.zoomOut();
                        }}
                        icon="search-minus"
                        tooltipTitle={i18n.t('action.zoom-out')}
                    />
                    <CommonButton
                        onClick={() => {
                            canvasRef.current?.handler.zoomHandler.zoomOneToOne();
                        }}
                        tooltipTitle={i18n.t('action.one-to-one')}
                    >
                        {`${zoomValue}%`}
                    </CommonButton>
                    <CommonButton
                        onClick={() => {
                            canvasRef.current?.handler.zoomHandler.zoomToFit();
                        }}
                        tooltipTitle={i18n.t('action.fit')}
                        icon="expand"
                    />
                    <CommonButton
                        style={{ borderBottomRightRadius: '8px', borderTopRightRadius: '8px' }}
                        onClick={() => {
                            canvasRef.current?.handler.zoomHandler.zoomIn();
                        }}
                        icon="search-plus"
                        tooltipTitle={i18n.t('action.zoom-in')}
                    />
                </Button.Group>
            </div>
            <div className="rde-editor-footer-toolbar-preview">
                <Tooltip title={i18n.t('action.preview')}>
                    <Switch checked={preview} onChange={onChangePreview} />
                </Tooltip>
            </div>
        </Fragment>
    )
}

export { ImageMapFooterToolbar };

export default ImageMapFooterToolbar;