// React
import { FC } from "react";
// Ant Designs
import {
    Button,
    Avatar,
    List,
} from 'antd';
// Common Components
import { Icon } from "common/components";

type OwnProps = {
    dataSources?: any[];
    onEdit?: (dataSource: any, index: number) => void;
    onDelete?: (index: number) => void;
};

const DataSourceList: FC<OwnProps> = ({
    dataSources,
    onEdit,
    onDelete
}) => {

    return (
        <List
            dataSource={dataSources}
            renderItem={(dataSource, index) => (
                <List.Item
                    actions={[
                        <Button
                            className="rde-action-btn"
                            shape="circle"
                            onClick={() => {
                                onEdit(dataSource, index);
                            }}
                        >
                            <Icon name="edit" />
                        </Button>,
                        <Button
                            className="rde-action-btn"
                            shape="circle"
                            onClick={() => {
                                onDelete(index);
                            }}
                        >
                            <Icon name="times" />
                        </Button>,
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar>{index}</Avatar>}
                        title={dataSource.title}
                        description={dataSource.type}
                    />
                </List.Item>
            )}
        />
    )
};

export { DataSourceList };

export default DataSourceList;