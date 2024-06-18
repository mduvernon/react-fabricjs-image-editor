// Reacts
import { FC, Fragment, useMemo, useRef, useState } from "react";
// Ant Design
import {
    notification,
    Button,
    Modal,
    Form,
} from 'antd';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Components
import { AceEditor } from '../editor';
import { Icon } from "../../icon";

notification.config({
    top: 80,
    duration: 1,
});

type OwnProps = {
    value?: any;
    onChange?: (value: any) => void;
    form?: any;
}

const AceModal: FC<OwnProps> = ({
    value,
    onChange,
    form,
    ...props
}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [code, setCode] = useState<any>(value || { html: '', css: '', js: '' });

    const aceRef = useRef<any>(null);

    const handler = useMemo(() => ({
        onOk: () => {
            const code = aceRef.current.handlers.getCodes();

            if (typeof onChange === 'function') {
                onChange(code);
            }

            setCode(code);
            setVisible(false);
        },
        onCancel: () => {
            modalHandlers?.onHide();
        },
        onClick: () => {
            modalHandlers?.onShow();
        },
    }), [onChange]);

    const modalHandlers = useMemo(() => ({
        onShow: () => {
            setVisible(true);
        },

        onHide: () => {
            setVisible(false);
        },
    }), []);

    useDeepCompareEffect(() => {
        setCode(value || { html: '', css: '', js: '' });
    }, [value]);

    const { html, css, js } = code;

    return (
        <Fragment>
            <Form.Item
                name={['code']}
                label={
                    <Fragment>
                        <span style={{ marginRight: 8 }}>Code Editor</span>
                        <Button onClick={handler.onClick} shape="circle">
                            <Icon name="code" />
                        </Button>
                    </Fragment>
                }
                colon={false}
                initialValue={''}
                rules={[
                    {
                        required: true,
                        message: 'Please input code',
                    }]
                }
            >
                <span />
            </Form.Item>

            <Form.Item label="HTML" colon={false}
                name={['html']}
                initialValue={html || ''}
            >
                <pre style={{ wordBreak: 'break-all', lineHeight: '1.2em' }}>{html}</pre>
            </Form.Item>

            <Form.Item label="CSS" colon={false}
                name={['css']}
                initialValue={css || ''}
            >
                <pre style={{ wordBreak: 'break-all', lineHeight: '1.2em' }}>{css}</pre>
            </Form.Item>

            <Form.Item label="JS" colon={false}
                name={['js']}
                initialValue={js || ''}
            >
                <pre style={{ wordBreak: 'break-all', lineHeight: '1.2em' }}>{js}</pre>
            </Form.Item>

            <Modal onCancel={handler.onCancel} onOk={handler.onOk} open={visible} width="80%">
                <AceEditor
                    ref={aceRef}
                    html={html}
                    css={css}
                    js={js}
                />
            </Modal>
        </Fragment>
    )
}

export { AceModal }

export default AceModal;