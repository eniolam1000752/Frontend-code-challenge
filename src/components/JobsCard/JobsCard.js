import React, { useState } from "react";
import {
  Box,
  ButtonBase,
  Grid,
  Paper,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import { Badge } from "../Badge/Badge";

function JobDescriptionDetails({ text }) {
  const classes = useStyles();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box className={classes.companyDetailsWrapper}>
      <span>{!isCollapsed ? text.slice(0, 400) : text}</span>
      {!(text.length < 400) && (
        <ButtonBase
          className="more"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span>
            <b> {!isCollapsed ? "More" : "Less"}</b>
          </span>
        </ButtonBase>
      )}
    </Box>
  );
}

export function JobsCard({ noDivider, jobData }) {
  const classes = useStyles();

  return (
    <Paper className={classes.cardWrapper}>
      <Grid container>
        <Grid item sm={12} md={12}>
          <span style={{ fontSize: 20, fontWeight: 600, lineHeight: "22px" }}>
            {jobData.role}
          </span>
        </Grid>
        <Grid item sm={12} md={12}>
          <Grid container spacing={3}>
            <Grid item md={8}>
              <Box className={classes.companyNameWrapper}>
                <img src={jobData.logo} />
                <span>{jobData.name}</span>

                <Tooltip
                  title="Click to visit job website"
                  aria-label="visit-link"
                  placement="right"
                  arrow
                >
                  <a
                    className="company-link"
                    href={`//${jobData.website_url}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <LinkIcon fontSize="small" />
                  </a>
                </Tooltip>
              </Box>
              <JobDescriptionDetails text={jobData.description} />
            </Grid>
            <Grid item md={4} style={{ height: "140px" }}>
              <Box className={classes.jobDetailsWrapper} display="flex">
                <div className="v-line" />
                <Box className="extra-details-wraper">
                  <Box className="extra-detail-item">
                    <span>
                      <b>Job type: </b>
                    </span>
                    <span>{jobData.type.display_text}</span>
                  </Box>
                  <Box className="extra-detail-item">
                    <span>
                      <b>Location: </b>
                    </span>
                    <span>{jobData.location.display_text}</span>
                  </Box>
                  <Box className="extra-detail-item">
                    <span>
                      <b>Company Market: </b>
                    </span>
                    <span>{jobData.company_market.display_text}</span>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={12}>
          <Box className={classes.skillsHeader}>
            <span>
              <b>Skills:</b>
            </span>
          </Box>
          <Box display="flex" margin="10px" marginTop="10px" flexWrap="wrap">
            {jobData.skills.map((skill, index) => (
              <Badge key={`skill-${index}`}>{skill.display_text}</Badge>
            ))}
          </Box>
        </Grid>
      </Grid>
      {!noDivider && <hr />}
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    width: "90%",
    padding: 20,
    marginBottom: 0,
    boxShadow: "none",
    fontFamily: "Montserrat",
    "& hr": {
      width: "98%",
      opacity: 0.7,
      marginTop: 8,
      marginBottom: -5,
      color: theme.palette.grey1.main,
    },
  },
  companyNameWrapper: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& img": {
      width: 18,
      height: 18,
      marginLeft: 5,
    },
    "& img ~ span": {
      marginLeft: 12,
      fontSize: 14,
      fontWeight: 300,
    },
    "& img ~ span ~ .company-link": {
      marginLeft: 10,
      transform: "rotate(-45deg) translateY(2px)",
      opacity: 0.3,
    },
    "& img ~ span ~ .company-link:hover": {
      opacity: 0.5,
    },
  },
  companyDetailsWrapper: {
    fontSize: 11,
    fontWeight: 300,
    marginTop: 5,
    marginLeft: 6,
    lineHeight: "22px",
    "& .more": {
      fontSize: 12,
      color: theme.palette.primary.main,
      marginLeft: 5,
      marginBottom: 1,
    },
  },
  skillsHeader: {
    fontSize: 13,
    marginLeft: 6,
    marginTop: 5,
    [theme.breakpoints.down("sm")]: {
      marginTop: 10,
      marginBottom: -10,
    },
  },
  jobDetailsWrapper: {
    width: "100%",
    height: "160%",
    "&:hover .v-line": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .v-line": {
      display: "flex",
      alignItems: "center",
      height: "60%",
      width: "1px",
      backgroundColor: theme.palette.grey2.main,
      transform: "translateY(10px)",
    },
    "& .extra-details-wraper": {
      padding: 30,
      fontSize: 13,
    },
    "& .extra-details-wraper > .extra-detail-item": {
      marginBottom: 10,
      marginTop: 10,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: -20,
      "& .extra-details-wraper": {
        padding: 20,
        paddingTop: 25,
      },
      "& .v-line": {
        marginTop: 6,
      },
    },
  },
}));
