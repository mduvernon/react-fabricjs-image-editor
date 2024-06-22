import showLoader, { SHOW_LOADER } from './show-loader';
import hideLoader, { HIDE_LOADER } from './hide-loader';
import {
    CLEAR_OBJECTS_DATA_SELECTIONS,
    DUPLICATE_OBJECTS_DATA,
    REMOVE_OBJECTS_DATA,
    SELECT_OBJECT_DATA,
    UPDATE_OBJECT_DATA,
    CLEAR_OBJECTS_DATA,
    ADD_OBJECTS_DATA,
    SET_OBJECTS_DATA,
    SET_OBJECT_DATA,
    ADD_OBJECT_DATA,
    clearObjectsDataSelections,
    duplicateObjectsData,
    removeObjectsData,
    selectObjectData,
    updateObjectData,
    clearObjectsData,
    addObjectsData,
    addObjectData,
    setObjectData,
    setObjectsData,
} from './objects-data'
import {
    CLEAR_PROJECTS_SELECTIONS,
    QUERY_GET_MANY_PROJECTS_SUCCESS,
    PERSIST_CREATE_PROJECT_SUCCESS,
    PERSIST_UPDATE_PROJECT_SUCCESS,
    PERSIST_DELETE_PROJECT_SUCCESS,
    QUERY_GET_ONE_PROJECT_SUCCESS,
    DUPLICATE_PROJECTS,
    REMOVE_PROJECTS,
    SELECT_PROJECT,
    CLEAR_PROJECT_DATA,
    SET_PROJECTS_DATA,
    SET_PROJECT,
    clearProjectsSelections,
    duplicateProjects,
    removeProjects,
    unselectProject,
    selectProject,
    clearProjectData,
    setProjectsData,
    queryGetManyProjectsSuccess,
    persistCreateProjectSuccess,
    persistUpdateProjectSuccess,
    persistDeleteProjectSuccess,
    queryGetOneProjectSuccess,
    setProject,
    UNSELECT_PROJECT,
} from './projects-data'

export const actions: any = {
    [HIDE_LOADER]: hideLoader,
    [SHOW_LOADER]: showLoader,

    // Object Data actions...
    [CLEAR_OBJECTS_DATA_SELECTIONS]: clearObjectsDataSelections,
    [DUPLICATE_OBJECTS_DATA]: duplicateObjectsData,
    [REMOVE_OBJECTS_DATA]: removeObjectsData,
    [SELECT_OBJECT_DATA]: selectObjectData,
    [UPDATE_OBJECT_DATA]: updateObjectData,
    [CLEAR_OBJECTS_DATA]: clearObjectsData,
    [ADD_OBJECTS_DATA]: addObjectsData,
    [ADD_OBJECT_DATA]: addObjectData,
    [SET_OBJECTS_DATA]: setObjectsData,
    [SET_OBJECT_DATA]: setObjectData,
    // End of Object Data actions.

    // Project Data actions...
    [CLEAR_PROJECTS_SELECTIONS]: clearProjectsSelections,
    [QUERY_GET_MANY_PROJECTS_SUCCESS]: queryGetManyProjectsSuccess,
    [PERSIST_CREATE_PROJECT_SUCCESS]: persistCreateProjectSuccess,
    [PERSIST_UPDATE_PROJECT_SUCCESS]: persistUpdateProjectSuccess,
    [PERSIST_DELETE_PROJECT_SUCCESS]: persistDeleteProjectSuccess,
    [QUERY_GET_ONE_PROJECT_SUCCESS]: queryGetOneProjectSuccess,
    [DUPLICATE_PROJECTS]: duplicateProjects,
    [REMOVE_PROJECTS]: removeProjects,
    [UNSELECT_PROJECT]: unselectProject,
    [SELECT_PROJECT]: selectProject,
    [CLEAR_PROJECT_DATA]: clearProjectData,
    [SET_PROJECTS_DATA]: setProjectsData,
    [SET_PROJECT]: setProject,
    // End of Project Data actions.
};

export {
    SHOW_LOADER,
    HIDE_LOADER,

    // Object Data actions...
    CLEAR_OBJECTS_DATA_SELECTIONS,
    DUPLICATE_OBJECTS_DATA,
    REMOVE_OBJECTS_DATA,
    SELECT_OBJECT_DATA,
    UPDATE_OBJECT_DATA,
    CLEAR_OBJECTS_DATA,
    ADD_OBJECTS_DATA,
    SET_OBJECTS_DATA,
    SET_OBJECT_DATA,
    ADD_OBJECT_DATA,
    // End of Object Data actions.

    // Project Data actions...
    CLEAR_PROJECTS_SELECTIONS,
    QUERY_GET_MANY_PROJECTS_SUCCESS,
    PERSIST_CREATE_PROJECT_SUCCESS,
    PERSIST_UPDATE_PROJECT_SUCCESS,
    PERSIST_DELETE_PROJECT_SUCCESS,
    QUERY_GET_ONE_PROJECT_SUCCESS,
    DUPLICATE_PROJECTS,
    REMOVE_PROJECTS,
    UNSELECT_PROJECT,
    SELECT_PROJECT,
    CLEAR_PROJECT_DATA,
    SET_PROJECTS_DATA,
    SET_PROJECT,
    // End of Project Data actions.
};

export default actions;
