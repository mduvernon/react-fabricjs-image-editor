// React
import { FC, useState } from 'react';
// Ant Design
import { Button } from 'antd';
// Actions
import {
    HIDE_LOADER,
    SHOW_LOADER,
} from 'common/actions';
// Common Hooks
import {
    useDeepCompareEffect,
    useProject,
    useStore
} from 'common/hooks';
// Common Components
import {
    Scrollbar,
    Carousel,
    Modal,
    Flex,
} from 'common/components';
// Components
import { ProjectsItem } from './item';
import { ProjectForm } from './form';
// Types
import { ProjectType } from 'common/type';
// Styles
import './style.scss';

const Projects: FC = () => {

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [project, setProject] = useState<ProjectType>(null);

    const {
        project: selectedProject = {},
        queryGetManyProjects,
        persistCreateProject,
        persistCloneProject,
        persistUpdateProject,
        presistDeleteProduct,
        unselectProject,
        selectProject,
    } = useProject();

    const {
        projectsData: { items: projects = [], selectionsIds } = { items: [] },
        dispatch,
        t,
    } = useStore();

    const _hideLoadingSpinner = () => {
        dispatch({ type: HIDE_LOADER });
    };

    const _handleSelectProject = (projectId: string) => {
        selectProject(projectId);
    };

    const _handleCreateProject = () => {
        unselectProject();

        setIsModalOpened(true);
    };

    const _handleUpdateProject = () => {
        setIsModalOpened(true);
    };

    const _handleCloneProject = (projectId: number | string) => {
        dispatch({ type: SHOW_LOADER });

        const selectedProject = projects.find(
            (project: ProjectType) => project.id === projectId
        );

        setTimeout(() => {
            persistCloneProject(selectedProject);
            _hideLoadingSpinner();
        }, 3);
    };

    const _handleDeleteProject = (projectId: number | string) => {
        dispatch({ type: SHOW_LOADER });

        const selectedProject = projects.find(
            (project: ProjectType) => project.id === projectId
        );

        setTimeout(() => {
            presistDeleteProduct(selectedProject.id);
            _hideLoadingSpinner();
        }, 3);
    };

    const _handleSave = () => {
        dispatch({ type: SHOW_LOADER });

        setIsModalOpened(false);

        setTimeout(() => {
            if (selectedProject?.id) {
                persistUpdateProject(project);
            } else {
                persistCreateProject(project);
            }

            _hideLoadingSpinner();
        }, 3);
    };

    const _cancelModal = () => {
        if (isModalOpened) {
            setIsModalOpened(false);
        }
    };

    const _handleProjectChange = (project: ProjectType) => {
        setProject({
            ...project,
            name: (project.name?.length > 0) ? project.name : 'Untitled',
        });
    };

    useDeepCompareEffect(() => {
        if (!(projects?.length > 0)) {
            queryGetManyProjects();
        }
    }, [projects]);

    return (
        <div className='rde-editor__tools-projects'>
            <div className='rde-editor__tools-projects-header d-flex flex-column'>
                <h2 className='title'>
                    Projects
                </h2>
                <div className='actions'>
                    <Button
                        className='create-btn'
                        onClick={_handleCreateProject}
                        color='primary'
                        icon={<i className="fas fa-solid fa-plus" />}
                    >
                        New Project
                    </Button>
                </div>
            </div>

            <Carousel className="rde-editor__tools-projects-carousel" >
                {projects?.map((project: ProjectType, index: number) => (
                    <ProjectsItem
                        isSelected={selectionsIds?.includes(project.id)}
                        onClick={_handleSelectProject}
                        onUpdate={_handleUpdateProject}
                        onClone={_handleCloneProject}
                        onDelete={_handleDeleteProject}
                        project={project}
                        key={index}
                    />
                ))}
            </Carousel>

            <Modal
                className="rde-editor__tools-projects-save-modal"
                title={
                    <>{project?.id ? 'Update project' : 'Add new project'}</>
                }
                Icon={(props: any) => (<i className="fa-solid fa-folder-plus"></i>)}
                isOpened={isModalOpened}
                onCancel={_cancelModal}
                onDone={_handleSave}
                doneLabel={t('save')}
                cancelLabel={t('cancel')}
                doneButtonColor="primary"
                zIndex={11110}
            >
                <div
                    className="rde-editor__tools-projects-save-modal-content"
                >
                    <ProjectForm
                        project={selectedProject}
                        onChange={_handleProjectChange}
                    />
                </div>
            </Modal>
        </div>
    );
};

export { Projects }

export default Projects;
