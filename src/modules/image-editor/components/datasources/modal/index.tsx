// React
import { FC, RefAttributes, forwardRef, useRef, useState } from "react";
// Ant Designs
import {
    Modal,
    Input,
    Form,
} from 'antd';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Components
import { Canvas } from "modules/canvas";
import {
    DataSourceProperty
} from "../../properties";

type OwnProps = RefAttributes<any> & {
    form?: any;
    visible?: boolean;
    animation?: any;
    onOk?: () => void;
    onCancel?: () => void;
    validateTitle?: any;
    dataSource?: any;
    onChange?: (e: any, key: any, value: any) => void;
    onValid?: (value: any) => any;
}

const DataSourceModal: FC<OwnProps> = forwardRef(({
    form,
    visible,
    animation,
    onOk,
    onCancel,
    validateTitle,
    dataSource,
    onChange,
    onValid
}, dataSourceModalRef$) => {

    const [width, setWidth] = useState(150)
    const [height, setHeight] = useState(150)

    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useDeepCompareEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.clientWidth)
            setHeight(containerRef.current.clientHeight)
        }
    }, [containerRef?.current]);

    return (

        <Modal onOk={onOk} onCancel={onCancel} open={visible}>
            <Form.Item
                label="Title"
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
            {DataSourceProperty.render(canvasRef, form, { animation })}
            <div ref={containerRef}>
                <Canvas ref={canvasRef}
                    editable={false}
                    width={width}
                    height={height}
                />
            </div>
        </Modal>
    )
});

export { DataSourceModal }

export default DataSourceModal;