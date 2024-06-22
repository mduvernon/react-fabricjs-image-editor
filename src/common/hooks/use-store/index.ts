// React
import { useContext } from 'react';
// Context
import { AppContext } from 'common/contexts';
// Type
import { AppStateType } from 'common/type';

export const useStore = (): AppStateType => useContext(AppContext);

export default useStore;
