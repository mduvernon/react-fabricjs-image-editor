// React
import { CSSProperties, FC, Ref, RefAttributes, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
// Fabric
import { fabric } from 'fabric';
// Utils
import { v4 as uuid } from 'uuid';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Handlers
import { Handler, HandlerCallback } from "../../handlers";
// Constants
import { defaults } from '../../constants';
// Utils
import {
    FabricObjectOption,
    GuidelineOption,
    WorkareaOption,
    FabricObjects,
    GridOption,
    KeyEvent,
} from "../../utils";
// Styles
import '../../styles/canvas.less';
import '../../styles/contextmenu.less';
import '../../styles/fabricjs.less';
import '../../styles/tooltip.less';

type OwnProps = RefAttributes<HTMLDivElement> & HandlerCallback & {
    id?: string;
    className?: string;
    editable?: boolean;
    zoomEnabled?: boolean;
    minZoom?: number;
    maxZoom?: number;
    responsive?: boolean;
    width?: number;
    height?: number;
    style?: CSSProperties;
    canvasOption?: fabric.ICanvasOptions;
    keyEvent?: KeyEvent;
    fabricObjects?: FabricObjects;
    workareaOption?: WorkareaOption
    guidelineOption?: GuidelineOption
    objectOption?: FabricObjectOption
    gridOption?: GridOption
    propertiesToInclude?: string[]
    activeSelectionOption?: Partial<FabricObjectOption<fabric.ActiveSelection>>
    onLoad?: (handler: any, canvas: fabric.Canvas) => void;
}

const Canvas: FC<OwnProps> = forwardRef(({
    editable = true,
    className = '',
    zoomEnabled = true,
    minZoom = 30,
    maxZoom = 300,
    responsive = true,
    canvasOption = {},
    width = 0,
    height = 0,
    style = {},
    keyEvent,
    fabricObjects,
    workareaOption,
    guidelineOption,
    objectOption,
    gridOption,
    propertiesToInclude,
    activeSelectionOption,
    onLoad,
    ...props
}, canvasRef$: Ref<any>) => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [id, setId] = useState<string>(uuid());
    const [render, rerender] = useState(false);

    const handler = useRef<Handler>(null);
    const canvas = useRef<fabric.Canvas>(null);
    const container = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const resizeObserver = useRef<ResizeObserver>(null);

    // Component Did Mount
    useEffect(() => {

        const mergedCanvasOption = Object.assign({}, defaults.canvasOption, canvasOption, {
            width,
            height,
            selection: (typeof canvasOption?.selection !== 'undefined' && canvasOption?.selection) || editable,
        });

        canvas.current = new fabric.Canvas(`canvas_${id}`, mergedCanvasOption);
        canvas.current.setBackgroundColor(mergedCanvasOption.backgroundColor, canvas.current.renderAll.bind(canvas.current));
        canvas.current.renderAll();
        container.current = containerRef.current;

        handler.current = new Handler({
            id,
            width,
            height,
            editable,
            canvas: canvas.current,
            container: containerRef.current,
            canvasOption: mergedCanvasOption,
            ...props,
        });

        if (responsive) {
            _createObserver();
        } else {
            _handleLoad();
        }

        // Component Will Unmount
        return () => {
            _destroyObserver();
            handler.current.destroy();
        };
    }, []);

    useDeepCompareEffect(() => {
        handler.current.eventHandler.resize(width, height);
        handler.current.editable = editable;

        if (responsive) {
            _destroyObserver();
            _createObserver();
        } else {
            _destroyObserver();
        }

        handler.current.setCanvasOption(canvasOption);
        handler.current.setKeyEvent(keyEvent);
        handler.current.setFabricObjects(fabricObjects);
        handler.current.setWorkareaOption(workareaOption);
        handler.current.setGuidelineOption(guidelineOption);
        handler.current.setObjectOption(objectOption);
        handler.current.setGridOption(gridOption);
        handler.current.setPropertiesToInclude(propertiesToInclude);
        handler.current.setActiveSelectionOption(activeSelectionOption);
    }, [
        editable,
        zoomEnabled,
        minZoom,
        maxZoom,
        responsive,
        canvasOption,
        width,
        height,
        style,
        keyEvent,
        fabricObjects,
        workareaOption,
        guidelineOption,
        objectOption,
        gridOption,
        propertiesToInclude,
        activeSelectionOption,
        props
    ]);

    useImperativeHandle(canvasRef$, () => {
        return {
            handler: handler.current,
            canvas: canvas.current,
            container: container.current,
            rerender: _handleRerender,
        };
    }, [handler.current, canvas.current, container.current]);

    const _createObserver = () => {
        resizeObserver.current = new ResizeObserver((entries: ResizeObserverEntry[]) => {

            const {
                width = 0,
                height = 0
            } = (entries[0] && entries[0].contentRect) || {};

            handler.current.eventHandler.resize(width, height);

            if (!loaded) {
                _handleLoad();
            }
        });

        resizeObserver.current.observe(containerRef.current);
    };

    const _destroyObserver = () => {
        if (resizeObserver.current) {
            resizeObserver.current.disconnect();
            resizeObserver.current = null;
        }
    };

    const _handleLoad = () => {
        setLoaded(true);

        if (typeof onLoad === 'function') {
            onLoad(handler.current, canvas.current);
        }
    };

    const _handleRerender = () => {
        rerender((prev) => !prev);
        canvas.current.renderAll();
    };

    return (
        <div
            ref={containerRef}
            id={id}
            className={`rde-canvas ${className}`}
            style={{ width: '100%', height: '100%', ...style }}
        >
            <canvas id={`canvas_${id}`} />
        </div>
    );
});

export { Canvas };

export default Canvas;