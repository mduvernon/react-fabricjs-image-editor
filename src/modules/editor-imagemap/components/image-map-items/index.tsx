// React
import { FC, RefAttributes, forwardRef, useEffect, useRef, useState } from "react";
// Ant Design
import {
    notification,
    Collapse,
    message,
    Input,
} from 'antd';
// i18next
import i18n from 'i18next';
// Libs
import { v4 as uuid } from 'uuid';
import {
    CommonButton,
    Scrollbar,
    SVGModal,
    Flex,
    Icon,
} from 'common/components';
import { useDeepCompareEffect } from "common/hooks";

notification.config({
    top: 80,
    duration: 2,
});

type OwnProps = RefAttributes<any> & {
    canvasRef: any;
    descriptors: any;
}

const ImageMapItems: FC<OwnProps> = forwardRef(({
    canvasRef,
    descriptors,
    ...props
}, imageMapItemsRef$) => {

    const [activeKey, setActiveKey] = useState([]);
    const [collapse, setCollapse] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [filteredDescriptors, setFilteredDescriptors] = useState([]);
    const [svgModalVisible, setSvgModalVisible] = useState(false);
    const [svgOption, setSvgOption] = useState(null);
    const [item, setItem] = useState(null);

    const handlers = useRef({
        onAddItem: (item, centered) => {
            if (canvasRef.current?.handler.interactionMode === 'polygon') {
                message.info('Already drawing');
                return;
            }

            const id = uuid();
            const option = Object.assign({}, item.option, { id });

            if (item.option.superType === 'svg' && item.type === 'default') {
                handlers.current?.onSVGModalVisible();
                return;
            }

            canvasRef.current?.handler.add(option, centered);
        },
        onAddSVG: (option?: any, centered?: any) => {
            canvasRef.current?.handler.add({
                ...option,
                type: 'svg',
                superType: 'svg',
                id: uuid(),
                name: 'New SVG'
            }, centered);

            handlers.current?.onSVGModalVisible();
        },
        onDrawingItem: (item) => {

            if (canvasRef.current?.handler.interactionMode === 'polygon') {
                message.info('Already drawing');
                return;
            }

            if (item.option.type === 'line') {
                canvasRef.current?.handler.drawingHandler.line.init();

            } else if (item.option.type === 'arrow') {
                canvasRef.current?.handler.drawingHandler.arrow.init();

            } else {
                canvasRef.current?.handler.drawingHandler.polygon.init();
            }
        },
        onChangeActiveKey: (activeKey) => {
            setActiveKey(activeKey);
        },
        onCollapse: () => {
            setCollapse((prevState) => (!prevState));
        },
        onSearchNode: (e) => {
            const filteredDescriptors = handlers.current?.transformList()
                .filter((descriptor) => descriptor.name.toLowerCase().includes(e.target.value.toLowerCase()));

            setTextSearch(e.target.value);
            setFilteredDescriptors(filteredDescriptors);
        },

        transformList: (): any[] => {
            const values: any[] = Object.values(descriptors);

            return values.reduce(
                (prev: any[], curr) => prev.concat(curr), []
            );
        },

        onSVGModalVisible: () => {
            setSvgModalVisible((prevState) => (!prevState));
        },
    });

    const events = useRef({
        onDragStart: (e, item) => {
            setItem(item);

            const { target } = e;

            target.classList.add('dragging');
        },
        onDragOver: (e) => {
            if (e.preventDefault) {
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'copy';

            return false;
        },
        onDragEnter: (e) => {
            const { target } = e;
            target.classList.add('over');
        },
        onDragLeave: (e) => {
            const { target } = e;

            target.classList.remove('over');
        },
        onDrop: (e) => {
            e = e || window.event;

            if (e.preventDefault) {
                e.preventDefault();
            }

            if (e.stopPropagation) {
                e.stopPropagation();
            }

            const { layerX, layerY } = e;

            const dt = e.dataTransfer;

            if (dt.types.length && dt.types[0] === 'Files') {
                const { files } = dt;

                Array.from(files).forEach((file: any) => {
                    file.uid = uuid();

                    const { type } = file;

                    if (type === 'image/png' || type === 'image/jpeg' || type === 'image/jpg') {
                        const item = {
                            option: {
                                type: 'image',
                                file,
                                left: layerX,
                                top: layerY,
                            },
                        };
                        handlers.current?.onAddItem(item, false);
                    } else {
                        notification.warning({
                            message: 'Not supported file type',
                        });
                    }
                });
                return false;
            }

            const option = Object.assign({}, item.option, { left: layerX, top: layerY });
            const newItem = Object.assign({}, item, { option });

            handlers.current?.onAddItem(newItem, false);

            return false;
        },
        onDragEnd: (e, item: any) => {
            setItem(null);
            e.target.classList.remove('dragging');
        },
    });

    const attachEventListener = (canvas) => {
        canvas.canvas?.wrapperEl?.addEventListener('dragenter', events.current?.onDragEnter, false);
        canvas.canvas?.wrapperEl?.addEventListener('dragover', events.current?.onDragOver, false);
        canvas.canvas?.wrapperEl?.addEventListener('dragleave', events.current?.onDragLeave, false);
        canvas.canvas?.wrapperEl?.addEventListener('drop', events.current?.onDrop, false);
    };

    const detachEventListener = (canvas) => {
        canvas.canvas?.wrapperEl?.removeEventListener('dragenter', events.current?.onDragEnter);
        canvas.canvas?.wrapperEl?.removeEventListener('dragover', events.current?.onDragOver);
        canvas.canvas?.wrapperEl?.removeEventListener('dragleave', events.current?.onDragLeave);
        canvas.canvas?.wrapperEl?.removeEventListener('drop', events.current?.onDrop);
    };

    const renderItems = (items: any[]) => (
        <Flex flexWrap="wrap" flexDirection="column" style={{ width: '100%' }}>
            {items.map((item) => renderItem(item))}
        </Flex>
    );

    const renderItem = (item, centered?: boolean) => {
        if (Array.isArray(item)) {
            return item.map((i) => renderItem(i, centered));
        }

        return (
            item.type === 'drawing' ? (
                <div
                    key={item.name}
                    draggable
                    onClick={e => handlers.current?.onDrawingItem(item)}
                    className="rde-editor-items-item"
                    style={{ justifyContent: collapse ? 'center' : null }}
                >
                    <span className="rde-editor-items-item-icon">
                        <Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
                    </span>
                    {collapse ? null : <div className="rde-editor-items-item-text">{item.name}</div>}
                </div>
            ) : (
                <div
                    key={item.name}
                    draggable
                    onClick={e => handlers.current?.onAddItem(item, centered)}
                    onDragStart={e => events.current?.onDragStart(e, item)}
                    onDragEnd={e => events.current?.onDragEnd(e, item)}
                    className="rde-editor-items-item"
                    style={{ justifyContent: collapse ? 'center' : null }}
                >
                    <span className="rde-editor-items-item-icon">
                        <Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
                    </span>
                    {collapse ? null : <div className="rde-editor-items-item-text">
                        {item.name}
                    </div>}
                </div>
            )
        )
    }



    useEffect(() => {

        return () => {
            detachEventListener(canvasRef.current);
        }
    }, []);

    useDeepCompareEffect(() => {

        if (canvasRef.current) {
            attachEventListener(canvasRef.current);
        }

    }, [canvasRef.current]);

    return (
        <div className={`rde-editor-items ${Boolean(collapse) ? 'minimize' : ''}`}>
            <Flex flex="1" flexDirection="column" style={{ height: '100%' }}>
                <Flex justifyContent="center" alignItems="center" style={{ height: 40 }}>
                    <CommonButton
                        icon={collapse ? 'angle-double-right' : 'angle-double-left'}
                        shape="circle"
                        className="rde-action-btn"
                        style={{ margin: '0 4px' }}
                        onClick={handlers.current?.onCollapse}
                    />
                    {collapse ? (null) : (
                        <Input
                            style={{ margin: '8px' }}
                            placeholder={i18n.t('action.search-list')}
                            onChange={handlers.current?.onSearchNode}
                            value={textSearch}
                            allowClear
                        />
                    )}
                </Flex>
                <Scrollbar>
                    <Flex flex="1" style={{ overflowY: 'hidden' }}>
                        {((textSearch?.length > 0) && renderItems(filteredDescriptors)) ||
                            (collapse ? (
                                <Flex
                                    flexWrap="wrap"
                                    flexDirection="column"
                                    style={{ width: '100%' }}
                                    justifyContent="center"
                                >
                                    {handlers.current?.transformList().map(item => renderItem(item))}
                                </Flex>
                            ) : (
                                <Collapse
                                    style={{ width: '100%' }}
                                    bordered={false}
                                    activeKey={(activeKey?.length > 0) ? activeKey : Object.keys(descriptors)}
                                    onChange={handlers.current?.onChangeActiveKey}
                                    items={
                                        Object.keys(descriptors).map(key => (
                                            {
                                                key,
                                                label: key,
                                                children: renderItems(Object.values(descriptors[key]))
                                            }
                                        ))
                                    }
                                />
                            ))}
                    </Flex>
                </Scrollbar>
            </Flex>
            <SVGModal
                visible={svgModalVisible}
                onOk={handlers.current?.onAddSVG}
                onCancel={handlers.current?.onSVGModalVisible}
                option={svgOption}
            />
        </div>
    )
});

export { ImageMapItems };

export default ImageMapItems;