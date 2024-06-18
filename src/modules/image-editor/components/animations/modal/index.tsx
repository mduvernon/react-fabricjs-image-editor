// React
import { FC, RefAttributes, forwardRef, useRef, useState } from "react";
// Ant Design
import {
    Input,
    Modal,
    Form,
} from 'antd';
// i18next
import i18n from 'i18next';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Components
import { AnimationProperty } from "../../properties";
import { Canvas } from 'modules/canvas';

type OwnProps = RefAttributes<any> & {
    form?: any;
    visible?: boolean;
    animation?: any;
    onOk?: () => void;
    onCancel?: () => void;
    validateTitle?: any;
    onChange?: (id: string, value: any, validate: any) => void;
    onValid?: (id: string, value: any) => void;
}

const AnimationsModal: FC<OwnProps> = forwardRef(({
    form,
    visible,
    animation,
    onOk,
    onCancel,
    validateTitle,
    onChange,
    onValid,
}, animationModalRef$) => {
    const [height, setHeight] = useState<number>(150);
    const [width, setWidth] = useState<number>(150);

    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useDeepCompareEffect(() => {

        if (canvasRef.current) {
            canvasRef.current.handlers.setById('animations', 'animation', animation);
        }

    }, [canvasRef.current]);

    useDeepCompareEffect(() => {

        if (containerRef.current) {
            setWidth(containerRef.current.clientWidth);
            setHeight(containerRef.current.clientHeight);

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
                id: 'animations',
                fill: 'rgba(0, 0, 0, 1)',
                stroke: 'rgba(255, 255, 255, 0)',
            };

            canvasRef.current?.handler.add(option);
        }

    }, [containerRef.current]);

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
                    value={animation.title}
                    onChange={e => {
                        onChange(
                            null,
                            { animation: { title: e.target.value } },
                            { animation: { ...animation, title: e.target.value } },
                        );
                    }}
                />
            </Form.Item>
            {AnimationProperty.render(canvasRef, form, { animation, id: 'animations' })}
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

export { AnimationsModal };

export default AnimationsModal;