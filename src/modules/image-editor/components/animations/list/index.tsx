// React
import { FC } from "react";
// Ant Design
import {
    Button,
    Avatar,
    List,
} from 'antd';
// Common Components
import { Icon } from 'common/components';

type OwnProps = {
    animations?: any[];
    onEdit?: (animation: any, index: number) => void;
    onDelete?: (index: number) => void;
};

const AnimationsList: FC<OwnProps> = ({
    animations,
    onEdit,
    onDelete,
}) => {
    return (
        <List
            dataSource={animations}
            renderItem={(animation, index) => {
                const actions = [
                    <Button
                        className="rde-action-btn"
                        shape="circle"
                        onClick={() => {
                            onEdit(animation, index);
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
                ];
                return (
                    <List.Item actions={actions}>
                        <List.Item.Meta
                            avatar={<Avatar>{index}</Avatar>}
                            title={animation.title}
                            description={animation.type}
                        />
                    </List.Item>
                );
            }}
        />
    );
}

export { AnimationsList };

export default AnimationsList;