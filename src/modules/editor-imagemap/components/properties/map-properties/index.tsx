// React
import { FC, useState } from "react";
// Ant Designs
import {
    Collapse,
    Form,
} from 'antd';
// Common Components
import {
    Scrollbar,
} from 'common/components';
// Properties
import {
    PropertyDefinition
} from "../property-definition";

type OwnProps = {
    canvasRef?: any;
    selectedItem?: any;
    onChange?: (e: any, key: any, value: any) => void;
};

const MapProperties: FC<OwnProps> = ({
    canvasRef,
    selectedItem,
    onChange,
}) => {

    const [showArrow, setShowArrow] = useState(false);

    const [form] = Form.useForm();

    const _handleFormValuesChange = (changedValues: any, values: any) => {
        if (typeof onChange === 'function') {
            onChange(selectedItem, changedValues, { workarea: values });
        }
    };

    return Boolean(canvasRef.current) ? (
        <Scrollbar>
            <Form form={form} layout="horizontal" colon={false} onValuesChange={_handleFormValuesChange}>
                <Collapse bordered={false}
                    items={Object.keys(PropertyDefinition.map).map((key) => ({
                        key,
                        label: PropertyDefinition?.map[key].title,
                        showArrow,
                        children: PropertyDefinition.map[key]?.component.render(
                            canvasRef,
                            form,
                            canvasRef.current?.handler?.workarea,
                        )
                    }))}
                />
            </Form>
        </Scrollbar>
    ) : null;
};

export { MapProperties }

export default MapProperties;
