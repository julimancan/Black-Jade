import { createGlobalState } from 'react-hooks-global-state';

const initialState = {
  siteSettings: {
  },
  navMenuItems: []
}
const { setGlobalState, useGlobalState } = createGlobalState(initialState);

export { useGlobalState, setGlobalState };