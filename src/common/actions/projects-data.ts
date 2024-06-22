
// Libs
import deepEqual from "fast-deep-equal";
// Utils
import { randomId } from 'common/utils';
// Types
import {
    ProjectsDataType,
    ProjectType,
} from "common/type";

export const CLEAR_PROJECTS_SELECTIONS = 'CLEAR_PROJECTS_SELECTIONS';
export const DUPLICATE_PROJECTS = 'DUPLICATE_PROJECTS';
export const QUERY_GET_MANY_PROJECTS_SUCCESS = 'QUERY_GET_MANY_PROJECTS_SUCCESS';
export const PERSIST_CREATE_PROJECT_SUCCESS = 'PERSIST_CREATE_PROJECT_SUCCESS';
export const PERSIST_UPDATE_PROJECT_SUCCESS = 'PERSIST_UPDATE_PROJECT_SUCCESS';
export const PERSIST_DELETE_PROJECT_SUCCESS = 'PERSIST_DELETE_PROJECT_SUCCESS';
export const QUERY_GET_ONE_PROJECT_SUCCESS = 'QUERY_GET_ONE_PROJECT_SUCCESS';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const REMOVE_PROJECTS = 'REMOVE_PROJECTS';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const UNSELECT_PROJECT = 'UNSELECT_PROJECT';
export const UPDATE_PROJECT_DATA = 'UPDATE_PROJECT_DATA';
export const CLEAR_PROJECT_DATA = 'CLEAR_PROJECT_DATA';
export const ADD_PROJECTS_DATA = 'ADD_PROJECTS_DATA';
export const SET_PROJECTS_DATA = 'SET_PROJECTS_DATA';
export const ADD_PROJECT_DATA = 'ADD_PROJECT_DATA';
export const SET_PROJECT = 'SET_PROJECT';

export const queryGetManyProjectsSuccess = (state: { projectsData: ProjectsDataType }, payload: { projectsData?: ProjectsDataType, accumulate?: boolean } = {}) => {
    const {
        projectsData: oldProjectsData,
    } = state;

    const {
        projectsData,
        accumulate = false,
    } = payload;

    return {
        ...state,
        projectsData: accumulate ? {
            ...oldProjectsData,
            items: [
                ...(oldProjectsData.items || []),
                ...(projectsData?.items || []),
            ],
            totalCount: projectsData?.totalCount || 0,
        } : projectsData,
    };
};

export const queryGetOneProjectSuccess = (state: { projectsData: ProjectsDataType }, payload: { project: ProjectType }) => {
    const {
        projectsData,
    } = state;

    const {
        project,
    } = payload;

    if (!Boolean(project)) {
        return state;
    }

    // Replace or add projectData to the state items collection
    const hasProjectData = projectsData.items?.some((projectData) => projectData.id === project.id);

    if (hasProjectData) {
        projectsData.items = projectsData.items?.map(
            (p) => (p.id === project.id) ? project : p
        );
    } else {
        projectsData.items?.push(project);
    }

    return {
        ...state,
        projectsData,
    };
};

export const persistCreateProjectSuccess = (state: { projectsData: ProjectsDataType }, payload: { project: ProjectType }) => {
    const {
        project
    } = payload;

    if (!Boolean(project)) {
        return state;
    }

    return setProject(state, { project });
};

export const persistUpdateProjectSuccess = (state: { projectsData: ProjectsDataType }, payload: { id: string, project: ProjectType }) => {
    const {
        project
    } = payload;

    if (!Boolean(project)) {
        return state;
    }

    return setProject(state, { project });
};

export const persistDeleteProjectSuccess = (state: { projectsData: ProjectsDataType }, payload: { id: string }) => {
    const {
        projectsData,
    } = state;

    const {
        id
    } = payload;

    projectsData.items = projectsData.items?.filter(
        (project) => project.id !== id
    );

    return {
        ...state,
        projectsData,
    };
};

export const clearProjectsSelections = (state: { projectsData: ProjectsDataType }) => {
    const {
        projectsData: { selectionsIds } = { selectionsIds: [] }
    } = state;

    return (
        selectionsIds?.length === 0
            ? state
            : {
                ...state,
                projectsData: {
                    ...state.projectsData,
                    selectionsIds: [],
                },
            }
    )
}

export const duplicateProjects = (state: { projectsData: ProjectsDataType }, payload: { projectsIds: number[], dismissHistory: boolean }) => {
    const {
        projectsData
    } = state;

    const {
        projectsIds
    } = payload;

    const duplicatedProjectsData: ProjectType[] = [];

    projectsIds.forEach((id: number | string) => {
        const projectData = projectsData.items?.find((p) => p.id === id);

        if (projectData) {
            const clonedProjectDataId = randomId(projectData.name);

            duplicatedProjectsData.push({
                ...projectData,
                id: clonedProjectDataId,
            });
        }
    });

    return {
        ...state,
        // not stored in state, used in reducer to consider in undo/redo stacks
        isDesignState: !payload.dismissHistory,
        projectsData: {
            ...projectsData,
            items: [
                ...projectsData.items,
                ...duplicatedProjectsData,
            ],
        },
    };
};

export const removeProjects = (
    state: { projectsData: ProjectsDataType },
    payload: { projectsIds: (number | string)[] }
) => {
    const {
        projectsData
    } = state;

    const {
        projectsIds,
    } = payload;

    let newSelectionsIds = projectsData.selectionsIds || [];

    projectsIds.forEach((id: number | string) => {
        newSelectionsIds = newSelectionsIds.filter(
            (selectionId) => selectionId !== id,
        );

        projectsData.items = projectsData.items?.filter(
            (projectData) => projectData.id !== id
        );
    });

    return {
        ...state,
        projectsData: {
            ...projectsData,
            selectionsIds: newSelectionsIds,
        },
    };
};

export const selectProject = (state: { projectsData: ProjectsDataType }, payload: { projectId: number, multiple: boolean }) => {
    const {
        projectsData: { selectionsIds }
    } = state;

    const {
        projectId,
        multiple = false,
    } = payload;

    if (
        selectionsIds?.length === 1 &&
        selectionsIds[0] === projectId
    ) {
        return state;
    }

    let newSelectionsIds: (number | string)[] = [];

    if (multiple) {
        newSelectionsIds = selectionsIds?.filter(
            (id) => id !== payload.projectId,
        );

        const wasProjectDataAlreadySelected = newSelectionsIds.length !== selectionsIds?.length;

        if (!wasProjectDataAlreadySelected) {
            newSelectionsIds.push(payload.projectId);
        }
    } else {
        newSelectionsIds = [payload.projectId];
    }

    return {
        ...state,
        projectsData: {
            ...state.projectsData,
            selectionsIds: newSelectionsIds,
        },
    };
};

export const unselectProject = (state: { projectsData: ProjectsDataType }, payload: {}) => {
    const {
        projectsData: { selectionsIds }
    } = state;


    if (selectionsIds?.length === 0) {
        return state;
    }

    return {
        ...state,
        projectsData: {
            ...state.projectsData,
            selectionsIds: [],
        },
    };
};

export const setProjectsData = (state: { projectsData: ProjectsDataType }, payload: { projectsData?: ProjectsDataType, dismissHistory?: boolean, replaceCurrent?: boolean }) => {
    // dismissHistory is used to prevent considering this change in history (undo/redo).
    const {
        dismissHistory = false,
        projectsData,
    } = payload;

    const {
        projectsData: stateProjectsData
    } = state;

    // If projectData not changed don't update it.
    if (
        deepEqual(stateProjectsData, projectsData)
    ) {
        return state;
    }

    return {
        ...state,
        isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
        projectsData: {
            ...state.projectsData,
            ...projectsData,
        },
    };
};

export const setProject = (state: { projectsData: ProjectsDataType }, payload: { project?: ProjectType, dismissHistory?: boolean, replaceCurrent?: boolean }) => {
    // dismissHistory is used to prevent considering this change in history (undo/redo).
    const {
        dismissHistory = false,
        project,
    } = payload;

    const {
        projectsData
    } = state;

    const projectId = project?.id ?? randomId(project?.name);

    const existedProject = projectsData.items?.find((p) => p.id === projectId);

    // If Project not changed don't update it.
    if (
        existedProject && deepEqual(existedProject, project)
    ) {
        return state;
    }

    // Update or add Project to the state items collection
    const newProject = {
        ...project,
        id: projectId,
    };

    const hasProject = projectsData.items?.some((p) => p.id === projectId);

    if (hasProject) {
        projectsData.items = projectsData.items?.map(
            (p) => (p.id === projectId) ? newProject : p
        );
    } else {
        projectsData.items?.push(newProject);
    }

    return {
        ...state,
        isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
        projectsData: {
            ...state.projectsData,
            items: projectsData.items,
        },
    };
};

export const clearProjectData = (state: any) => {
    return {
        ...state,
        projectsData: {},
    };
};