export const SHOW_LOADER = 'SHOW_LOADER';

export const showLoader = (
    state: { isLoadingGlobally: boolean },
) => ({
    ...state,
    isLoadingGlobally: true,
});

export default showLoader;
