import { useEffect, useReducer } from "react";
import mockDb from "../../utils/mockDb/mockData.json";

export function useController() {
  const initStates = {
    isFilterDrawerOpen: false,
    filterJobByForm: "all",
    selectedFilterParams: {},
    jobList: [],
  };

  useEffect(() => {
    dispatch({ jobList: mockDb.jobs });
  }, []);

  const [state, dispatch] = useReducer(
    (state, value) => ({ ...state, ...value }),
    initStates
  );

  const toggleFilterDrawer = () => {
    dispatch({ isFilterDrawerOpen: !state.isFilterDrawerOpen });
  };

  const onFilterOptionSelected = (filterSectionItem, indexOfSelectedOption) => {
    let newSelected = [];
    let selectedOptions =
      state.selectedFilterParams[filterSectionItem.header_text] || [];

    if (indexOfSelectedOption !== 0) {
      // filter to remove any selection if any other option is selected
      selectedOptions = selectedOptions.filter((item) => item);

      newSelected = [...selectedOptions, indexOfSelectedOption];
    } else {
      newSelected = [0];
    }

    dispatch({
      selectedFilterParams: {
        ...state.selectedFilterParams,
        [filterSectionItem.header_text]: newSelected,
      },
    });
  };

  const onFilterOptionDeselected = (
    filterSectionItem,
    indexInSelectedToDelete
  ) => {
    delete state.selectedFilterParams[filterSectionItem.header_text][
      indexInSelectedToDelete
    ];

    const newSelected = state.selectedFilterParams[
      filterSectionItem.header_text
    ].filter((item) => item || item === 0);

    dispatch({
      selectedFilterParams: {
        ...state.selectedFilterParams,
        [filterSectionItem.header_text]: newSelected,
      },
    });
  };

  const onSearch = () => {};

  return {
    toggleFilterDrawer,
    state,
    dispatch,
    onFilterOptionSelected,
    onFilterOptionDeselected,
    onSearch,
  };
}
