// React
import { useCallback, useMemo, useRef, useState } from 'react';
// Actions
import { REMOVE_OBJECTS_DATA, SELECT_OBJECT_DATA, SET_OBJECTS_DATA, SET_OBJECT_DATA } from 'common/actions';
// Utils
import { randomId, debounce } from 'common/utils';
// Hooks
import { useDeepCompareEffect, useStore } from 'common/hooks';
// Libs
import { useDebouncedCallback } from '../use-debounced-callback';
// Types
import { ObjectDataType } from 'common/type';

type UpdatesObjOrFn = Partial<ObjectDataType> | ((objectData: ObjectDataType) => Partial<ObjectDataType>);
type OverridenObjectDataType = ObjectDataType & { shouldSave?: boolean; neverSave?: boolean };

export const useObjectData = (objectDataInput: any = {}, enablePreview = true) => {
    const {
        selectionsIds = [],
        objectsData = {},
        dispatch,
        config,
    } = useStore();

    const objectDataDefaults = {
        ...config[objectsData[selectionsIds[0]]?.type || objectDataInput.type],
    };

    // The objectData state is used to store the current (selected) object data.
    const [objectData, setTmpObjectData] = useState<OverridenObjectDataType>(() => ({
        ...objectDataDefaults,
        ...objectDataInput,
        ...objectsData[selectionsIds[0]],
    }));

    const objectDataBeforeSelection: any = useRef();

    const saveObjectsDataCollection = useCallback((objectsData: ObjectDataType[]) => {

        dispatch({
            type: SET_OBJECTS_DATA,
            payload: { objectsData: objectsData ?? [] },
        });

    }, [objectsData]);

    const removeObjectData = useCallback((objectDataId: number | string) => {
        dispatch({
            type: REMOVE_OBJECTS_DATA,
            payload: { stagesDataIds: [objectDataId] },
        });
    }, []);

    const _handleSaveObjectData = useCallback((objectDataData: any) => {
        const {
            fonts,
            onFontChange,
            ...savableObjectDataData
        } = objectDataData;

        dispatch({
            type: SET_OBJECT_DATA,
            payload: { objectData: savableObjectDataData },
        });


        debounce(() => {
            dispatch({
                type: SELECT_OBJECT_DATA,
                payload: {
                    objectDataId: savableObjectDataData.id,
                },
            });
        }, 30)();
    }, []);

    const setObjectData = useDebouncedCallback((updatesObjOrFn: UpdatesObjOrFn) => {
        setTmpObjectData((latest: any) => ({
            ...latest,
            shouldSave: false,
            neverSave: false,
            ...(typeof updatesObjOrFn === 'function'
                ? updatesObjOrFn(latest)
                : updatesObjOrFn
            ),
        }));
    }, 15);

    const getObjectDataInitialProps = useCallback((currentObjectData: any, newObjectDataName: string) => {
        if (currentObjectData.type === newObjectDataName) {
            const {
                x,
                y,
                width,
                height,
                radius,
                radiusX,
                radiusY,
                points,
                image,
                text,
                scaleX,
                scaleY,
                rotation,
                ...dimensionlessProps
            } = currentObjectData;

            return {
                ...config[objectsData[selectionsIds[0]]?.type || objectDataInput.type],

                ...objectDataInput,
                ...dimensionlessProps,
            };
        }

        return {
            ...objectDataDefaults,
            ...objectDataInput,
        };
    },
        [],
    );

    const addNewObjectData = useCallback((newObjectData: any) => {
        setTmpObjectData((latest: any) => {
            const initialProps = getObjectDataInitialProps(
                latest,
                newObjectData.type || objectDataInput.type,
            );

            const newId = newObjectData.id || randomId(newObjectData.type || latest.type);

            return {
                visible: true,
                listening: true,
                ...initialProps,
                ...newObjectData,
                id: newId,
                shouldSave: true,
                neverSave: false,
            };
        });
    }, []);

    const updateObjectData = addNewObjectData;

    useDeepCompareEffect(() => {
        const {
            shouldSave,
            neverSave,
            ...savableObjectData
        } = objectData;

        const selection = selectionsIds.length === 1 && objectsData[selectionsIds[0]];

        if (!neverSave && (shouldSave || selection)) {
            _handleSaveObjectData({
                ...savableObjectData,
                id: shouldSave ? savableObjectData.id : selection.id,
            });
        }
    }, [objectData]);

    useDeepCompareEffect(() => {
        // setTimeout to make the state changes after the objectDataInput is drawn not before.
        setTimeout(() => {
            if (selectionsIds.length === 1) {
                objectDataBeforeSelection.current = objectData;

                setTmpObjectData({
                    ...objectsData[selectionsIds[0]] as any,
                    neverSave: true
                });
            } else if (objectDataBeforeSelection.current) {
                setTmpObjectData({
                    ...objectDataBeforeSelection.current,
                    neverSave: true,
                });

                objectDataBeforeSelection.current = null;
            }
        });
    }, [selectionsIds, objectsData]);

    return useMemo(() => ({
        objectData,
        setObjectData,
        addNewObjectData,
        updateObjectData,
        saveObjectsDataCollection,
        removeObjectData,
    }),
        [
            objectData,
            setObjectData,
            addNewObjectData,
            updateObjectData,
            saveObjectsDataCollection,
            removeObjectData,
        ],
    );
};

export default useObjectData;
