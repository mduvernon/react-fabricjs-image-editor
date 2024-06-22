// React
import { FC, useState } from "react";
// i18next
import i18n from 'i18next';
// Common components
import {
    CommonButton,
    Flex,
    Icon
} from 'common/components';
// Components
import {
    EditorLayersList
} from "../layers-list";

type OwnProps = {
    canvasRef: any;
    selectedItem: any;
    onSelect: (item: any) => void;
}

const EditorHeaderToolbar: FC<OwnProps> = ({
    canvasRef,
    selectedItem,
    onSelect
}) => {
    const [showLayersList, setShowLayersList] = useState<boolean>(false);

    const isCropping = Boolean(canvasRef.current) ? canvasRef.current?.handler?.interactionMode === 'crop' : false;

    const _toggleLayersList = () => {
        setShowLayersList(!showLayersList);
    }

    return (
        <Flex className="rde-editor-header-toolbar-container" flex="1">
            <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-list">
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    icon="layer-group"
                    tooltipTitle={i18n.t('action.canvas-list')}
                    onClick={_toggleLayersList}
                />
                {showLayersList && (
                    <div className="rde-canvas-list">
                        <EditorLayersList canvasRef={canvasRef} selectedItem={selectedItem} />
                    </div>
                )}
            </Flex.Item>
            <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.bringForward()}
                    icon="angle-up"
                    tooltipTitle={i18n.t('action.bring-forward')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.sendBackwards()}
                    icon="angle-down"
                    tooltipTitle={i18n.t('action.send-backwards')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.bringToFront()}
                    icon="angle-double-up"
                    tooltipTitle={i18n.t('action.bring-to-front')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.sendToBack()}
                    icon="angle-double-down"
                    tooltipTitle={i18n.t('action.send-to-back')}
                />
            </Flex.Item>
            <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.alignmentHandler.left()}
                    icon="align-left"
                    tooltipTitle={i18n.t('action.align-left')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.alignmentHandler.center()}
                    icon="align-center"
                    tooltipTitle={i18n.t('action.align-center')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.alignmentHandler.middle()}
                    icon="align-center"
                    tooltipTitle={i18n.t('action.align-middle')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.alignmentHandler.right()}
                    icon="align-right"
                    tooltipTitle={i18n.t('action.align-right')}
                />
            </Flex.Item>
            <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-group">
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.toGroup()}
                    icon="object-group"
                    tooltipTitle={i18n.t('action.object-group')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.toActiveSelection()}
                    icon="object-ungroup"
                    tooltipTitle={i18n.t('action.object-ungroup')}
                />
            </Flex.Item>
            <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-crop">
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={canvasRef ? !canvasRef.current?.handler?.cropHandler.validType() : true}
                    onClick={() => canvasRef.current?.handler?.cropHandler.start()}
                    icon="crop"
                    tooltipTitle={i18n.t('action.crop')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={canvasRef ? !canvasRef.current?.handler?.cropHandler.cropRect : true}
                    onClick={() => canvasRef.current?.handler?.cropHandler.finish()}
                    icon="check"
                    tooltipTitle={i18n.t('action.crop-save')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={canvasRef ? !canvasRef.current?.handler?.cropHandler.cropRect : true}
                    onClick={() => canvasRef.current?.handler?.cropHandler.cancel()}
                    icon="times"
                    tooltipTitle={i18n.t('action.crop-cancel')}
                />
            </Flex.Item>
            <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-operation">
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.saveImage()}
                    icon="image"
                    tooltipTitle={i18n.t('action.canvas-save')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.duplicate()}
                    icon="clone"
                    tooltipTitle={i18n.t('action.clone')}
                />
                <CommonButton
                    className="rde-action-btn"
                    shape="circle"
                    disabled={isCropping}
                    onClick={() => canvasRef.current?.handler?.remove()}
                    icon="trash"
                    tooltipTitle={i18n.t('action.delete')}
                />
            </Flex.Item>
            <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-history">
                <CommonButton
                    className="rde-action-btn"
                    disabled={isCropping || (canvasRef && !canvasRef.current?.handler?.transactionHandler.undos.length)}
                    onClick={() => canvasRef.current?.handler?.transactionHandler.undo()}
                >
                    <Icon name="undo-alt" style={{ marginRight: 8 }} />
                    Undo
                </CommonButton>
                <CommonButton
                    className="rde-action-btn"
                    disabled={isCropping || (canvasRef && !canvasRef.current?.handler?.transactionHandler.redos.length)}
                    onClick={() => canvasRef.current?.handler?.transactionHandler.redo()}
                >
                    Redo
                    <Icon name="redo-alt" style={{ marginLeft: 8 }} />
                </CommonButton>
            </Flex.Item>
        </Flex>
    );
};

export { EditorHeaderToolbar };

export default EditorHeaderToolbar;
