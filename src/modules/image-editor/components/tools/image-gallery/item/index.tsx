// React
import { FC } from "react";
// Types
import { ImageType } from "common/type";
// Styles
import './style.scss';

type OwnProps = {
    image: ImageType
    onSelect: (url: string) => void;
}

const ImageGalleryItem: FC<OwnProps> = ({
    image,
    onSelect
}) => {

    return (
        <div className="rde-editor__tools-image-gallery-item"
            onClick={() => onSelect(image.src)}
            key={image.src}
        >
            <img
                className="rde-editor__tools-image-gallery-item-img"
                crossOrigin="anonymous"
                alt={image.name}
                src={image.src}
                draggable={true}
            />
        </div>
    );
};

export { ImageGalleryItem };

export default ImageGalleryItem; 