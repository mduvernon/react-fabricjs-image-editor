// React
import { FC, useEffect, useRef, useState } from "react";
// React Ace
import ReactAce from 'react-ace';
// Lodash
import debounce from 'lodash/debounce';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-github';
import { useDeepCompareEffect } from "common/hooks";

type OwnProps = {
    defaultValue?: string;
    value?: string;
    width?: string | number;
    height?: string | number;
    onChange?: (value?: string) => void;
    onValidate?: (errors?: any) => void;
    disabled?: boolean;
}

const InputHTML: FC<OwnProps> = ({
    defaultValue,
    value,
    width = '100%',
    height = '200px',
    onChange,
    onValidate,
    disabled = false,
    ...props
}) => {

    const [text, setText] = useState(value || '');

    const debouncedValidate = useRef(null);
    const aceRef = useRef(null);

    useEffect(() => {
        debouncedValidate.current = debounce(errors => {
            if (typeof onValidate === 'function') {
                onValidate(errors);
            }

            if (typeof onChange === 'function') {
                onChange(text);
            }
        }, 200);

        return () => {
            if (debouncedValidate.current) {
                debouncedValidate.current();
            }
        }
    }, []);

    useDeepCompareEffect(() => {
        setText(value);
    }, [value]);

    const handleChange = (value?: string, e?: any) => {
        if (debouncedValidate.current) {
            debouncedValidate.current();
        }

        setText(value);
    };

    const handleValidate = (annotations?: any[]) => {
        if (annotations.length) {
            const errors = annotations
                .filter((annotation) => annotation.type === 'error')
                .map((annotation) => {
                    return new Error(`${annotation.row}?:${annotation.column} ${annotation.text} error`);
                });

            debouncedValidate.current(errors);
        }
    };

    return (
        <ReactAce
            ref={aceRef}
            mode="html"
            theme="github"
            width={String(width)}
            height={String(height)}
            defaultValue={defaultValue || text}
            value={text}
            editorProps={{
                $blockScrolling: true,
            }}
            onChange={handleChange}
            onValidate={handleValidate}
            readOnly={disabled}
        />
    )
}

export { InputHTML };

export default InputHTML;