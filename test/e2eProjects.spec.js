const { expect, test } = require("@playwright/test");
import * as allure from "allure-js-commons";
// const allure = require("allure-js-commons");

const {
  attachJiraIssue,
  attachMicroservice,
  authorize,
  createNewEntity,
  deleteNewEntity,
} = require("./utils");

test.describe("Add epic metadata", () => {
  test.beforeEach(async () => {
    allure.layer("e2e");
    allure.owner("bugsbunny");
    allure.feature("Projects");
  });

  test("Authenticated user must be able to create a new project", async () => {
    allure.tags("web", "critical", "regress");
    await allure.story("Managing support requests with type Issue");
    await attachJiraIssue("AD-5");
    await attachMicroservice("Support");
    await authorize();
    await createNewEntity("issue");
  });

  test("Authenticated and properly authorized user must be able to delete an existing project", async () => {
    allure.tags("web", "regress");
    attachJiraIssue("AD-6");
    allure.story("Managing support requests with type Issue");
    attachMicroservice("Support");
    await deleteNewEntity("issue");
    await authorize();
  });
});