import { useEffect, useReducer } from "react";
import mockDb from "../../utils/mockDb/mockData.json";

export function useController() {
  const initStates = {
    isFilterDrawerOpen: false,
    filterJobByForm: "all",
    selectedFilterParams: {},
    jobList: [],
    searchValue: "",
  };
  console.log("test");

  const [state, dispatch] = useReducer(
    (state, value) => ({ ...state, ...value }),
    initStates
  );

  useEffect(() => {
    const initSelectedFilterParams = mockDb.filter_params.reduce(
      (cum, item) => ({ ...cum, [item.header_text]: { 0: true } }),
      {}
    );

    dispatch({
      jobList: mockDb.jobs,
      selectedFilterParams: initSelectedFilterParams,
    });
  }, []);

  useEffect(() => {
    onSearch(state.searchValue);
  }, [state.selectedFilterParams]);

  const { selectedFilterParams } = state;

  const toggleFilterDrawer = () => {
    dispatch({ isFilterDrawerOpen: !state.isFilterDrawerOpen });
  };

  const onFilterOptionSelected = (filterSectionItem, indexOfSelectedOption) => {
    let newSelected = {};
    let selectedOptions =
      state.selectedFilterParams[filterSectionItem.header_text] || {};

    if (indexOfSelectedOption !== 0) {
      // to remove "any" selection if options other than "any" is selected
      delete selectedOptions[0];

      newSelected = { ...selectedOptions, [indexOfSelectedOption]: true };
    } else {
      newSelected = { 0: true };
    }

    dispatch({
      selectedFilterParams: {
        ...state.selectedFilterParams,
        [filterSectionItem.header_text]: newSelected,
      },
    });
  };

  const onFilterOptionDeselected = (filterSectionItem, optionIndexToDelete) => {
    delete state.selectedFilterParams[filterSectionItem.header_text][
      optionIndexToDelete
    ];

    const newSelected = {
      ...state.selectedFilterParams[filterSectionItem.header_text],
    };

    dispatch({
      selectedFilterParams: {
        ...state.selectedFilterParams,
        [filterSectionItem.header_text]: newSelected,
      },
    });
  };

  const onSearch = (searchText) => {
    let searchResults = [];

    if (searchText?.trim()?.length !== 0) {
      // filter logic implemented here
      searchResults = mockDb.jobs.filter((item) => {
        return (
          (new RegExp(searchText.toLowerCase()).test(item.name.toLowerCase()) ||
            new RegExp(searchText.toLowerCase()).test(
              item.role.toLowerCase()
            )) &&
          (selectedFilterParams["Job Type"][item.type.id] ||
            selectedFilterParams["Job Type"][0]) &&
          (selectedFilterParams["Company Market"][item.company_market.id] ||
            selectedFilterParams["Company Market"][0]) &&
          (!selectedFilterParams["Necessary skills"][0]
            ? item.skills.reduce((cum, item) => {
                cum = !cum
                  ? selectedFilterParams["Necessary skills"][item.id]
                  : cum;
                return cum;
              }, false)
            : true)
        );
      });
    } else {
      searchResults = mockDb.jobs;
    }
    dispatch({ jobList: searchResults, searchValue: searchText });
  };

  return {
    toggleFilterDrawer,
    state,
    dispatch,
    onFilterOptionSelected,
    onFilterOptionDeselected,
    onSearch,
  };
}
