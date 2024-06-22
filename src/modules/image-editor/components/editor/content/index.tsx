
// React
import { FC, Fragment, useEffect, useMemo, useRef, useState } from "react";
// Ant Designs
import { Badge, Button, Menu, Popconfirm } from 'antd';
// Lodash
import debounce from 'lodash/debounce';
// i18next
import i18n from 'i18next';
// Common Hooks
import { useDeepCompareEffect, useStore } from "common/hooks";
// Common Components
import { CommonButton, Content } from "common/components";
// Components
import { EditorHeaderToolbar } from "../header-toolbar";
import { EditorFooterToolbar } from "../footer-toolbar";
import { EditorImagePreview } from "../image-preview";
import { EditorRightPanel } from "../right-panel";
import { EditorLeftPanel } from "../left-panel";
import { EditorTitle } from "../title";
// Canvas
import { Canvas, FabricObjectOption } from "modules/canvas";
// Common Classes
import { SandBox } from "common/classes";
// Constants
import { MENU_PROPERTIES } from "common/constants";
// Styles
import 'assets/fontawesome/css/all.css';
import 'assets/style/style.scss';
import { ObjectDataType } from "common/type";

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

const EditorContent: FC<OwnProps> = () => {
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
    const leftPanelRef = useRef(null);
    const container = useRef(null);

    const {
        selectionsIds = [],
        objectsData = {},
    } = useStore();

    const canvasHandlers = useMemo(() => ({
        onAdd: (target) => {
            if (!editing) {
                setEditing(true);
            }

            if (target.type === 'activeSelection') {
                canvasHandlers?.onSelect(null);
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
                setEditing(true);
            }

            canvasHandlers?.onSelect(null);
        },

        onModified: debounce(() => {

            if (!editing) {
                setEditing(true);
            }

        }, 300),

        onZoom: zoom => {
            setZoomRatio(zoom);
        },

        onChange: (selectedItem, changedValues, allValues) => {

            if (!editing) {
                setEditing(true);
            }

            const changedKey = Object.keys(changedValues)[0];
            const changedValue = changedValues[changedKey];

            if (allValues.workarea) {
                canvasHandlers?.onChangeWokarea(changedKey, changedValue, allValues.workarea);

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
                                Children: leftPanelRef.current?.renderItem(newItem, false)
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

        onTransaction: (transaction) => {

        },
    }), [
        canvasRef.current,
        dataSources,
        descriptors,
        animations,
        zoomRatio,
        progress,
        preview,
        loading,
        editing,
        objects,
        styles,
    ]);

    const handlers = useMemo(() => ({
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

        onImportObjects: (objects) => {
            if (!objects) {
                return;
            }

            setLoading(true);
            setTimeout(() => {
                canvasRef.current?.handler.clear(true);

                const data = objects.filter((obj) => {
                    if (!obj.id) {
                        return false;
                    }

                    return true;
                });

                canvasRef.current?.handler.importJSON(data);
            }, 500);
        },

        onImportPage: (page) => {
            if (!page) {
                return;
            }

            if (typeof page === 'string') {
                page = JSON.parse(page);
            }

            setLoading(true);
            setTimeout(() => {

                const {
                    dataSources,
                    animations,
                    objects,
                    styles,
                } = page

                setDataSources(dataSources);
                setAnimations(animations);
                setStyles(styles);

                if (objects) {
                    handlers?.onImportObjects(objects);
                }
            }, 500);
        },

        onImportFiles: (files) => {
            if (!files) {
                return;
            }

            setLoading(true);
            setTimeout(() => {
                const reader = new FileReader();

                reader.onprogress = e => {
                    if (e.lengthComputable) {
                        const progress = parseInt(String((e.loaded / e.total) * 100), 10);

                        handlers?.onProgress(progress);
                    }
                };

                reader.onload = (e) => {
                    const result = e.target.result;
                    handlers?.onImportPage(String(result));
                };

                reader.onloadend = () => {
                    setLoading(false);
                };

                reader.onerror = () => {
                    setLoading(false);
                };

                reader.readAsText(files[0]);
            }, 500);
        },

        onUpload: () => {
            const inputEl = document.createElement('input');
            inputEl.accept = '.json';
            inputEl.type = 'file';
            inputEl.hidden = true;

            inputEl.onchange = (e: any) => {
                handlers?.onImportFiles(e.target.files);
            };

            document.body.appendChild(inputEl); // required for firefox

            inputEl.click();
            inputEl.remove();
        },

        onDownload: () => {
            setLoading(true);

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

            setLoading(false);
        },

        onChangeAnimations: (animations) => {
            if (!editing) {
                setEditing(true);
            }

            setAnimations(animations);
        },

        onChangeStyles: (styles) => {
            if (!editing) {
                setEditing(true);
            }

            setStyles(styles);
        },

        onChangeDataSources: (dataSources) => {
            if (!editing) {
                setEditing(true);
            }

            setDataSources(dataSources);
        },

        onSaveImage: () => {
            canvasRef.current?.handler.saveCanvasImage();
        },
    }), [
        canvasRef.current,
        dataSources,
        descriptors,
        animations,
        zoomRatio,
        progress,
        preview,
        loading,
        editing,
        objects,
        styles,
    ]);

    useEffect(() => {
        setDescriptors(MENU_PROPERTIES);

        setSelectedItem(null);
    }, []);

    useDeepCompareEffect(() => {
        const objectsDataArray = Object.values(objectsData)?.sort(
            (a: ObjectDataType, b: ObjectDataType) => (a.sortOrder - b.sortOrder)
        );

        if ((objectsDataArray?.length > 0)) {
            canvasRef.current?.handler?.clear(true);
            handlers?.onImportObjects(objectsDataArray);
        } else {

        }

        return () => {
            return null;
        };
    }, [objectsData, selectionsIds])

    const transformList = (): any[] => {
        const values: any[] = Object.values(descriptors);

        return values.reduce(
            (prev: any[], curr) => prev.concat(curr),
            []
        );
    };

    return (
        <Content
            title={
                <EditorTitle
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
                                onClick={handlers?.onDownload}
                                tooltipPlacement="bottomRight"
                            />
                            {(editing) ? (
                                <Popconfirm
                                    title={i18n.t('imagemap.imagemap-editing-confirm')}
                                    okText={i18n.t('action.ok')}
                                    cancelText={i18n.t('action.cancel')}
                                    onConfirm={handlers?.onUpload}
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
                                    onClick={handlers?.onUpload}
                                />
                            )}
                            <CommonButton
                                className="rde-action-btn"
                                shape="circle"
                                icon="image"
                                tooltipTitle={i18n.t('action.image-save')}
                                onClick={handlers?.onSaveImage}
                                tooltipPlacement="bottomRight"
                            />
                        </Fragment>
                    }
                />
            }
        >
            <div className="rde-editor">
                <EditorLeftPanel
                    ref={leftPanelRef}
                    canvasRef={canvasRef}
                    descriptors={descriptors}
                />
                <div className="rde-editor-canvas-container">
                    <div className="rde-editor-header-toolbar">
                        <EditorHeaderToolbar
                            canvasRef={canvasRef}
                            selectedItem={selectedItem}
                            onSelect={canvasHandlers?.onSelect}
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
                            onModified={canvasHandlers?.onModified}
                            onAdd={canvasHandlers?.onAdd}
                            onRemove={canvasHandlers?.onRemove}
                            onSelect={canvasHandlers?.onSelect}
                            onZoom={canvasHandlers?.onZoom}
                            onTooltip={canvasHandlers?.onTooltip}
                            onClick={canvasHandlers?.onClick}
                            onContext={canvasHandlers?.onContext}
                            onTransaction={canvasHandlers?.onTransaction}
                            keyEvent={{
                                transaction: true,
                            }}
                            canvasOption={{
                                selectionColor: 'rgba(8, 151, 156, 0.3)',
                            }}
                        />
                    </div>
                    <div className="rde-editor-footer-toolbar">
                        <EditorFooterToolbar
                            canvasRef={canvasRef}
                            preview={preview}
                            onChangePreview={handlers?.onChangePreview}
                            zoomRatio={zoomRatio}
                        />
                    </div>
                </div>
                <EditorRightPanel
                    canvasRef={canvasRef}
                    onChange={canvasHandlers?.onChange}
                    selectedItem={selectedItem}
                    onChangeAnimations={handlers?.onChangeAnimations}
                    onChangeStyles={handlers?.onChangeStyles}
                    onChangeDataSources={handlers?.onChangeDataSources}
                    animations={animations}
                    styles={styles}
                    dataSources={dataSources}
                />
                <EditorImagePreview
                    preview={preview}
                    onChangePreview={handlers?.onChangePreview}
                    onTooltip={canvasHandlers?.onTooltip}
                    onClick={canvasHandlers?.onClick}
                    objects={objects}
                />
            </div>
        </Content>
    )
}

export { EditorContent }

export default EditorContent;