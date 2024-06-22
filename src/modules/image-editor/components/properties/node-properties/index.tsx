// React
import { FC, useState } from "react";
// Ant Designs
import {
    Collapse,
    Form,
    List
} from 'antd';
// Common Components
import {
    Scrollbar,
    Flex
} from 'common/components';
// Properties
import {
    PropertyDefinition
} from "../property-definition";
import { useDeepCompareEffect } from "common/hooks";

type OwnProps = {
    canvasRef: any;
    selectedItem: any;
    onChange: (e: any, key: any, value: any) => void;
};

const NodeProperties: FC<OwnProps> = ({
    canvasRef,
    selectedItem,
    onChange,
}) => {

    const [showArrow, setShowArrow] = useState(false);

    const [form] = Form.useForm();

    const _handleFormValuesChange = (changedValues: any, values: any) => {
        if (typeof onChange === 'function') {
            onChange(selectedItem, changedValues, values);
        }
    };

    return (
        <Scrollbar>
            <Form form={form} className="rde-editor-node-properties" layout="vertical" colon={false} onValuesChange={_handleFormValuesChange}>
                <Collapse className="rde-editor-node-properties-collapse" bordered={false}
                    items={selectedItem && PropertyDefinition[selectedItem?.type] ? (
                        Object.keys(PropertyDefinition[selectedItem.type]).map(key => ({
                            className: 'rde-editor-node-properties-collapse-item',
                            key,
                            label: PropertyDefinition[selectedItem.type][key].title,
                            showArrow,
                            children: PropertyDefinition[selectedItem.type][key].component.render(
                                canvasRef,
                                form,
                                selectedItem,
                            )
                        }))
                    ) : ([{
                        className: 'rde-editor-node-properties-collapse-item',
                        key: 'default',
                        label: 'Default',
                        showArrow,
                        children: (
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    color: 'rgba(0, 0, 0, 0.45)',
                                    fontSize: 16,
                                    padding: 16,
                                }}
                            >
                                <List />
                            </Flex>
                        )
                    }])}
                />
            </Form>
        </Scrollbar>
    );
};

export { NodeProperties }

export default NodeProperties;
