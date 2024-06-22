export const HIDE_LOADER = 'HIDE_LOADER';

export const hideLoader = (state: any) => ({
    ...state,
    isLoadingGlobally: false,
});

export default hideLoader;
