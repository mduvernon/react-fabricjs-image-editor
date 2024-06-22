// React
import { FC, useRef } from 'react';
// Common Hooks
import { useStore } from 'common/hooks';
// Common Components
import { Carousel } from 'common/components';
// Components
import { ImageGalleryItem } from './item';
// Types
import { ImageType } from 'common/type';
// Styles
import './style.scss';

const ADDED_IMG_SPACING_PERCENT = 0.15;

const style = {};

type OwnProps = {
    onAddItem: (item: any, centered?: boolean) => void;
};

const ImageGallery: FC<OwnProps> = ({
    onAddItem,
}) => {
    const requestedImgsCount: any = useRef(0);

    const {
        config: { imagesGallery = [] },
        dispatch,
        t,
    } = useStore();

    const _handleAddImgScaled = (loadedImg: any) => {
        if (typeof onAddItem === 'function') {
            onAddItem({
                option: {
                    type: 'image',
                    name: 'New image',
                    src: loadedImg.src,
                }
            });
        }
    };

    const _hideLoaderAfterDone = (filesLength: any) => {
        requestedImgsCount.current += 1;

        if (requestedImgsCount.current === filesLength) {
            requestedImgsCount.current = 0;
        }
    };

    const _setFeedback = (msg: any) => {
        // dispatch({
        //     type: SET_FEEDBACK,
        //     payload: {
        //         feedback: {
        //             message: msg,
        //             status: FEEDBACK_STATUSES.WARNING,
        //         },
        //     },
        // });
    };

    const _handleImportImgFromGallery = (imgUrl: string) => {
        const img = new Image();

        img.onload = () => {
            _handleAddImgScaled(img);
            _hideLoaderAfterDone(1);
        };

        img.onerror = () => {
            _setFeedback(t('uploadImageError'));
            _hideLoaderAfterDone(1);
        };

        img.crossOrigin = 'Anonymous';
        img.src = imgUrl;
    };

    return (
        <Carousel className="rde-editor__tools-image-gallery" style={style} >
            {imagesGallery?.map(({ src, alt }: ImageType, index: number) => (
                <ImageGalleryItem
                    onSelect={_handleImportImgFromGallery}
                    image={{ src, alt }}
                    key={alt}
                />
            ))}
        </Carousel>
    );
};

export { ImageGallery }

export default ImageGallery;
