// React
import { FC } from 'react';
// Components
import { TextOptions } from './options';
// Styles
import './style.scss';

type OwnProps = {
    onAddItem: (item: any, centered?: boolean) => void;
    value?: any;
};

const Text: FC<OwnProps> = ({
    onAddItem = undefined,
    value = {},
}) => {

    const _handleSelectChange = (fontFamilly: string) => {
        if (typeof onAddItem === 'function') {
            onAddItem({
                option: {
                    type: "textbox",
                    text: "hello world!",
                    width: 60,
                    height: 30,
                    fontSize: 32,
                    fontFamily: fontFamilly,
                    name: "New text"
                }
            });
        }
    };

    return (
        <div className="rde-editor__tools-text-wrapper" >
            <div className='rde-editor__tools-resize-options-container'>
                <TextOptions
                    className='rde-editor__tools-resize-options'
                    onSelect={_handleSelectChange}
                />
            </div>
        </div>
    );
}

export { Text };

export default Text;