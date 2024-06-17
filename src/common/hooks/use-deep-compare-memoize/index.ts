// React
import { useRef, DependencyList } from 'react';
// Libs
import deepEqual from "fast-deep-equal";

/**
 * `useDeepCompareMemoize` will return a memoized value only if one of the
 * `dependencies` has changed.
 *
 * @param value The value to be memoized
 *
 * Usage note: only use this if `dependencies` are objects or arrays that contain
 * objects. Otherwise you should just use React.useMemo.
 */
const useDeepCompareMemoize = (value: DependencyList): any => {
    const valueRef$: any = useRef();

    if (!deepEqual(value, valueRef$.current)) {
        valueRef$.current = value;
    }

    return valueRef$.current;
};

export { useDeepCompareMemoize };
