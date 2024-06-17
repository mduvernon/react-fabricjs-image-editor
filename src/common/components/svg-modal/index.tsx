// React
import { FC, useEffect, useState } from "react";
// Ant Design
import {
    Modal,
    Form,
    Radio
} from 'antd';
// i18next
import i18n from 'i18next';
// Common Components
import { FileUpload } from '../file-upload';
import { InputHTML } from '../input-html';
import { useDeepCompareEffect } from "common/hooks";

type OwnProps = {
    visible: boolean;
    onOk: (values: any[]) => void;
    onCancel: () => void;
    option?: any;
}

const SVGModal: FC<OwnProps> = ({
    onOk,
    onCancel,
    ...props
}) => {
    const [loadType, setLoadType] = useState('file');
    const [visible, setVisible] = useState(false);

    useDeepCompareEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);

    const [form] = Form.useForm();

    const _handleChangeSvgType = (e: any) => {
        form.resetFields();

        setLoadType(e.target.value);
    };

    const _handleOk = () => {
        form.validateFields().then((values: any) => {
            // if (err) {
            //     return;
            // }

            if (values.svg instanceof Blob) {
                const reader = new FileReader();

                reader.readAsDataURL(values.svg);

                reader.onload = () => {
                    onOk({ ...values, svg: reader.result });
                };
            } else {
                onOk(values);
            }

            return [];
        });
    };

    const _handleCancel = () => {
        if (typeof onCancel === 'function') {
            onCancel();
            return;
        }

        setVisible(false);
    };

    return (
        <Modal
            title={i18n.t('imagemap.svg.add-svg')}
            closable
            onCancel={_handleCancel}
            onOk={_handleOk}
            open={visible}
        >
            <Form
                form={form}
                colon={false}
            >
                <Form.Item label={i18n.t('common.type')}
                    initialValue={loadType}
                >
                    <Radio.Group onChange={_handleChangeSvgType}>
                        <Radio.Button value="file">{i18n.t('common.file')}</Radio.Button>
                        <Radio.Button value="svg">{i18n.t('common.svg')}</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={loadType === 'svg' ? i18n.t('common.svg') : i18n.t('common.file')}
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.enter-property', {
                                arg: loadType === 'svg' ? i18n.t('common.svg') : i18n.t('common.file'),
                            }),
                        },
                    ]}
                >
                    {(loadType === 'svg' ? (
                        <InputHTML />
                    ) : (
                        <FileUpload accept=".svg" />
                    ))}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export { SVGModal };

export default SVGModal;