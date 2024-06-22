// React
import { MouseEvent, SyntheticEvent, useCallback, useMemo, useState } from "react";
// Actions
import {
    QUERY_GET_MANY_PROJECTS_SUCCESS,
    PERSIST_CREATE_PROJECT_SUCCESS,
    PERSIST_UPDATE_PROJECT_SUCCESS,
    PERSIST_DELETE_PROJECT_SUCCESS,
    UNSELECT_PROJECT,
    REMOVE_PROJECTS,
    SELECT_PROJECT,
    SET_PROJECT,
} from "common/actions";
// Hooks
import { useDeepCompareEffect } from "../use-deep-compare-effect";
import { useObjectData } from "../use-object-data";
import { useStore } from "../use-store";
// Type
import { ProjectType, QueryType } from "common/type";
// Utils
import { randomId } from "common/utils";

export const TAB_ID = "projectId";

type OverridenProjectsDataType = ProjectType & { shouldSave?: boolean; neverSave?: boolean };

const useProject = () => {
    const {
        projectsData: { selectionsIds, items },
        services: { projects: projectsApi },
        dispatch,
    } = useStore();

    const [project, setProject] = useState<OverridenProjectsDataType>(() => ({
        ...(items?.find((p) => p.id === selectionsIds?.[0]) ?? items[0]),
    }));

    const { saveObjectsDataCollection } = useObjectData();

    const saveStateProject = useCallback((project: ProjectType) => {
        dispatch({
            type: SET_PROJECT,
            payload: { project },
        });
    }, []);

    const queryGetManyProjects = useCallback((query?: QueryType) => {
        projectsApi.getMany(query).then(({ items, totalCount }) => {
            dispatch({
                type: QUERY_GET_MANY_PROJECTS_SUCCESS,
                payload: { projectsData: { items, totalCount, query } },
            });
        });
    }, []);

    const persistCreateProject = useCallback((project: ProjectType) => {
        project = structuredClone(project);

        projectsApi.create(project).then((project: ProjectType) => {
            dispatch({
                type: PERSIST_CREATE_PROJECT_SUCCESS,
                payload: { project },
            });

            selectProject(project.id);
        });
    }, []);

    const persistCloneProject = useCallback((project: ProjectType) => {
        project = structuredClone(project);

        project.name = `${project.name} (copy)`;

        delete project.id;

        for (const key in project.pages) {
            const page = project.pages[key];

            page.id = randomId(page.name);

            for (const keyJ in page.objects) {
                const object = page.objects[keyJ];

                if (object.id !== 'workarea') {
                    object.id = randomId(object.type);
                } else {
                    object.id = 'workarea';
                }
            }
        }

        projectsApi.create(project).then((project: ProjectType) => {
            dispatch({
                type: PERSIST_CREATE_PROJECT_SUCCESS,
                payload: { project },
            });

            selectProject(project.id);
        });
    }, []);

    const persistUpdateProject = useCallback((project: ProjectType) => {
        projectsApi.update(project.id, project).then((project: ProjectType) => {
            dispatch({
                type: PERSIST_UPDATE_PROJECT_SUCCESS,
                payload: { id: project?.id, project },
            });

            selectProject(project.id);
        });
    }, []);

    const presistDeleteProduct = useCallback((projectId: string) => {
        projectsApi.delete(projectId).then(() => {
            dispatch({
                type: PERSIST_DELETE_PROJECT_SUCCESS,
                payload: { id: projectId },
            });

            unselectProject();
        });
    }, []);

    const selectProject = useCallback((id: string | number, event?: MouseEvent<HTMLDivElement>) => {
        const project = items?.find((p) => p.id === id);

        setProject((prev) => ({
            ...prev,
            ...project,
        }));

        dispatch({
            type: SELECT_PROJECT,
            payload: { projectId: id },
        });
    }, [items]);

    const unselectProject = useCallback((event?: MouseEvent<HTMLDivElement>) => {
        setProject((prev) => ({
            shouldSave: prev.shouldSave,
            neverSave: prev.neverSave,
        }));

        dispatch({
            type: UNSELECT_PROJECT,
            payload: {},
        });
    }, [items]);

    const createProject = useCallback((project: ProjectType, event?: SyntheticEvent) => {
        const newProjectId = project?.id ?? randomId(project?.name ?? "New Project");

        dispatch({
            type: SET_PROJECT,
            payload: {
                project: {
                    ...project,
                    id: newProjectId,
                }
            },
        });

        selectProject(newProjectId);
    }, []);

    const removeProject = useCallback((projectId: string, event?: SyntheticEvent) => {
        const project = items.find((p) => (p.id === projectId));
        const projectToSelect = items[0];

        dispatch({
            type: REMOVE_PROJECTS,
            payload: {
                projectsIds: [project?.id],
            },
        });

        selectProject(projectToSelect?.id);
    }, []);

    useDeepCompareEffect(() => {
        const {
            shouldSave,
            neverSave,
            ...savableProject
        } = project ?? {};

        const selection = (selectionsIds?.length === 1) && items?.find((p) => (p.id === selectionsIds[0]));

        if (!neverSave && (shouldSave || selection)) {
            saveStateProject({
                ...savableProject,
                id: shouldSave ? savableProject.id : selection.id,
            });
        }

        const pagesData = project?.pages ?? [];
        const currentPageData = pagesData[0];

        saveObjectsDataCollection(currentPageData?.objects ?? [])
    }, [project]);

    useDeepCompareEffect(() => {
        // setTimeout to make the state changes after the stageData is drawn not before.
        setTimeout(() => {
            if (selectionsIds?.length === 1) {
                const project = items?.find((p) => (p.id === selectionsIds[0]));

                setProject({
                    ...(project ?? {}),
                    neverSave: true
                });
            }
        });
    }, [selectionsIds, items]);

    return useMemo(() => ({
        project,
        selectProject,
        unselectProject,
        createProject,
        removeProject,
        queryGetManyProjects,
        persistCreateProject,
        persistCloneProject,
        persistUpdateProject,
        presistDeleteProduct,
    }), [
        project,
        selectProject,
        unselectProject,
        createProject,
        removeProject,
        queryGetManyProjects,
        persistCreateProject,
        persistCloneProject,
        persistUpdateProject,
        presistDeleteProduct,
    ]);
};

export { useProject };

export default useProject;
