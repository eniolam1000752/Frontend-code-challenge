import React from "react";
import { Box, Fab, Grid, Typography } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { theme } from "../../utils/globals";
import { useController } from "./JobBoardPage.controller";
import { useStyles } from "./JobBoarPage.style";
import { SearchInput } from "../../components/SearchTextInput/SearchInput";
import { JobsCard } from "../../components/JobsCard/JobsCard";

export function JobBoardPage({}) {
  const classes = useStyles(theme);
  const { openFilterModal } = useController();

  return (
    <main className={classes.mainPageWrapper}>
      <header className={classes.appHeader}>
        <Typography variant="h5" className={classes.appTitle}>
          <b>InterPlanetry Job Hunt</b>
        </Typography>
      </header>
      <Box padding="40px">
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
              <Fab
                aria-label="filter"
                onClick={openFilterModal}
                color="primary"
                size="small"
              >
                <FilterListIcon />
              </Fab>
              <Box marginLeft="20px">
                <SearchInput />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <JobsCard />
        <JobsCard noDivider />
      </Box>
    </main>
  );
}
