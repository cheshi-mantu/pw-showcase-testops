const { expect, test } = require("@playwright/test");
const allure = require("allure-js-commons");
const {
  attachJiraIssue,
  attachMicroservice,
  authorize,
  createNewEntity,
  deleteNewEntity,
} = require("./utils");

test.describe("IssuesWebTest", () => {
  test.beforeEach(async () => {
    allure.layer("e2e");
    allure.owner("bugsbunny");
    allure.feature("SupportIssues");
  });

  test("Authenticated user must be able to create a support request with type Issue", async () => {
    allure.tags("web", "critical", "regress");
    attachJiraIssue("AD-5");
    allure.story("Managing support requests with type Issue");
    attachMicroservice("Support");
    await authorize();
    await createNewEntity("issue");
  });

  test("Authenticated user must be able to close existing support request with type Issue", async () => {
    allure.tags("web", "regress");
    attachJiraIssue("AD-6");
    allure.story("Managing support requests with type Issue");
    attachMicroservice("Support");
    await authorize();
    await deleteNewEntity("issue");
  });
});