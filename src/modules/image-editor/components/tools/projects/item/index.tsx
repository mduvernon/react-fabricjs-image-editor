// React
import { FC, MouseEvent, useState } from "react";
// Ant Design
import { Button, Dropdown, Space } from 'antd';
// Material-UI
// Types
import { ProjectType } from "common/type";
// Styles
import "./style.scss";

type OwnProps = {
    onClick: (projectId: number | string, event?: MouseEvent<HTMLDivElement>) => void,
    onUpdate?: (projectId: number | string, event?: MouseEvent<HTMLAnchorElement>) => void,
    onClone?: (projectId: number | string, event?: MouseEvent<HTMLAnchorElement>) => void,
    onDelete?: (projectId: number | string, event?: MouseEvent<HTMLAnchorElement>) => void,
    project: ProjectType,
    isSelected?: boolean
}

const ProjectsItem: FC<OwnProps> = ({
    isSelected = false,
    project,
    onClick,
    onUpdate,
    onClone,
    onDelete,
}) => {

    const { name, image } = project;

    const _handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (typeof onClick === 'function') {
            onClick(project.id, event);
        }
    }

    const _handleUpdate = (event: MouseEvent<HTMLAnchorElement>) => {
        if (typeof onUpdate === 'function') {
            onUpdate(project.id, event);
        }
    }

    const _handleClone = (event: MouseEvent<HTMLAnchorElement>) => {
        if (typeof onClone === 'function') {
            onClone(project.id, event);
        }
    }

    const _handleDelete = (event: MouseEvent<HTMLAnchorElement>) => {
        if (typeof onDelete === 'function') {
            onDelete(project.id, event);
        }
    }

    return (
        <div className={`rde-editor__tools-project-item d-flex flex-column ${isSelected ? 'selected' : ''}`}
            aria-selected={isSelected}
            onClick={_handleClick}
        >
            <div className="rde-editor__tools-project-item-header d-flex flex-row">
                <div className="actions">
                    <Dropdown
                        className="rde-editor__tools-project-item-dropdown"
                        placement="bottom"
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    icon: <i className="fas fa-solid fa-pen" />,
                                    label: (
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={_handleUpdate}
                                        >
                                            Update
                                        </a>
                                    ),
                                },
                                {
                                    key: '2',
                                    icon: <i className="fas fa-solid fa-clone" />,
                                    label: (
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={_handleClone}
                                        >
                                            Clone
                                        </a>
                                    ),
                                },
                                {
                                    key: '3',
                                    icon: <i className="fas fa-solid fa-trash" />,
                                    label: (
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={_handleDelete}
                                        >
                                            Delete
                                        </a>
                                    ),
                                },
                            ]
                        }} >
                        <Button icon={<i className="fas fa-solid fa-bars" />}></Button>
                    </Dropdown>
                </div>
            </div>
            <div className="rde-editor__tools-project-item-img-wrapper">
                {Boolean(image?.src) && (
                    <img
                        className="rde-editor__tools-project-item-img"
                        src={image?.src}
                        alt={name}
                    />
                )}
            </div>
            <div className="rde-editor__tools-project-item-footer">
                <span dangerouslySetInnerHTML={{ __html: name }} />
            </div>
        </div>
    );
}

export { ProjectsItem };

export default ProjectsItem;