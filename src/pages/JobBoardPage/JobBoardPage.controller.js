import { useEffect, useReducer } from "react";
import mockDb from "../../utils/mockDb/mockData.json";

export function useController() {
  const initStates = {
    isFilterDrawerOpen: false,
    filterJobByForm: "all",
    selectedFilterParams: {},
    jobList: [],
    lazyJobList: [],
    searchValue: "",
  };

  const [state, dispatch] = useReducer(
    (state, value) => ({ ...state, ...value }),
    initStates
  );

  const lazyLoadJobList = () => {
    const { lazyJobList, jobList } = state;
    const tempLazyJobList = [
      ...lazyJobList,
      ...jobList.slice(lazyJobList.length, lazyJobList.length + 5),
    ];
    dispatch({ lazyJobList: tempLazyJobList });
  };

  useEffect(() => {
    onSearch(state.searchValue);
  }, [state.selectedFilterParams]);

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
    const tempLazyJobList = [...state.jobList.slice(0, 5)];
    dispatch({ lazyJobList: tempLazyJobList });
  }, [state.jobList]);

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

    if (Object.keys(newSelected).length === 0) newSelected[0] = true;

    dispatch({
      selectedFilterParams: {
        ...state.selectedFilterParams,
        [filterSectionItem.header_text]: newSelected,
      },
    });
  };

  const testFilterSelection = (item) => {
    // filter logic implemented here
    const { selectedFilterParams } = state;

    return (
      (selectedFilterParams["Job Type"]?.[item.type.id] ||
        selectedFilterParams["Job Type"]?.[0]) &&
      (selectedFilterParams["Company Market"]?.[item.company_market.id] ||
        selectedFilterParams["Company Market"]?.[0]) &&
      (selectedFilterParams["Location"]?.[item.location.id] ||
        selectedFilterParams["Location"]?.[0]) &&
      (!selectedFilterParams["Necessary skills"]?.[0]
        ? item.skills.reduce((cum, item) => {
            cum = !cum
              ? selectedFilterParams["Necessary skills"]?.[item.id]
              : cum;
            return cum;
          }, false)
        : true)
    );
  };

  const onSearch = (searchText) => {
    searchText = searchText.trim();
    let searchResults = [];
    if (searchText?.trim()?.length !== 0) {
      searchResults = mockDb.jobs.filter((item) => {
        return (
          (new RegExp(searchText.toLowerCase()).test(item.name.toLowerCase()) ||
            new RegExp(searchText.toLowerCase()).test(
              item.role.toLowerCase()
            )) &&
          testFilterSelection(item)
        );
      });
    } else {
      searchResults = mockDb.jobs.filter((item) => {
        return testFilterSelection(item);
      });
    }
    dispatch({ jobList: searchResults, searchValue: searchText });
  };

  const onViewResultsBasedOnFilter = () => {
    const searchResults = mockDb.jobs.filter((item) => {
      return testFilterSelection(item);
    });
    dispatch({ jobList: searchResults });
  };

  return {
    state,
    onSearch,
    dispatch,
    toggleFilterDrawer,
    onFilterOptionSelected,
    onFilterOptionDeselected,
    onViewResultsBasedOnFilter,
    lazyLoadJobList,
  };
}
