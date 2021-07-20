import React from "react";
import {
  Box,
  Button,
  Drawer,
  Fab,
  Grid,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { theme } from "../../utils/globals";
import { useController } from "./JobBoardPage.controller";
import { useStyles } from "./JobBoarPage.style";
import { SearchInput } from "../../components/SearchTextInput/SearchInput";
import { JobsCard } from "../../components/JobsCard/JobsCard";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { ListSelect } from "../../components/ListSelect/ListSelect";
import mockDb from "../../utils/mockDb/mockData.json";
import { ReactComponent as EmptyIcon } from "../../assets/svgs/emptyIcon.svg";
import headerBgImage from "../../assets/images/header-bg-img.jpg";

export function JobBoardPage({}) {
  const classes = useStyles(theme);
  const matchSmDown = useMediaQuery(theme.breakpoints.down("xs"));
  const {
    toggleFilterDrawer,
    state,
    onFilterOptionSelected,
    onFilterOptionDeselected,
    onSearch,
    lazyLoadJobList,
  } = useController();

  return (
    <main
      className={classes.mainPageWrapper}
      onScroll={(event) => {
        const contentHeight = event.target.scrollHeight;
        const viewPortHeight = event.target.clientHeight;
        const scrollTop = event.target.scrollTop;

        if (contentHeight - viewPortHeight === scrollTop) {
          lazyLoadJobList();
        }
      }}
    >
      <Drawer
        anchor={"right"}
        open={state.isFilterDrawerOpen}
        onClose={toggleFilterDrawer}
        className={classes.drawer}
      >
        <Paper className={classes.filterDrawerWrapper}>
          <Fab
            aria-label="filter"
            onClick={toggleFilterDrawer}
            color="primary"
            size="small"
            className={classes.filterCloseBtn}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Fab>
          <Box className={classes.filterByContainer}>
            <Box className={classes.updateButtonWrapper}>
              <span className="page-title">Filter By</span>
            </Box>
            <Box className={classes.filterBodyContainer}>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                marginTop="40px"
              >
                {mockDb.filter_params.map((item, index) => (
                  <Box paddingX={"15px"} key={`filter-param-${index}`}>
                    <ListSelect
                      headerText={item.header_text}
                      listItem={item.options}
                      onSelect={(selectedOption) =>
                        onFilterOptionSelected(item, selectedOption)
                      }
                      onDeSelect={(optionIndexToDelete) =>
                        onFilterOptionDeselected(item, optionIndexToDelete)
                      }
                      selected={
                        state.selectedFilterParams[item.header_text] || {}
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Drawer>
      <header className={classes.appHeader}>
        <img src={headerBgImage} alt="header-background" />
        <Typography variant="h4" className={classes.appTitle}>
          <b>Inter-planetry Job Hunt</b>
        </Typography>
      </header>
      <Box overflow="hidden">
        <Box padding="40px" marginTop="70px">
          <Grid container space={3}>
            <Grid item md={6} xs={12} lg={6}>
              <Box marginBottom="20px">
                <Typography variant="p" className="jobs-for-you">
                  Jobs for you ({state.jobList?.length || 0})
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} lg={6}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                {!matchSmDown && (
                  <Tooltip title="Filter" aria-label="filter" arrow>
                    <Fab
                      data-testid="filter-trigger-button"
                      aria-label="filter"
                      onClick={toggleFilterDrawer}
                      color="primary"
                      size="small"
                      className={classes.roundFilterBtn}
                    >
                      <FilterListIcon />
                    </Fab>
                  </Tooltip>
                )}
                <Box width="100%" maxWidth={matchSmDown ? undefined : "300px"}>
                  <Box width="100%">
                    <SearchInput
                      data-testid="search-input"
                      placeholder={"Search by company or job title "}
                      searchValue={state.searchValue}
                      onChangeText={(event) => {
                        const value = event.target.value;
                        onSearch(value);
                      }}
                    />
                  </Box>
                  {matchSmDown && (
                    <Box marginTop="20px">
                      <Button
                        data-testid="filter-trigger-button"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<FilterListIcon />}
                        style={{ borderRadius: 50, borderWidth: "2px" }}
                        onClick={toggleFilterDrawer}
                      >
                        Filter
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center" flexDirection="column">
          {state.jobList.length === 0 ? (
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              width="100%"
              marginTop="60px"
            >
              <EmptyIcon width="100px" height="100px" />
              <span className={classes.emptyText}>
                There are no job records based on your filtered search <br />{" "}
                <span>{state.searchValue}</span>
              </span>
            </Box>
          ) : (
            state.lazyJobList.map((item, index) => (
              <JobsCard
                jobData={item}
                key={`job-item-${index}`}
                noDivider={index === state.lazyJobList.length - 1}
              />
            ))
          )}
        </Box>
      </Box>
    </main>
  );
}
