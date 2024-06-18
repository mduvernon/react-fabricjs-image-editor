import { FC, LegacyRef, Ref, RefAttributes, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
// Ant Design
import { Form, Row, Col } from 'antd';
// Lodash
import debounce from 'lodash/debounce';
// React Ace
import ReactAce from 'react-ace';
// Components
import { AcePreview } from '../preview';
// Styles
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

type Handlers = {
    onChangeHTML?: (value: any) => void,
    onChangeCSS?: (value: any) => void,
    onChangeJS?: (value: any) => void,
    onValidateHTML?: (value: any) => void,
    getAnnotations?: () => {
        htmlAnnotations: any[],
        cssAnnotations: any[],
        jsAnnotations: any[],
    },
    getCodes?: () => {
        html: string,
        css: string,
        js: string,
    },
}

const defaultStyle = {
    padding: 12,
};

type OwnProps = RefAttributes<HTMLDivElement> & Handlers & {
    isPreview?: boolean;
    isHTML?: boolean;
    isCSS?: boolean;
    isJS?: boolean;
    html?: string;
    css?: string;
    js?: string;
    onChangeHTML?: (value: string) => void;
    onChangeCSS?: (value: string) => void;
    onChangeJS?: (value: string) => void;
}

const AceEditor: FC<OwnProps> = forwardRef(({
    isHTML = true,
    isCSS = true,
    isJS = true,
    isPreview = true,
    onChangeHTML,
    onChangeCSS,
    onChangeJS,
    ...props
}, editorRef$: Ref<any> | null) => {
    const [htmlAnnotations, setHTMLAnnotations] = useState<any[]>([]);
    const [cssAnnotations, setCSSAnnotations] = useState<any[]>([]);
    const [jsAnnotations, setJSAnnotations] = useState<any[]>([]);
    const [html, setHTML] = useState<string>('');
    const [css, setCSS] = useState<string>('');
    const [js, setJS] = useState<string>('');

    const htmlRef = useRef<ReactAce>(null);
    const cssRef = useRef<ReactAce>(null);
    const jsRef = useRef<ReactAce>(null);

    const handlers = useMemo(() => ({
        onChangeHTML: debounce((value) => {
            setHTML(value);
            setHTMLAnnotations(htmlRef.current?.editor.getSession().getAnnotations() || []);

            if (typeof onChangeHTML === 'function') {
                onChangeHTML(value);
            }
        }, 500),

        onChangeCSS: debounce((value) => {
            setCSS(value);
            setCSSAnnotations(cssRef.current?.editor.getSession().getAnnotations() || []);

            if (typeof onChangeCSS === 'function') {
                onChangeCSS(value);
            }
        }, 500),

        onChangeJS: debounce((value) => {
            setJS(value);
            setJSAnnotations(jsRef.current?.editor.getSession().getAnnotations() || []);

            if (typeof onChangeJS === 'function') {
                onChangeJS(value);
            }
        }, 500),

        onValidateHTML: (annotations) => {
            const len = annotations.length;

            let i = annotations.length;

            while (i--) {
                if (/doctype first\. Expected/.test(annotations[i].text)) {
                    annotations.splice(i, 1);
                } else if (/Unexpected End of file\. Expected/.test(annotations[i].text)) {
                    annotations.splice(i, 1);
                }
            }

            if (len > annotations.length) {
                htmlRef.current?.editor.getSession().setAnnotations(annotations);
            }
        },

        getAnnotations: () => ({
            htmlAnnotations,
            cssAnnotations,
            jsAnnotations,
        }),

        getCodes: () => ({
            html,
            css,
            js,
        }),
    }), [
        htmlAnnotations,
        cssAnnotations,
        jsAnnotations,
        html,
        css,
        js,
    ]);

    useEffect(() => {
        setHTML(props.html);
        setCSS(props.css);
        setJS(props.js);
    }, [props.css, props.html, props.js]);

    useImperativeHandle(editorRef$, () => ({
        handlers: handlers,
    }), []);

    return (
        <Row ref={editorRef$}>
            {
                isHTML ? (
                    <Col span={12} style={defaultStyle}>
                        <Form.Item label="HTML" colon={false}>
                            <ReactAce
                                ref={htmlRef}
                                mode="html"
                                theme="github"
                                width="100%"
                                height="200px"
                                defaultValue={html}
                                value={html}
                                editorProps={{
                                    $blockScrolling: true,
                                }}
                                onChange={handlers.onChangeHTML}
                            />
                        </Form.Item>
                    </Col>
                ) : null
            }
            {
                isCSS ? (
                    <Col span={12} style={defaultStyle}>
                        <Form.Item label="CSS" colon={false}>
                            <ReactAce
                                ref={cssRef}
                                mode="css"
                                theme="github"
                                width="100%"
                                height="200px"
                                defaultValue={css}
                                value={css}
                                editorProps={{
                                    $blockScrolling: true,
                                }}
                                onChange={handlers.onChangeCSS}
                            />
                        </Form.Item>
                    </Col>
                ) : null
            }
            {
                isJS ? (
                    <Col span={12} style={defaultStyle}>
                        <Form.Item label="JS" colon={false}>
                            <ReactAce
                                ref={jsRef}
                                mode="javascript"
                                theme="github"
                                width="100%"
                                height="200px"
                                defaultValue={js}
                                value={js}
                                editorProps={{
                                    $blockScrolling: true,
                                }}
                                onChange={handlers.onChangeJS}
                            />
                        </Form.Item>
                    </Col>
                ) : null
            }
            {
                isPreview ? (
                    <Col span={12} style={defaultStyle}>
                        <Form.Item label="Preview" colon={false}>
                            <AcePreview html={html} css={css} js={js} />
                        </Form.Item>
                    </Col>
                ) : null
            }
        </Row>
    );
});

export { AceEditor };

export default AceEditor;