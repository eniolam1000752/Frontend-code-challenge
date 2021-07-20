import { ThemeProvider } from "@material-ui/core";
import { fireEvent, render } from "@testing-library/react";
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

  it("should render joblist that match search value by company name", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    const inputElement = jobBoardInstance.getByTestId("search-input");

    fireEvent.change(inputElement, { target: { value: "facebook" } });

    expect(jobBoardInstance.getByText("Jobs for you (18)")).toBeTruthy();
  });

  it("should render joblist that match search value by job title", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    const inputElement = jobBoardInstance.getByTestId("search-input");

    fireEvent.change(inputElement, { target: { value: "Frontend" } });
    expect(jobBoardInstance.getByText("Jobs for you (1)")).toBeTruthy();

    fireEvent.change(inputElement, { target: { value: "front" } });
    expect(jobBoardInstance.getByText("Jobs for you (1)")).toBeTruthy();
  });

  it("should render joblist that match search value but should be lazy loaded for large list that match this search", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    const inputElement = jobBoardInstance.getByTestId("search-input");

    fireEvent.change(inputElement, { target: { value: "facebook" } });
    expect(jobBoardInstance.getAllByText("Skills:").length).toEqual(5);
  });

  it("should render joblist that match selected filter options", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    const filterTriggerBtn = jobBoardInstance.getByTestId(
      "filter-trigger-button"
    );

    filterTriggerBtn.click();

    const fullTimeSelectOption =
      jobBoardInstance.getByTestId("Job Type-Full time");
    const softwareSelectOption = jobBoardInstance.getByTestId(
      "Company Market-Software"
    );

    fullTimeSelectOption.click();
    softwareSelectOption.click();

    expect(jobBoardInstance.getByText("Jobs for you (18)")).toBeTruthy();
  });
  it("should not render any joblist if selected filter option does not match any job listing", () => {
    const jobBoardInstance = render(
      <ThemeProvider theme={theme}>
        <JobBoardPage />
      </ThemeProvider>
    );

    const filterTriggerBtn = jobBoardInstance.getByTestId(
      "filter-trigger-button"
    );

    filterTriggerBtn.click();

    const fullTimeSelectOption =
      jobBoardInstance.getByTestId("Job Type-Full time");
    const healthSelectOption = jobBoardInstance.getByTestId(
      "Company Market-Health"
    );

    fullTimeSelectOption.click();
    healthSelectOption.click();

    expect(
      jobBoardInstance.getByText(
        "There are no job records based on your filtered search"
      )
    ).toBeTruthy();
  });
});
