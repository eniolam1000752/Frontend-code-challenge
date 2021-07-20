## Inter-Planetry Job board

### Project Description

In this project, a solution has been implemented based on the challenge described in [TAIKAIJOB-12 Frontend Coding Challenge by TAIKAI @ TAIKAI](https://taikai.network/en/taikai/challenges/taikaijob-12-frontend-challenge/overview). In this solution, there is a mockData.json (_`./src/utils/mockDb/mockData.json`_) file hosting information such as the **_job list_** to be rendered and **_filter parameters_** to be selected from. A search input field has been implemented such that a job list is rendered if the company name or job title matchs the parttern string inputed into the search field and if the search input has an empty text all job list that match selected filter options are rendered. Adding to this, joblist been rendered are lazy loaded meaning that when a large list of job is provided, they are not just instantaniously loaded but instead in batches of five(5). That is only the first five(5) are rendered but while scrolling to the buttom of the list, the next set of 5 job items would be appended to what has been rendered. This action continues until all job items are rendered.
**_Note: Lazy loading also happens while search is done or filter options are been selected_**.
Another feature implemented in this project includes; the ability to show **MORE** or **LESS** of a particular bulky job summary/description

### Tech stack

- **React** (Everyone's favorite Javascript frontend framework 🙂 ).
- **Material UI** (UI component library).
- **React testing library** (For testing).

### Project setup

To setup this project, make sure you have node js installed then you can perform the following operations below.

##### Installing project dependencies

    > npm install

##### Running project

    > npm start

##### To run test

Test has been implemented in this project which covers most of the expected behaviour of the app.

    > npm test
