// React
import { FC, RefAttributes, forwardRef, useEffect, useRef, useState } from "react";
// Ant Designs
import {
    Input,
    Modal,
    Form,
} from 'antd';
// i18next
import i18n from 'i18next';
// Components
import { StyleProperty } from "../../properties";
import { Canvas } from "modules/canvas";
import { useDeepCompareEffect } from "common/hooks";

type OwnProps = RefAttributes<any> & {
    form?: any;
    visible?: boolean;
    style?: any;
    onOk?: () => void;
    onCancel?: () => void;
    validateTitle?: any;
    onChange?: (e: any, key: any, value: any) => void;
    onValid?: () => void;
};

const StyleModal: FC<OwnProps> = forwardRef(({
    form,
    visible,
    style,
    onOk,
    onCancel,
    validateTitle,
    onChange
}, styleModalRef$) => {

    const [width, setWidth] = useState(150);
    const [height, setHeight] = useState(150);

    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        waitForContainerRender(containerRef.current);
    }, []);

    useDeepCompareEffect(() => {

        if (canvasRef.current) {
            Object.keys(style).forEach(key => {
                canvasRef.current.handlers.setById('styles', key, style[key]);
            });
            return;
        }

    }, [canvasRef.current]);

    const waitForContainerRender = (container) => {
        setTimeout(() => {
            if (container) {
                setWidth(container.clientWidth);
                setHeight(container.clientHeight);

                const option = {
                    type: 'i-text',
                    text: '\uf3c5',
                    fontFamily: 'Font Awesome 5 Free',
                    fontWeight: 900,
                    fontSize: 60,
                    width: 30,
                    height: 30,
                    editable: false,
                    name: 'New marker',
                    tooltip: {
                        enabled: false,
                    },
                    left: 200,
                    top: 50,
                    id: 'styles',
                };

                canvasRef.current.handler.add(option);

                return;
            }

            waitForContainerRender(containerRef.current);
        }, 5);
    };

    return (
        <Modal onOk={onOk} onCancel={onCancel} open={visible}>
            <Form.Item
                label={i18n.t('common.title')}
                required
                colon={false}
                hasFeedback
                help={validateTitle.help}
                validateStatus={validateTitle.validateStatus}
            >
                <Input
                    value={style.title}
                    onChange={e => {
                        onChange(null, { title: e.target.value }, { ...style, title: e.target.value });
                    }}
                />
            </Form.Item>
            {StyleProperty.render(canvasRef.current, form, style)}
            <div ref={containerRef}>
                <Canvas
                    ref={canvasRef}
                    editable={false}
                    canvasOption={{ width, height, backgroundColor: '#f3f3f3' }}
                    workareaOption={{ backgroundColor: 'transparent' }}
                />
            </div>
        </Modal>
    )
});

export { StyleModal };

export default StyleModal;