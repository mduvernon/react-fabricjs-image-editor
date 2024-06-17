// React
import { FC, Fragment, useEffect, useRef, useState } from "react";
// Ant Design
import {
    Button,
    Modal,
    Input,
    Form,
} from 'antd';
// i18next
import i18n from 'i18next';
// Common Components
import { Icon } from '../icon';
import { useDeepCompareEffect } from "common/hooks";

type OwnProps = {
    value?: any;
    onChange?: (value: any) => void;
    form?: any;
}

const UrlModal: FC<OwnProps> = ({
    value,
    onChange,
    form,
}) => {

    const [tempUrl, setTempUrl] = useState('');
    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState(value || '');

    const handlers = useRef({
        onOk: () => {
            if (typeof onChange === 'function') {
                onChange(tempUrl);
            }

            setUrl(tempUrl);
            setVisible(false);
        },
        onCancel: () => {
            modalHandlers.current?.onHide();
        },
        onClick: () => {
            modalHandlers.current?.onShow();
        },
    });

    const modalHandlers = useRef({
        onShow: () => {
            setVisible(true);
        },
        onHide: () => {
            setVisible(false);
        },
    });

    useDeepCompareEffect(() => {
        setUrl(value || '');
    }, [value]);

    return (
        <Fragment>
            <Form.Item
                name={['url']}
                colon={false}
                label={
                    <Fragment>
                        <span style={{ marginRight: 8 }}>{i18n.t('common.url')}</span>
                        <Button onClick={handlers.current?.onClick} shape="circle" className="rde-action-btn">
                            <Icon name="edit" />
                        </Button>
                    </Fragment>
                }
                rules={
                    [
                        {
                            required: true,
                            message: i18n.t('validation.enter-property', { arg: i18n.t('common.url') }),
                        },
                    ]
                }
                initialValue={url || ''}
            >
                <span style={{ wordBreak: 'break-all' }}>{url}</span>
            </Form.Item>
            <Modal onCancel={handlers.current?.onCancel} onOk={handlers.current?.onOk} open={visible}>
                <Form.Item label={i18n.t('common.url')} colon={false}>
                    <Input
                        defaultValue={url}
                        onChange={e => setTempUrl(e.target.value)}
                    />
                </Form.Item>
            </Modal>
        </Fragment>
    );
};

export { UrlModal };

export default UrlModal;