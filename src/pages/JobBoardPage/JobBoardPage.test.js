import { ThemeProvider } from "@material-ui/core";
import { render } from "@testing-library/react";
import { theme } from "../../utils/globals";
import { JobBoardPage } from "./JobBoardPage";

describe("Testing JobBoardPage", () => {
  it("should mount successfully", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    expect(jobBoardInstance.getByText("Inter-planetry Job Hunt")).toBeTruthy();
  });

  it("should successfully render the number of jobs in the mock db", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    expect(jobBoardInstance.getByText("Jobs for you (19)")).toBeTruthy();
  });

  it("should successfully lazy load the first five jobs", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    expect(jobBoardInstance.getAllByText("Skills:").length).toEqual(5);
  });
});
