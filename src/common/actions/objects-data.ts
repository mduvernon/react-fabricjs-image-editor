// Libs
import deepEqual from "fast-deep-equal";
// Utils
import { randomId } from 'common/utils';
// Types
import { ObjectDataType } from "common/type";

export const CLEAR_OBJECTS_DATA_SELECTIONS = 'CLEAR_OBJECTS_DATA_SELECTIONS';
export const DUPLICATE_OBJECTS_DATA = 'DUPLICATE_OBJECTS_DATA';
export const REMOVE_OBJECTS_DATA = 'REMOVE_OBJECTS_DATA';
export const SELECT_OBJECT_DATA = 'SELECT_OBJECT_DATA';
export const UPDATE_OBJECT_DATA = 'UPDATE_OBJECT_DATA';
export const CLEAR_OBJECTS_DATA = 'CLEAR_OBJECTS_DATA';
export const ADD_OBJECTS_DATA = 'ADD_OBJECTS_DATA';
export const ADD_OBJECT_DATA = 'ADD_OBJECT_DATA';
export const SET_OBJECTS_DATA = 'SET_OBJECTS_DATA';
export const SET_OBJECT_DATA = 'SET_OBJECT_DATA';

export const clearObjectsDataSelections = (state: { selectionsIds: string[] }) => (
    state.selectionsIds?.length === 0
        ? state
        : {
            ...state,
            selectionsIds: [],
        }
)

export const duplicateObjectsData = (state: { objectsData: { type: string, left: string, top: string }[] }, payload: { objectsDataIds: number[], dismissHistory: boolean }) => {
    const { objectsData } = state;
    const duplicatedObjectsData: any = {};

    payload.objectsDataIds.forEach((id: number) => {
        const objectData = objectsData[id];

        if (objectData) {
            const clonedObjectDataId = randomId(objectData.type);

            duplicatedObjectsData[clonedObjectDataId] = {
                ...objectData,
                id: clonedObjectDataId,
                left: objectData.left + 20,
                top: objectData.top + 20,
            };
        }
    });

    return {
        ...state,
        // not stored in state, used in reducer to consider in undo/redo stacks
        isDesignState: !payload.dismissHistory,
        objectsData: {
            ...objectsData,
            ...duplicatedObjectsData,
        },
    };
};

export const removeObjectsData = (
    state: { designLayer: any, objectsData: string[], selectionsIds: number[] },
    payload: { objectsDataIds: number[], isDesignState: boolean }
) => {
    const { objectsData } = state;

    const {
        objectsDataIds
    } = payload;

    let newSelectionsIds = state.selectionsIds;

    objectsDataIds.forEach((id: number) => {
        newSelectionsIds = newSelectionsIds.filter(
            (selectionId) => selectionId !== id,
        );

        if (state.designLayer && objectsData[id]) {
            const objectDataNode = state.designLayer.findOne(`#${id}`);

            if (objectDataNode) {
                // objectDataNode.destroy();
            }

            delete objectsData[id];
        }
    });

    return {
        ...state,
        // not stored in state, used in reducer to consider in undo/redo stacks
        isDesignState: payload.isDesignState || true,
        objectsData,
        selectionsIds: [],
    };
};

export const selectObjectData = (state: { selectionsIds: number[] }, payload: { objectDataId: number, multiple: boolean }) => {
    if (
        state.selectionsIds?.length === 1 &&
        state.selectionsIds[0] === payload.objectDataId
    ) {
        return state;
    }

    let newSelectionsIds;

    if (payload.multiple) {
        newSelectionsIds = state.selectionsIds.filter(
            (id) => id !== payload.objectDataId,
        );

        const wasObjectDataAlreadySelected =
            newSelectionsIds.length !== state.selectionsIds?.length;

        if (!wasObjectDataAlreadySelected) {
            newSelectionsIds.push(payload.objectDataId);
        }
    } else {
        newSelectionsIds = [payload.objectDataId];
    }

    return {
        ...state,
        selectionsIds: newSelectionsIds,
    };
};

export const setObjectsData = (state: { objectsData: any[] }, payload: { objectsData: ObjectDataType[], dismissHistory?: boolean, replaceCurrent?: boolean }) => {
    const {
        objectsData
    } = payload;

    let updatedState = clearObjectsData(state);

    for (const key in objectsData) {
        updatedState = setObjectData(
            updatedState,
            { objectData: objectsData[key], dismissHistory: payload.dismissHistory, replaceCurrent: payload.replaceCurrent }
        )
    }

    return updatedState;
}

export const setObjectData = (state: { objectsData: any[] }, payload: { objectData?: ObjectDataType, dismissHistory?: boolean, replaceCurrent?: boolean } = {}) => {
    // dismissHistory is used to prevent considering this change in history (undo/redo).
    const {
        dismissHistory = false,
        replaceCurrent = false,
        objectData: newObjectData,
    } = payload as any;

    const objectDataId = newObjectData.id ?? randomId(newObjectData.type);

    const existedObjectData = state.objectsData[objectDataId];

    // If objectData not changed don't update it.
    if (
        existedObjectData &&
        deepEqual(existedObjectData, newObjectData)
    ) {
        return state;
    }

    return {
        ...state,
        isDesignState: !dismissHistory, // not stored in state, used in reducer to consider in undo/redo stacks
        objectsData: {
            ...state.objectsData,
            [objectDataId]: {
                ...(replaceCurrent ? {} : existedObjectData),
                ...newObjectData,
            },
        },
    };
};

export const addObjectData = (state: any, payload: { objectData: ObjectDataType }) => {
    const { objectData } = payload as any;

    const objectDataId = objectData.id ?? randomId(objectData.type);

    return {
        ...state,
        objectsData: {
            ...state.objectsData,
            [objectDataId]: {
                ...objectData,
            },
        },
    };
};

export const addObjectsData = (state: any, payload: { objectsData: ObjectDataType[] }) => {

    for (const objectData of payload.objectsData) {
        const objectDataId = objectData.id ?? randomId(objectData.type);

        state.objectsData[objectDataId] = {
            ...objectData,
        };
    }

    return {
        ...state,
    };
};

export const updateObjectData = (state: any, payload: { objectData: ObjectDataType }) => {
    const {
        objectData
    } = payload;

    const updatedObjectData = {};

    for (const key in state.objectData) {
        const data = state.objectData[key];

        if (data.id === objectData.id) {
            updatedObjectData[key] = {
                ...data,
                ...objectData,
            };
        } else {
            updatedObjectData[key] = data;
        }
    }

    return {
        ...state,
        objectsData: updatedObjectData,
    };
};

export const clearObjectsData = (state: any) => {
    return {
        ...state,
        objectsData: {},
    };
};