
// React
import { Children, FC, Fragment, useEffect, useRef, useState } from "react";
// Ant Designs
import { Badge, Button, Menu, Popconfirm } from 'antd';
// Lodash
import debounce from 'lodash/debounce';
// i18next
import i18n from 'i18next';
// Common Components
import { CommonButton, Content } from "common/components";
// Components
import { ImageMapConfigurations } from "../image-map-configurations";
import { ImageMapHeaderToolbar } from "../image-map-header-toolbar";
import { ImageMapFooterToolbar } from "../image-map-footer-toolbar";
import { ImageMapPreview } from "../image-map-preview";
import { ImageMapTitle } from "../image-map-title";
import { ImageMapItems } from "../image-map-items";
// Canvas
import { Canvas, FabricObjectOption } from "modules/canvas";
// Common Classes
import { SandBox } from "common/classes";
// Styles
import 'assets/fontawesome/css/all.css';
import 'assets/style/index.scss';

const propertiesToInclude = [
    'id',
    'name',
    'locked',
    'file',
    'src',
    'link',
    'tooltip',
    'animation',
    'layout',
    'workareaWidth',
    'workareaHeight',
    'videoLoadType',
    'autoplay',
    'shadow',
    'muted',
    'loop',
    'code',
    'icon',
    'userProperty',
    'trigger',
    'configuration',
    'superType',
    'points',
    'svg',
    'loadType',
];

const defaultOption: FabricObjectOption = {
    stroke: 'rgba(255, 255, 255, 0)',
    strokeUniform: true,
    resource: {},
    link: {
        enabled: false,
        type: 'resource',
        state: 'new',
        dashboard: {},
    },
    tooltip: {
        enabled: true,
        type: 'resource',
        template: '<div>{{message.name}}</div>',
    },
    animation: {
        type: 'none',
        loop: true,
        autoplay: true,
        duration: 1000,
    },
    userProperty: {},
    trigger: {
        enabled: false,
        type: 'alarm',
        script: 'return message.value > 0;',
        effect: 'style',
    },
};

type OwnProps = {};

const ImageMapEditor: FC<OwnProps> = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [zoomRatio, setZoomRatio] = useState(1);
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [animations, setAnimations] = useState([])
    const [styles, setStyles] = useState([]);
    const [dataSources, setDataSources] = useState([]);
    const [editing, setEditing] = useState(false);
    const [descriptors, setDescriptors] = useState({});
    const [objects, setObjects] = useState([]);

    const canvasRef = useRef(null);
    const itemsRef = useRef(null);
    const container = useRef(null);
    const handlersRef = useRef(null);
    const canvasHandlersRef = useRef(null);

    const canvasHandlers = useRef({
        onAdd: (target) => {
            if (!editing) {
                changeEditing(true);
            }

            if (target.type === 'activeSelection') {
                canvasHandlers.current?.onSelect(null);
                return;
            }

            canvasRef.current?.handler.select(target);
        },
        onSelect: (target) => {
            if (target && target.id && target.id !== 'workarea' && target.type !== 'activeSelection') {

                if (selectedItem && target.id === selectedItem.id) {
                    return;
                }

                canvasRef.current?.handler.getObjects().forEach(obj => {
                    if (obj) {
                        canvasRef.current?.handler.animationHandler.resetAnimation(obj, true);
                    }
                });

                setSelectedItem(target);

                return;
            }

            canvasRef.current?.handler.getObjects().forEach((obj: any) => {
                if (obj) {
                    canvasRef.current?.handler.animationHandler.resetAnimation(obj, true);
                }
            });

            setSelectedItem(null);
        },
        onRemove: () => {

            if (!editing) {
                changeEditing(true);
            }

            canvasHandlers.current?.onSelect(null);
        },
        onModified: debounce(() => {

            if (!editing) {
                changeEditing(true);
            }

        }, 300),
        onZoom: zoom => {
            setZoomRatio(zoom);
        },
        onChange: (selectedItem, changedValues, allValues) => {

            if (!editing) {
                changeEditing(true);
            }

            const changedKey = Object.keys(changedValues)[0];
            const changedValue = changedValues[changedKey];

            if (allValues.workarea) {
                canvasHandlers.current?.onChangeWokarea(changedKey, changedValue, allValues.workarea);

                return;
            }

            if (changedKey === 'width' || changedKey === 'height') {
                canvasRef.current?.handler.scaleToResize(allValues.width, allValues.height);

                return;
            }

            if (changedKey === 'angle') {
                canvasRef.current?.handler.rotate(allValues.angle);

                return;
            }

            if (changedKey === 'locked') {
                canvasRef.current?.handler.setObject({
                    lockMovementX: changedValue,
                    lockMovementY: changedValue,
                    hasControls: !changedValue,
                    hoverCursor: changedValue ? 'pointer' : 'move',
                    editable: !changedValue,
                    locked: changedValue,
                });

                return;
            }

            if (changedKey === 'file' || changedKey === 'src' || changedKey === 'code') {
                if (selectedItem?.type === 'image') {
                    canvasRef.current?.handler.setImageById(selectedItem.id, changedValue);

                } else if (selectedItem?.superType === 'element') {
                    canvasRef.current?.handler.elementHandler.setById(selectedItem.id, changedValue);
                }

                return;
            }

            if (changedKey === 'link') {
                const link = Object.assign({}, defaultOption.link, allValues.link);
                canvasRef.current?.handler.set(changedKey, link);

                return;
            }

            if (changedKey === 'tooltip') {
                const tooltip = Object.assign({}, defaultOption.tooltip, allValues.tooltip);
                canvasRef.current?.handler.set(changedKey, tooltip);

                return;
            }

            if (changedKey === 'animation') {
                const animation = Object.assign({}, defaultOption.animation, allValues.animation);
                canvasRef.current?.handler.set(changedKey, animation);

                return;
            }

            if (changedKey === 'icon') {
                const { unicode, styles } = changedValue[Object.keys(changedValue)[0]];

                const uni = parseInt(unicode, 16);

                if (styles[0] === 'brands') {
                    canvasRef.current?.handler.set('fontFamily', 'Font Awesome 5 Brands');

                } else if (styles[0] === 'regular') {
                    canvasRef.current?.handler.set('fontFamily', 'Font Awesome 5 Regular');

                } else {
                    canvasRef.current?.handler.set('fontFamily', 'Font Awesome 5 Free');

                }

                canvasRef.current?.handler.set('text', String.fromCodePoint(uni));
                canvasRef.current?.handler.set('icon', changedValue);

                return;
            }

            if (changedKey === 'shadow') {
                if (allValues.shadow.enabled) {
                    if ('blur' in allValues.shadow) {
                        canvasRef.current?.handler.setShadow(allValues.shadow);

                    } else {
                        canvasRef.current?.handler.setShadow({
                            enabled: true,
                            blur: 15,
                            offsetX: 10,
                            offsetY: 10,
                        });
                    }
                } else {
                    canvasRef.current?.handler.setShadow(null);
                }

                return;
            }

            if (changedKey === 'fontWeight') {
                canvasRef.current?.handler.set(changedKey, changedValue ? 'bold' : 'normal');
                return;
            }

            if (changedKey === 'fontStyle') {
                canvasRef.current?.handler.set(changedKey, changedValue ? 'italic' : 'normal');
                return;
            }

            if (changedKey === 'textAlign') {
                canvasRef.current?.handler.set(changedKey, Object.keys(changedValue)[0]);
                return;
            }

            if (changedKey === 'trigger') {
                const trigger = Object.assign({}, defaultOption.trigger, allValues.trigger);
                canvasRef.current?.handler.set(changedKey, trigger);

                return;
            }

            if (changedKey === 'filters') {
                const filterKey = Object.keys(changedValue)[0];
                const filterValue = allValues.filters[filterKey];

                if (filterKey === 'gamma') {
                    const rgb = [filterValue.r, filterValue.g, filterValue.b];

                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        gamma: rgb,
                    });

                    return;
                }

                if (filterKey === 'brightness') {
                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        brightness: filterValue.brightness,
                    });

                    return;
                }

                if (filterKey === 'contrast') {
                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        contrast: filterValue.contrast,
                    });

                    return;
                }

                if (filterKey === 'saturation') {
                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        saturation: filterValue.saturation,
                    });

                    return;
                }

                if (filterKey === 'hue') {
                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        rotation: filterValue.rotation,
                    });

                    return;
                }

                if (filterKey === 'noise') {
                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        noise: filterValue.noise,
                    });

                    return;
                }

                if (filterKey === 'pixelate') {
                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        blocksize: filterValue.blocksize,
                    });

                    return;
                }

                if (filterKey === 'blur') {
                    canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
                        value: filterValue.value,
                    });

                    return;
                }

                canvasRef.current?.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey]);

                return;
            }

            if (changedKey === 'chartOption') {
                try {
                    const sandbox = new SandBox();
                    const compiled = sandbox.compile(changedValue);

                    const chartOption = compiled(3, animations, styles, selectedItem.userProperty);

                    selectedItem.setChartOptionStr(changedValue);

                    canvasRef.current?.handler.elementHandler.setById(selectedItem.id, chartOption);
                } catch (error) {
                    console.error(error);
                }

                return;
            }

            canvasRef.current?.handler.set(changedKey, changedValue);
        },
        onChangeWokarea: (changedKey, changedValue, allValues) => {
            if (changedKey === 'layout') {
                canvasRef.current?.handler.workareaHandler.setLayout(changedValue);

                return;
            }

            if (changedKey === 'file' || changedKey === 'src') {
                canvasRef.current?.handler.workareaHandler.setImage(changedValue);

                return;
            }

            if (changedKey === 'width' || changedKey === 'height') {
                canvasRef.current?.handler.originScaleToResize(
                    canvasRef.current?.handler.workarea,
                    allValues.width,
                    allValues.height,
                );
                canvasRef.current?.canvas?.centerObject(canvasRef.current?.handler.workarea);

                return;
            }

            canvasRef.current?.handler.workarea.set(changedKey, changedValue);
            canvasRef.current?.canvas?.requestRenderAll();
        },
        onTooltip: (ref, target) => {
            const value = Math.random() * 10 + 1;

            return (
                <div>
                    <div>
                        <div>
                            <Button>{target.id}</Button>
                        </div>
                        <Badge count={value} />
                    </div>
                </div>
            );
        },
        onClick: (canvas?: any, target?: any) => {
            const { link } = target;

            if (link?.state === 'current') {
                document.location.href = link.url;

                return;
            }

            window.open(link.url);
        },
        onContext: (ref, event, target) => {
            if ((target && target.id === 'workarea') || !target) {
                const { layerX: left, layerY: top } = event;

                return (
                    <Menu
                        items={transformList().map((item) => {
                            const option = Object.assign({}, item.option, { left, top });
                            const newItem = Object.assign({}, item, { option });

                            return {
                                key: item.name,
                                label: i18n.t(`imagemap.${item.name}`),
                                Children: itemsRef.current?.renderItem(newItem, false)
                            };
                        })}
                    />
                );
            }

            if (target.type === 'activeSelection') {
                return (
                    <Menu
                        items={[
                            {
                                onClick: () => {
                                    canvasRef.current?.handler.toGroup();
                                },
                                key: 'toGroup',
                                label: i18n.t('action.object-group'),
                            },
                            {
                                onClick: () => {
                                    canvasRef.current?.handler.duplicate();
                                },
                                key: 'clone',
                                label: i18n.t('action.clone'),
                            },
                            {
                                onClick: () => {
                                    canvasRef.current?.handler.remove();
                                },
                                key: 'delete',
                                label: i18n.t('action.delete'),
                            },
                        ]}
                    />
                );
            }

            if (target.type === 'group') {
                return (
                    <Menu
                        items={[
                            {
                                onClick: () => {
                                    canvasRef.current?.handler.toActiveSelection();
                                },
                                key: 'toActiveSelection',
                                label: i18n.t('action.object-ungroup'),
                            },
                            {
                                onClick: () => {
                                    canvasRef.current?.handler.duplicate();
                                },
                                key: 'clone',
                                label: i18n.t('action.clone'),
                            },
                            {
                                onClick: () => {
                                    canvasRef.current?.handler.remove();
                                },
                                key: 'delete',
                                label: i18n.t('action.delete'),
                            },
                        ]}
                    />
                );
            }
            return (
                <Menu
                    items={[
                        {
                            onClick: () => {
                                canvasRef.current?.handler.duplicateById(target.id);
                            },
                            key: 'clone',
                            label: i18n.t('action.clone'),
                        },
                        {
                            onClick: () => {
                                canvasRef.current?.handler.removeById(target.id);
                            },
                            key: 'delete',
                            label: i18n.t('action.delete'),
                        },
                    ]}
                />
            );
        },
        onTransaction: transaction => {

        },
    });

    const handlers = useRef({
        onChangePreview: (checked) => {
            let data;
            if (canvasRef.current) {
                data = canvasRef.current?.handler.exportJSON().filter(obj => {
                    if (!obj.id) {
                        return false;
                    }
                    return true;
                });
            }
            setPreview(typeof checked === 'object' ? false : checked);
            setObjects(data);
        },
        onProgress: (progress) => {
            setProgress(progress);
        },
        onImport: (files) => {
            if (files) {
                showLoading(true);
                setTimeout(() => {
                    const reader = new FileReader();

                    reader.onprogress = e => {
                        if (e.lengthComputable) {
                            const progress = parseInt(String((e.loaded / e.total) * 100), 10);
                            handlers.current?.onProgress(progress);
                        }
                    };

                    reader.onload = (e) => {
                        const result = e.target.result;

                        const { objects, animations, styles, dataSources } = JSON.parse(String(result));

                        setAnimations(animations);
                        setStyles(styles);
                        setDataSources(dataSources);

                        if (objects) {
                            canvasRef.current?.handler.clear(true);
                            const data = objects.filter(obj => {
                                if (!obj.id) {
                                    return false;
                                }
                                return true;
                            });
                            canvasRef.current?.handler.importJSON(data);
                        }
                    };
                    reader.onloadend = () => {
                        showLoading(false);
                    };
                    reader.onerror = () => {
                        showLoading(false);
                    };
                    reader.readAsText(files[0]);
                }, 500);
            }
        },
        onUpload: () => {
            const inputEl = document.createElement('input');
            inputEl.accept = '.json';
            inputEl.type = 'file';
            inputEl.hidden = true;

            inputEl.onchange = (e: any) => {
                handlers.current?.onImport(e.target.files);
            };

            document.body.appendChild(inputEl); // required for firefox

            inputEl.click();
            inputEl.remove();
        },
        onDownload: () => {
            showLoading(true);

            const objects = canvasRef.current?.handler.exportJSON().filter(obj => {
                if (!obj.id) {
                    return false;
                }

                return true;
            });

            const exportDatas = {
                objects,
                animations,
                styles,
                dataSources,
            };

            const anchorEl = document.createElement('a');

            anchorEl.href = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(exportDatas, null, '\t'),
            )}`;

            anchorEl.download = `${canvasRef.current?.handler.workarea.name || 'sample'}.json`;
            document.body.appendChild(anchorEl); // required for firefox
            anchorEl.click();
            anchorEl.remove();

            showLoading(false);
        },
        onChangeAnimations: animations => {
            if (!editing) {
                changeEditing(true);
            }

            setAnimations(animations);
        },
        onChangeStyles: styles => {
            if (!editing) {
                changeEditing(true);
            }

            setStyles(styles);
        },
        onChangeDataSources: dataSources => {
            if (!editing) {
                changeEditing(true);
            }

            setDataSources(dataSources);
        },
        onSaveImage: () => {
            canvasRef.current?.handler.saveCanvasImage();
        },
    });


    useEffect(() => {
        showLoading(true);

        import('./descriptors.json').then((descriptors) => {
            setDescriptors(descriptors);

            showLoading(false);
        });

        setSelectedItem(null);
    }, []);

    const transformList = (): any[] => {
        const values: any[] = Object.values(descriptors);

        return values.reduce(
            (prev: any[], curr) => prev.concat(curr),
            []
        );
    };

    const showLoading = (loading) => {
        setLoading(loading);
    };

    const changeEditing = (editing) => {
        setEditing(editing);
    };

    return (
        <Content
            title={
                <ImageMapTitle
                    title={
                        <Fragment>
                            <span>{i18n.t('imagemap.imagemap-editor')}</span>
                        </Fragment>}
                    action={
                        <Fragment>
                            <CommonButton
                                className="rde-action-btn"
                                shape="circle"
                                icon="file-download"
                                disabled={!editing}
                                tooltipTitle={i18n.t('action.download')}
                                onClick={handlers.current?.onDownload}
                                tooltipPlacement="bottomRight"
                            />
                            {editing ? (
                                <Popconfirm
                                    title={i18n.t('imagemap.imagemap-editing-confirm')}
                                    okText={i18n.t('action.ok')}
                                    cancelText={i18n.t('action.cancel')}
                                    onConfirm={handlers.current?.onUpload}
                                    placement="bottomRight"
                                >
                                    <CommonButton
                                        className="rde-action-btn"
                                        shape="circle"
                                        icon="file-upload"
                                        tooltipTitle={i18n.t('action.upload')}
                                        tooltipPlacement="bottomRight"
                                    />
                                </Popconfirm>
                            ) : (
                                <CommonButton
                                    className="rde-action-btn"
                                    shape="circle"
                                    icon="file-upload"
                                    tooltipTitle={i18n.t('action.upload')}
                                    tooltipPlacement="bottomRight"
                                    onClick={handlers.current?.onUpload}
                                />
                            )}
                            <CommonButton
                                className="rde-action-btn"
                                shape="circle"
                                icon="image"
                                tooltipTitle={i18n.t('action.image-save')}
                                onClick={handlers.current?.onSaveImage}
                                tooltipPlacement="bottomRight"
                            />
                        </Fragment>
                    }
                />
            }
        >
            <div className="rde-editor">
                <ImageMapItems
                    ref={itemsRef}
                    canvasRef={canvasRef}
                    descriptors={descriptors}
                />
                <div className="rde-editor-canvas-container">
                    <div className="rde-editor-header-toolbar">
                        <ImageMapHeaderToolbar
                            canvasRef={canvasRef}
                            selectedItem={selectedItem}
                            onSelect={canvasHandlers?.current?.onSelect}
                        />
                    </div>
                    <div
                        ref={container}
                        className="rde-editor-canvas"
                    >
                        <Canvas
                            ref={canvasRef}
                            className="rde-canvas"
                            minZoom={1}
                            maxZoom={500}
                            objectOption={defaultOption}
                            propertiesToInclude={propertiesToInclude}
                            onModified={canvasHandlers.current?.onModified}
                            onAdd={canvasHandlers.current?.onAdd}
                            onRemove={canvasHandlers.current?.onRemove}
                            onSelect={canvasHandlers.current?.onSelect}
                            onZoom={canvasHandlers.current?.onZoom}
                            onTooltip={canvasHandlers.current?.onTooltip}
                            onClick={canvasHandlers.current?.onClick}
                            onContext={canvasHandlers.current?.onContext}
                            onTransaction={canvasHandlers.current?.onTransaction}
                            keyEvent={{
                                transaction: true,
                            }}
                            canvasOption={{
                                selectionColor: 'rgba(8, 151, 156, 0.3)',
                            }}
                        />
                    </div>
                    <div className="rde-editor-footer-toolbar">
                        <ImageMapFooterToolbar
                            canvasRef={canvasRef}
                            preview={preview}
                            onChangePreview={handlers.current?.onChangePreview}
                            zoomRatio={zoomRatio}
                        />
                    </div>
                </div>
                <ImageMapConfigurations
                    canvasRef={canvasRef}
                    onChange={canvasHandlers.current?.onChange}
                    selectedItem={selectedItem}
                    onChangeAnimations={handlers.current?.onChangeAnimations}
                    onChangeStyles={handlers.current?.onChangeStyles}
                    onChangeDataSources={handlers.current?.onChangeDataSources}
                    animations={animations}
                    styles={styles}
                    dataSources={dataSources}
                />
                <ImageMapPreview
                    preview={preview}
                    onChangePreview={handlers.current?.onChangePreview}
                    onTooltip={canvasHandlers.current?.onTooltip}
                    onClick={canvasHandlers.current?.onClick}
                    objects={objects}
                />
            </div>
        </Content>
    )
}

export { ImageMapEditor }

export default ImageMapEditor;