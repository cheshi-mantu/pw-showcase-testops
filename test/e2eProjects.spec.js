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
    await allure.story("Authenticted user can manage projects");
    await allure.tags("web", "critical", "regress");
    await attachJiraIssue("AD-5");
    await attachMicroservice("testops");
    await authorize();
    await createNewEntity("Project");
  });

  test("Authenticated and properly authorized user must be able to delete an existing project", async () => {
    await allure.story("Authenticted user can manage projects");
    await allure.tags("web", "regress");
    await attachJiraIssue("AD-6");
    await attachMicroservice("testops");
    await authorize();
    await deleteNewEntity("Project");
  });
});