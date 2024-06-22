// React
import { FC, memo, useCallback, useMemo, useState, useEffect } from 'react';
// Ant Design
import { Button, Input } from 'antd';
// i18next
import i18next from 'i18next';
// Common hooks
import { useDeepCompareEffect } from 'common/hooks';
// Common components
import {
    Flex,
    Icon
} from "common/components";
// Constants
import {
    OBJECT_TYPES_ICONS
} from 'common/constants';

type OwnProps = {
    canvasRef: any;
    selectedItem: any;
}

const EditorLayersList: FC<OwnProps> = ({
    canvasRef,
    selectedItem
}) => {

    const [canvasObjects, setCanvasObjects] = useState<any[]>([]);

    const handlers = useMemo(() => ({
        zoomToCenter: () => {
            canvasRef.current?.handler.zoomHandler.zoomToCenter();
        },

        duplicateById: (event: any, id: string) => {
            event.stopPropagation();

            try {
                canvasRef.current?.handler.duplicateById(id);
                _initCanvasObjects();
            } catch (e) {
                console.error(e);
            }
        },

        removeById: (event: any, id: string) => {
            event.stopPropagation();

            try {
                canvasRef.current?.handler.removeById(id);
                _initCanvasObjects();
            } catch (e) {
                console.error(e);
            }
        },

    }), [
        canvasRef.current,
        canvasObjects,
    ]);

    useEffect(() => {
        _initCanvasObjects();

        return () => {
            setCanvasObjects([]);
        };
    }, []);

    const _initCanvasObjects = () => {
        const canvasObjects = canvasRef.current?.canvas?.getObjects()
            .filter((obj: any) => {
                if (obj.id === 'workarea') {
                    return false;
                }

                if (obj.id) {
                    return true;
                }

                return false;
            })

        setCanvasObjects(canvasObjects);
    };


    const _renderActions = () => {
        const idCropping = canvasRef.current ? canvasRef.current?.handler?.interactionMode === 'crop' : false;

        return (
            <Flex.Item className="rde-canvas-list-actions" flex="0 1 auto">
                <Flex>
                    <Input.Search placeholder={i18next.t('placeholder.search-node')} />
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                    <Flex flex="1" justifyContent="center">
                        <Button
                            className="rde-action-btn"
                            style={{ width: '100%', height: 30 }}
                            disabled={idCropping}
                            onClick={e => canvasRef.current?.handler.sendBackwards()}
                        >
                            <Icon name="arrow-up" />
                        </Button>
                    </Flex>
                    <Flex flex="1" justifyContent="center">
                        <Button
                            className="rde-action-btn"
                            style={{ width: '100%', height: 30 }}
                            disabled={idCropping}
                            onClick={e => canvasRef.current?.handler.bringForward()}
                        >
                            <Icon name="arrow-down" />
                        </Button>
                    </Flex>
                </Flex>
            </Flex.Item>
        );
    };

    const _renderItem = useCallback(() => {

        const idCropping = canvasRef.current ? canvasRef.current?.handler?.interactionMode === 'crop' : false;

        return canvasObjects?.map((obj) => {
            // let icon: string;
            let title = obj.name || obj.type;
            let prefix = 'fas';

            let icon = OBJECT_TYPES_ICONS[obj.type];

            if (!Boolean(icon)) {
                icon = { prefix, name: 'image' };
                title = 'Default';
            }

            let className = 'rde-canvas-list-item';
            if (selectedItem && selectedItem.id === obj.id) {
                className += ' selected-item';
            }

            return (
                <Flex.Item
                    key={obj.id}
                    className={className}
                    flex="1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => canvasRef.current?.handler.select(obj)}
                    onMouseDown={e => e.preventDefault()}
                    onDoubleClick={handlers.zoomToCenter}
                >
                    <Flex alignItems="center">
                        <Icon
                            className="rde-canvas-list-item-icon"
                            prefix={icon.prefix}
                            name={icon.name}
                            size={1.5}
                            style={{ width: 32 }}
                        />
                        <div className="rde-canvas-list-item-text">{title}</div>
                        <Flex className="rde-canvas-list-item-actions" flex="1" justifyContent="flex-end">
                            <Button
                                className="rde-action-btn"
                                shape="circle"
                                disabled={idCropping}
                                onClick={e => handlers.duplicateById(e, obj.id)}
                            >
                                <Icon name="clone" />
                            </Button>
                            <Button
                                className="rde-action-btn"
                                shape="circle"
                                disabled={idCropping}
                                onClick={e => handlers.removeById(e, obj.id)}
                            >
                                <Icon name="trash" />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex.Item>
            );
        })
    }, [canvasObjects])

    return (
        <Flex className='rde-editor-layers-list' style={{ height: '100%' }} flexDirection="column">
            {_renderActions()}
            <div className="rde-canvas-list-items">
                {_renderItem()}
            </div>
        </Flex>
    );
};

export { EditorLayersList };

export default EditorLayersList;
