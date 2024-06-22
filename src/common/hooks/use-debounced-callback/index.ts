// React
import { useCallback } from 'react';
// Utils
import { debounce } from 'common/utils/debounce';

export const useDebouncedCallback = (
    func: (...args: any[]) => any,
    timeout: number = 300,
    dependencies: any[] = []
) => useCallback(debounce(func, timeout), dependencies);

export default useDebouncedCallback;
