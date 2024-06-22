// React
import { FC, MouseEvent } from "react";
// Common Hooks
import { useBrowserFonts } from "common/hooks";
// Common Components
import { Masonry } from "common/components";
// Styles
import "./style.scss";

type OwnProps = {
    onSelect?: (fontFamily: string, event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    currentSize?: any;
};

const TextOptions: FC<OwnProps> = ({
    className = '',
    onSelect = undefined,
    currentSize = {},
}) => {

    const { fonts } = useBrowserFonts();

    const _handleClick = (fontFamily: string, event: MouseEvent<any>) => {
        if (typeof onSelect === 'function') {
            onSelect(fontFamily, event)
        }
    };

    return (
        <div className={`rde-editor__tools-text-options-wrapper ${className}`}>
            <div className="rde-editor__tools-text-options-header">
                <h2 className='title'>
                    Text Options
                </h2>
            </div>
            <div className="rde-editor__tools-text-options-list d-flex flex-column">

                <Masonry
                    className={`rde-editor__tools-text-options-masonry`}
                    data={fonts}
                    columnCount={2}
                    render={(fontFamily: any, index: number) => (
                        <h6
                            className='rde-editor__tools-text-options-item'
                            onClick={(event) => _handleClick(fontFamily, event)}
                            key={index}
                            style={{
                                width: "100%",
                                fontFamily: fontFamily,
                                fontSize: 20,
                                textAlign: "center",
                            }}>
                            Hello World!
                        </h6>
                    )}
                />
            </div>
        </div>
    );
};

export { TextOptions }

export default TextOptions;