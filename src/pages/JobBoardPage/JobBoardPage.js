import React from "react";
import {
  Box,
  Button,
  ButtonBase,
  Drawer,
  Fab,
  Grid,
  Paper,
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

export function JobBoardPage({}) {
  const classes = useStyles(theme);
  const {
    toggleFilterDrawer,
    state,
    dispatch,
    onFilterOptionSelected,
    onFilterOptionDeselected,
  } = useController();
  const matchSmDown = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <main className={classes.mainPageWrapper}>
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
            <span className="page-title">Filter By</span>
            <Box
              marginTop="40px"
              marginLeft="10px"
              width="calc(100% - 18px)"
              height="calc(100% - 110px)"
              overflow="hidden scroll"
            >
              <Box width="250px" className={classes.toggleStack}>
                <Grid container>
                  <Grid item md={4} sm={4} xs={4}>
                    <ButtonBase
                      onClick={() => dispatch({ filterJobByForm: "all" })}
                      className={`switch-button ${
                        state.filterJobByForm === "all" ? "active" : ""
                      }`}
                    >
                      All
                    </ButtonBase>
                  </Grid>
                  <Grid item md={4} sm={4} xs={4}>
                    <ButtonBase
                      onClick={() => dispatch({ filterJobByForm: "on-site" })}
                      className={`switch-button ${
                        state.filterJobByForm === "on-site" ? "active" : ""
                      }`}
                    >
                      on site
                    </ButtonBase>
                  </Grid>
                  <Grid item md={4} sm={4} xs={4}>
                    <ButtonBase
                      onClick={() => dispatch({ filterJobByForm: "remote" })}
                      className={`switch-button ${
                        state.filterJobByForm === "remote" ? "active" : ""
                      }`}
                    >
                      Remote
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Box>
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
                      onDeSelect={(indexOfDeletedOption) =>
                        onFilterOptionDeselected(item, indexOfDeletedOption)
                      }
                      selected={
                        state.selectedFilterParams[item.header_text] || []
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box display="flex" justifyContent="center" marginTop="40px">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    borderRadius: 50,
                    borderWidth: "2px",
                    fontSize: "0.7em",
                    padding: 12,
                  }}
                >
                  View Results
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Drawer>
      <header className={classes.appHeader}>
        <Typography variant="h5" className={classes.appTitle}>
          <b>InterPlanetry Job Hunt</b>
        </Typography>
      </header>
      <Box>
        <Box padding="40px" marginTop="70px">
          <Grid container space={3}>
            <Grid item md={6} xs={12} lg={6}>
              <Box marginBottom="20px">
                <Typography variant="p" className="jobs-for-you">
                  Jobs for you (120)
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
                  <Fab
                    aria-label="filter"
                    onClick={toggleFilterDrawer}
                    color="primary"
                    size="small"
                    className={classes.roundFilterBtn}
                  >
                    <FilterListIcon />
                  </Fab>
                )}
                <Box width="100%" maxWidth={matchSmDown ? undefined : "300px"}>
                  <Box width="100%">
                    <SearchInput placeholder={"Search "} />
                  </Box>
                  {matchSmDown && (
                    <Box marginTop="20px">
                      <Button
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
          {mockDb.jobs.map((item, index) => (
            <JobsCard
              jobData={item}
              key={`job-item-${index}`}
              noDivider={index === mockDb.jobs.length - 1}
            />
          ))}
        </Box>
      </Box>
    </main>
  );
}
