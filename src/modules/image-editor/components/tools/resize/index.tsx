// React
import { FC } from 'react';
// Ant Design
import { Button } from 'antd';
// Actions
// import { SET_RESIZE, ZOOM_CANVAS } from 'common/actions';
// Common Hooks
import { useStore } from 'common/hooks';
// Common Components
import { Label } from 'common/components';
// Components
import ResizeOptions from './options';
// Utils
// import {
//     getSizeAfterRotation,
//     getProperDimensions,
//     getZoomFitFactor,
//     restrictNumber
// } from 'common/utils';
// Constants
// import { DEFAULT_ZOOM_FACTOR } from 'common/constants';
// Styles
import './style.scss';

type OwnProps = {
    onResize?: (value: { width: number, height: number }) => void;
    value?: any;
};

const Resize: FC<OwnProps> = ({
    onResize = undefined,
    value = {},
}) => {
    const {
        dispatch,
        t,
    } = useStore();

    const _handleSelectChange = (size: { width: number; height: number }) => {
        if (typeof onResize === 'function') {
            onResize(size);
        }
    };

    const _changeResize = (e: any) => {
        const { name, value } = e.target;

        if (parseFloat(value) < 1) {
            return;
        }

        // const maxResizeNumber = Math.min(
        //     originalImage.width * 10,
        //     originalImage.height * 10,
        // );

        // const originalImgSizeAfterRotation = getSizeAfterRotation(
        //     originalImage.width,
        //     originalImage.height,
        //     rotation,
        // );

        // const newResize = {
        //     [name]: value ? restrictNumber(value, 0, maxResizeNumber) : value,
        // };

        const isHeight = name === 'height';
        const secondDimensionName: any = isHeight ? 'width' : 'height';
        // const isRatioUnlocked = currentSize.ratioUnlocked ?? resize.ratioUnlocked;

        // if (!isRatioUnlocked) {
        //     const originalImgRatio =
        //         originalImgSizeAfterRotation.width /
        //         originalImgSizeAfterRotation.height;

        //     newResize[secondDimensionName] = isHeight
        //         ? Math.round(newResize[name] * originalImgRatio)
        //         : Math.round(newResize[name] / originalImgRatio);
        // }

        // if (
        //     newResize[name] === resize[name] &&
        //     newResize[secondDimensionName] === resize[secondDimensionName]
        // ) {
        //     return;
        // }

        // if (typeof onChange === 'function') {
        //     onChange(newResize);
        //     return;
        // }

        // dispatch({
        //     type: SET_RESIZE,
        //     payload: newResize,
        // });

        // Fit if there was no resized width/height before for avoiding jumping on change resize
        // as we are simulating zoom relative to original image dimensions but not applying the real original image dimensions
        // const dimensUsedInFit = (crop.width && crop.height && crop) || shownImageDimensions;
        // const updatedResize = { ...resize, ...newResize };

        // dispatch({
        //     type: ZOOM_CANVAS,
        //     payload: {
        //         // factor:
        //         //     updatedResize.width && updatedResize.height
        //         //         ? getZoomFitFactor(dimensUsedInFit, updatedResize)
        //         //         : DEFAULT_ZOOM_FACTOR,
        //         isAbsoluteZoom: true,
        //     },
        // });
    };

    const _toggleRatioLock = () => {
        // if (typeof onChange === 'function') {
        //     onChange({ ratioUnlocked: !currentSize.ratioUnlocked });
        //     return;
        // }

        // dispatch({
        //     type: SET_RESIZE,
        //     payload: {
        //         ratioUnlocked: !resize.ratioUnlocked,
        //     },
        // });
    };

    const _resetResize = () => {
        // dispatch({
        //     type: SET_RESIZE,
        //     payload: {
        //         width: undefined,
        //         height: undefined,
        //         ratioUnlocked: false,
        //     },
        // });

        // const dimensUsedInFit = (crop.width && crop.height && crop) || shownImageDimensions;

        // Fitting after reset resize
        // dispatch({
        //     type: ZOOM_CANVAS,
        //     payload: {
        //         factor: getZoomFitFactor(dimensUsedInFit, dimensUsedInFit),
        //     },
        // });
    };

    // const isOriginalSize = (typeof resize.width === 'undefined' &&
    //     typeof resize.height === 'undefined') ||
    //     (originalImage.width === resize.width &&
    //         originalImage.height === resize.height);

    // const dimensions = getProperDimensions(
    //     ((currentSize.width || currentSize.height) && currentSize) || resize,
    //     crop,
    //     shownImageDimensions,
    //     originalImage,
    //     rotation,
    // );

    // const isManualChangeDisabled = resize.manualChangeDisabled;
    // const isEmptyEditedWidth = typeof resize.width !== 'undefined' && !resize.width;
    // const isEmptyEditedHeight = typeof resize.height !== 'undefined' && !resize.height;

    return (
        <div className="rde-editor__tools-resize-wrapper" >
            {/* <div className='rde-editor__tools-resize-width'>
                <Label>{t('width')}</Label>

                <div className='rde-editor__tools-resize-width-input-wrapper'>
                    <Input
                        className="rde-editor__tools-resize-width-option"
                        value={isEmptyEditedWidth ? '' : dimensions.width}
                        name="width"
                        onChange={isManualChangeDisabled ? undefined : _changeResize}
                        inputMode="numeric"
                        title={t('resizeWidthTitle')}
                        type='number'
                        placeholder="Width"
                        disabled={isManualChangeDisabled}
                    />
                    <Button
                        className="rde-editor__tools-resize-ratio-locker"
                        title={t('toggleRatioLockTitle')}
                        onClick={isManualChangeDisabled ? undefined : _toggleRatioLock}
                        color="primary"
                        size="small"
                        disabled={isManualChangeDisabled}
                    >
                        {currentSize.ratioUnlocked || resize.ratioUnlocked ? (
                            <i className="fas fa-lock-open" />
                        ) : (
                            <i className="fas fa-lock" />
                        )}
                    </Button>
                </div>
            </div>

            <div className='rde-editor__tools-resize-height'>
                <Label>{t('height')}</Label>

                <div className='rde-editor__tools-resize-height-input-wrapper'>
                    <Input
                        className="rde-editor__tools-resize-height-option"
                        value={isEmptyEditedHeight ? '' : dimensions.height}
                        name="height"
                        onChange={isManualChangeDisabled ? undefined : _changeResize}
                        inputMode="numeric"
                        title={t('resizeHeightTitle')}
                        type='number'
                        placeholder="Height"
                        disabled={isManualChangeDisabled}
                    />

                    {!hideResetButton && (
                        <Button
                            className="rde-editor__tools-resize-reset-button"
                            color="primary"
                            size="small"
                            onClick={
                                isOriginalSize || isManualChangeDisabled ? undefined : _resetResize
                            }
                            disabled={isOriginalSize || isManualChangeDisabled}
                        >
                            <i className="fas fa-redo" />
                        </Button>
                    )}
                </div>
            </div> */}

            <div className='rde-editor__tools-resize-options-container'>
                <ResizeOptions
                    className='rde-editor__tools-resize-options'
                    onSelect={_handleSelectChange}
                />
            </div>
        </div>
    );
};

export { Resize }

export default Resize;
