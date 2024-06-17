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
    styles: any[];
    onEdit: (style: any, index: number) => void;
    onDelete: (index: number) => void;
};

const StyleList: FC<OwnProps> = ({
    styles,
    onEdit,
    onDelete
}) => {

    return (

        <List
            dataSource={styles}
            renderItem={(style, index) => {
                const actions = [
                    <Button
                        className="rde-action-btn"
                        shape="circle"
                        onClick={() => {
                            onEdit(style, index);
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
                const description = `fill: ${style.fill}, opacity: ${style.opacity}`;
                return (
                    <List.Item actions={actions}>
                        <List.Item.Meta
                            avatar={<Avatar>{index}</Avatar>}
                            title={style.title}
                            description={description}
                        />
                    </List.Item>
                );
            }}
        />
    )
};

export { StyleList };

export default StyleList;