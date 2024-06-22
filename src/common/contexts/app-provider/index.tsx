// React
import { FC, PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
// i18next
import i18n from 'i18next';
// Common Hooks
import { useAppReducer } from 'common/hooks';
// Default Config
import { getInitialAppState } from 'common/utils';
import { AppContext } from '../app-context';
// Common Utils
import { appReducer } from 'common/utils';
// Types
import { AppConfigType } from 'common/type';

let isFieMounted = true;

type OwnProps = PropsWithChildren & {
    config?: AppConfigType;
};

const AppProvider: FC<OwnProps> = ({
    children,
    config = {} as any
}) => {
    const [state, _dispatch] = useAppReducer(
        appReducer,
        getInitialAppState(config),
        config,
    );

    useEffect(() => {
        isFieMounted = true;

        return () => {
            isFieMounted = false;
        };
    }, []);

    const dispatch = useCallback((...args: any[]) => {
        if (isFieMounted) {
            // @ts-ignore
            _dispatch(...args);
        }
    },
        [_dispatch],
    );

    const providedValue = useMemo(() => {

        const value = ({
            ...state,
            config,
            dispatch,
            t: i18n.t.bind(i18n),
        });

        return value;
    }, [config, state]);

    return (
        <AppContext.Provider value={providedValue}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider }

export default AppProvider;
