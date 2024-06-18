// React
import { FC, RefAttributes, forwardRef, memo, useEffect, useMemo, useState } from "react";
// Ant Design
import {
    notification,
    message,
    Input,
    Tabs,
} from 'antd';
// i18next
import i18n from 'i18next';
// Libs
import { v4 as uuid } from 'uuid';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Common Components
import {
    CommonButton,
    Scrollbar,
    SVGModal,
    Flex,
    Icon,
} from 'common/components';
// Styles
import './style.scss';

notification.config({
    top: 80,
    duration: 2,
});

type OwnProps = RefAttributes<any> & {
    canvasRef: any;
    descriptors: any;
}

const EditorLeftPanelComponent: FC<OwnProps> = forwardRef(({
    canvasRef,
    descriptors,
    ...props
}, editorLeftPanelRef$) => {

    const [activeKey, setActiveKey] = useState('');
    const [collapse, setCollapse] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [filteredDescriptors, setFilteredDescriptors] = useState([]);
    const [svgModalVisible, setSvgModalVisible] = useState(false);
    const [svgOption, setSvgOption] = useState(null);
    const [item, setItem] = useState(null);

    const handlers = useMemo(() => ({
        onAddItem: (item, centered) => {
            if (canvasRef.current?.handler.interactionMode === 'polygon') {
                message.info('Already drawing');

                return;
            }

            const id = uuid();
            const option = Object.assign({}, item.option, { id });

            if (item.option.superType === 'svg' && item.type === 'default') {
                handlers?.onSVGModalVisible();

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

            handlers?.onSVGModalVisible();
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

        onChangeTab: (activeKey) => {
            setActiveKey(activeKey);
        },

        onCollapse: () => {
            setCollapse((prevState) => (!prevState));
        },

        onSearchNode: (event) => {
            const filteredDescriptors = handlers?.transformList()
                .filter((descriptor) => descriptor.name.toLowerCase().includes(event.target.value.toLowerCase()));

            setTextSearch(event.target.value);
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
    }), [
        canvasRef.current,
        descriptors
    ]);

    const events = useMemo(() => ({
        onDragStart: (event, item) => {
            setItem(item);

            const { target } = event;

            target.classList.add('dragging');
        },

        onDragOver: (event) => {
            if (event.preventDefault) {
                event.preventDefault();
            }

            event.dataTransfer.dropEffect = 'copy';

            return false;
        },

        onDragEnter: (event) => {
            const { target } = event;

            target.classList.add('over');
        },

        onDragLeave: (event) => {
            const { target } = event;

            target.classList.remove('over');
        },

        onDrop: (event) => {
            event = event || window.event;

            if (event.preventDefault) {
                event.preventDefault();
            }

            if (event.stopPropagation) {
                event.stopPropagation();
            }

            const { layerX, layerY } = event;

            const dt = event.dataTransfer;

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
                        handlers?.onAddItem(item, false);
                    } else {
                        notification.warning({
                            message: 'Not supported file type',
                        });
                    }
                });
                return false;
            }

            if (!item) {
                return false;
            }

            const option = Object.assign({}, item.option, { left: layerX, top: layerY });
            const newItem = Object.assign({}, item, { option });

            handlers?.onAddItem(newItem, false);

            return false;
        },

        onDragEnd: (event, item: any) => {
            setItem(null);
            event.target.classList.remove('dragging');
        },
    }), [item]);

    const _attachEventListener = (canvas) => {
        canvas.canvas?.wrapperEl?.addEventListener('dragenter', events?.onDragEnter, false);
        canvas.canvas?.wrapperEl?.addEventListener('dragover', events?.onDragOver, false);
        canvas.canvas?.wrapperEl?.addEventListener('dragleave', events?.onDragLeave, false);
        canvas.canvas?.wrapperEl?.addEventListener('drop', events?.onDrop, false);
    };

    const _detachEventListener = (canvas) => {
        canvas.canvas?.wrapperEl?.removeEventListener('dragenter', events?.onDragEnter);
        canvas.canvas?.wrapperEl?.removeEventListener('dragover', events?.onDragOver);
        canvas.canvas?.wrapperEl?.removeEventListener('dragleave', events?.onDragLeave);
        canvas.canvas?.wrapperEl?.removeEventListener('drop', events?.onDrop);
    };

    const _renderItems = (items: any[]) => (
        <Flex flexWrap="wrap" flexDirection="column" style={{ width: '100%' }}>
            {items.map((item) => _renderItem(item))}
        </Flex>
    );

    const _renderItem = (item, centered?: boolean) => {
        if (Array.isArray(item)) {
            return item.map((i) => _renderItem(i, centered));
        }

        return (
            item.type === 'drawing' ? (
                <div
                    key={item.name}
                    draggable
                    onClick={event => handlers?.onDrawingItem(item)}
                    className="rde-editor-items-item"
                    style={{ justifyContent: collapse ? 'center' : null }}
                >
                    <span className="rde-editor-items-item-icon">
                        <Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
                    </span>

                    {(collapse) ? (null) : (
                        <div className="rde-editor-items-item-text">
                            {item.name}
                        </div>
                    )}
                </div>
            ) : (
                <div
                    key={item.name}
                    draggable
                    onClick={event => handlers?.onAddItem(item, centered)}
                    onDragStart={event => events?.onDragStart(event, item)}
                    onDragEnd={event => events?.onDragEnd(event, item)}
                    className="rde-editor-items-item"
                    style={{ justifyContent: collapse ? 'center' : null }}
                >
                    <span className="rde-editor-items-item-icon">
                        <Icon name={item.icon.name} prefix={item.icon.prefix} style={item.icon.style} />
                    </span>

                    {(collapse) ? (null) : (
                        <div className="rde-editor-items-item-text">
                            {item.name}
                        </div>
                    )}
                </div>
            )
        )
    }

    useEffect(() => {

        return () => {
            _detachEventListener(canvasRef.current);
        }
    }, []);

    useDeepCompareEffect(() => {
        if (canvasRef.current) {
            _attachEventListener(canvasRef.current);
        }

    }, [canvasRef.current, item]);

    return (
        <div className={`rde-editor-items rde-editor-left-panel ${Boolean(collapse) ? 'minimize' : ''}`}>
            <Flex flex="1" flexDirection="column" style={{ height: '100%' }}>
                <Flex justifyContent="center" alignItems="center" style={{ height: 40 }}>
                    <CommonButton
                        icon={collapse ? 'angle-double-right' : 'angle-double-left'}
                        shape="circle"
                        className="rde-action-btn"
                        style={{ margin: '0 4px' }}
                        onClick={handlers?.onCollapse}
                    />
                    {collapse ? (null) : (
                        <Input
                            style={{ margin: '8px' }}
                            placeholder={i18n.t('action.search-list')}
                            onChange={handlers?.onSearchNode}
                            value={textSearch}
                            allowClear
                        />
                    )}
                </Flex>
                <Scrollbar>
                    <Flex className="rde-editor-left-panel" flex="1" style={{}}>
                        {((textSearch?.length > 0) && _renderItems(filteredDescriptors)) ||
                            ((collapse) ? (
                                <Flex
                                    flexWrap="wrap"
                                    flexDirection="column"
                                    style={{ width: '100%' }}
                                    justifyContent="center"
                                >
                                    {handlers?.transformList().map((item) => _renderItem(item))}
                                </Flex>
                            ) : (
                                <Tabs
                                    className="rde-editor-left-panel-menu-tabs"
                                    tabPosition="left"
                                    activeKey={activeKey}
                                    onChange={handlers?.onChangeTab}
                                    tabBarStyle={{ marginTop: 20 }}
                                    items={
                                        descriptors?.map((menu) => ({
                                            className: 'rde-editor-left-panel-menu-tab',
                                            key: menu.name,
                                            label: (
                                                <div>
                                                    <Icon prefix={menu.icon.prefix} name={menu.icon?.name} />
                                                    <h5>{menu.name}</h5>
                                                </div>
                                            ),
                                            children: _renderItems(menu?.children ?? [])
                                        }))
                                    }
                                />
                            ))}
                    </Flex>
                </Scrollbar>
            </Flex>
            <SVGModal
                visible={svgModalVisible}
                onOk={handlers?.onAddSVG}
                onCancel={handlers?.onSVGModalVisible}
                option={svgOption}
            />
        </div>
    )
});

const EditorLeftPanel = memo(EditorLeftPanelComponent);

export { EditorLeftPanel };

export default EditorLeftPanel;