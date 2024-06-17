// React
import { useEffect, EffectCallback, DependencyList } from 'react';
// Hooks
import { useDeepCompareMemoize } from '../use-deep-compare-memoize';

/**
 * `useDeepCompareEffect` Accepts a function that contains imperative, possibly
 * effectful code.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list
 * change.
 *
 * Usage note: only use this if `deps` are objects or arrays that contain
 * objects. Otherwise you should just use React.useEffect.
 *
 */
function useDeepCompareEffect(
    effect: EffectCallback,
    dependencies: DependencyList
) {
    useEffect(effect, useDeepCompareMemoize(dependencies));
}

export {
    useDeepCompareEffect
};
