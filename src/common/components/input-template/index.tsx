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
    defaultValue: string;
    value: string;
    width: string | number;
    height: string | number;
    onChange: (value: string) => void;
    onValidate: (errors: any) => void;
    showLineNumbers: boolean;
    newLineMode: boolean;
    disabled: boolean;
}

const InputTemplate: FC<OwnProps> = ({
    defaultValue,
    value,
    width = '100%',
    height = '200px',
    onChange,
    onValidate,
    showLineNumbers = true,
    newLineMode = true,
    disabled = false,
    ...props
}) => {

    const [text, setText] = useState(value || '');

    const debouncedValidate = useRef(null);
    const aceRef = useRef(null);

    useEffect(() => {

        if (!newLineMode) {
            aceRef.current?.editor.keyBinding.addKeyboardHandler((data, hashId, keyString, keyCode, e) => {
                if (keyCode === 13) {
                    return { command: 'null' }; // do nothing
                }
            });
        }

    }, []);

    useDeepCompareEffect(() => {
        setText(value);
    }, [value]);

    const handleChange = (value: string, e: any) => {
        if (typeof onChange === 'function') {
            onChange(value);
        }

        setText(value);
    };

    const handleValidate = (annotations: any[]) => {
        if (annotations.length) {
            const errors = annotations
                .filter((annotation) => annotation.type === 'error')
                .map((annotation) => {
                    return new Error(`${annotation.row}:${annotation.column} ${annotation.text} error`);
                });

            debouncedValidate.current(errors);
        }
    };

    return (
        <ReactAce
            ref={aceRef}
            mode="handlebars"
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
            maxLines={!newLineMode ? 1 : null}
            setOptions={{
                showLineNumbers,
                newLineMode: 'auto',
                readOnly: disabled,
            }}
        />
    )
}

export { InputTemplate };

export default InputTemplate;