// React
import { useCallback, useEffect, useMemo, useRef } from 'react';

export const useResizeObserver = (onResize: (...args: any) => void = (args: any) => { }) => {
    const onResizeCallback = useRef(onResize);
    const resizeObserver: any = useRef();

    const observerCallback = useCallback((entries: any[]) => {
        entries.forEach((entry) => {
            if (entry.contentRect) {
                const { width, height } = entry.contentRect;

                onResizeCallback.current({
                    entry,
                    width,
                    height,
                });
            }
        });
    }, []);

    const updateOnResizeCallback = useCallback((newOnResizeCallback: any) => {
        onResizeCallback.current = newOnResizeCallback;
    }, []);

    const initObserver = useCallback(() => {
        if (!resizeObserver.current) {
            resizeObserver.current = new ResizeObserver(observerCallback);
        }
    }, []);

    const observeElement = useCallback((element: any, newOnResizeCallback: any) => {
        if (element) {
            if (!resizeObserver.current) {
                initObserver();
            }

            resizeObserver.current.observe(element);

            if (newOnResizeCallback) {
                onResizeCallback.current = newOnResizeCallback;
            }
        }
    }, []);

    const unobserveElement = useCallback((element: any, newOnResizeCallback?: any) => {
        if (resizeObserver.current && element) {
            resizeObserver.current.unobserve(element);

            if (newOnResizeCallback) {
                onResizeCallback.current = newOnResizeCallback;
            }
        }
    }, []);

    const removeObserver = useCallback(() => {
        if (resizeObserver.current) {
            resizeObserver.current.disconnect();
        }
    }, []);

    useEffect(() => {
        initObserver();
        return removeObserver;
    }, []);

    return useMemo(
        () => [observeElement, unobserveElement, updateOnResizeCallback],
        [],
    );
};

export default useResizeObserver;
