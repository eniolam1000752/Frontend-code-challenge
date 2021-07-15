import { useReducer } from "react";

export function useController() {
  const initStates = {
    isFilterDrawerOpen: false,
  };

  const [state, dispatch] = useReducer(
    (state, value) => ({ ...state, ...value }),
    initStates
  );

  const toggleFilterDrawer = () => {
    dispatch({ isFilterDrawerOpen: !state.isFilterDrawerOpen });
  };

  return { toggleFilterDrawer, state };
}
