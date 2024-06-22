// React
import { FC, useState } from 'react';
// Editor Modules
import Editor from 'editor';
// Constants
import { projectsList } from 'modules/example/constants';
// Types
import { ProjectType, PageType, ObjectDataType } from 'common/type';
// Utils
import { randomId } from 'common/utils';

const ExempleImageEditor: FC = () => {
    const [isImgEditorShown, setIsImgEditorShown] = useState(false);

    const openImgEditor = () => {
        setIsImgEditorShown(true);
    };

    const closeImgEditor = () => {
        setIsImgEditorShown(false);
    };

    return (
        <>
            <Editor
                onClose={closeImgEditor}
                Projects={{
                    getMany: async (): Promise<{ items: any[]; totalCount: number }> => {
                        return { items: projectsList, totalCount: projectsList.length };
                    },
                    create: async (project: ProjectType) => {
                        console.log('create', project);
                        project.id = randomId('Project');
                        return project;
                    },
                    update: async (projectId: string | number, project: ProjectType) => {
                        console.log('update', project);
                        return project;
                    },
                    delete: async (projectId: string | number) => {
                        console.log('delete', projectId);
                        return projectId;
                    },
                }}
            />
        </>
    );
}

export { ExempleImageEditor }