// React
import { FC, Ref, TextareaHTMLAttributes, forwardRef } from "react";
// Lib
import ReactTextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
// Styles
import './style.scss';

type OwnProps = TextareaAutosizeProps & TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string
    iconStart?: any,
    iconEnd?: any,
    error?: boolean,
};

const Textarea: FC<OwnProps> = forwardRef(({
    className = '',
    iconStart,
    iconEnd,
    error = false,
    disabled,
    ...props
},
    textareaRef$: Ref<HTMLTextAreaElement> // Update the type of textareaRef$
) => {

    return (
        <ReactTextareaAutosize
            className={`rde-editor__textarea ${className}`}
            ref={textareaRef$}
            {...props}
        />
    );
});

export { Textarea };

export default Textarea;