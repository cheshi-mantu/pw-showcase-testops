const { expect, test } = require("@playwright/test");
const allure = require("allure-js-commons");

const {
  attachJiraIssue,
  attachMicroservice,
  authorize,
  createNewEntity,
  deleteNewEntity,
  updateEntity,
} = require("./utils");


test.beforeEach(async () => {
  console.log("beforeEach");
  await allure.attachment("text attachment", "some data", "text/plain");
});

test("Authenticated user must be able to create a new project", async () => {
  await allure.epic("Projects");
  await allure.feature("Managing Projects");
  await allure.story("Authenticated user can manage projects");
  await allure.tags("web", "critical", "regress");
  await attachJiraIssue("AD-4");
  await allure.layer("e2e");
  await allure.owner("bugsbunny");
  await attachMicroservice("testops");
  await authorize();
  await createNewEntity("Project");
});

test("Authenticated and properly authorized user must be able to delete an existing project", async () => {
  await allure.epic("Projects");
  await allure.feature("Managing Projects");
  await allure.story("Authenticated user can manage projects");
  await allure.tags("web", "regress");
  await attachJiraIssue("AD-5");
  await attachMicroservice("testops");
  await allure.layer("e2e");
  await allure.owner("bugsbunny");
  await authorize();
  await deleteNewEntity("Project");
});

test("Authenticated and properly authorized user must be able to update an existing project", async () => {
  await allure.epic("Projects");
  await allure.feature("Managing Projects");
  await allure.story("Authenticated user can manage projects");
  await allure.tags("web", "regress");
  await attachJiraIssue("AD-6");
  await attachMicroservice("testops");
  await allure.layer("e2e");
  await allure.owner("bugsbunny");
  await authorize();
  await updateEntity("Project");
});

test("Test case name cannot be longer than 255 characters", async () => {
  await allure.epic("Projects");
  await allure.feature("Managing Projects");
  await allure.story("Validation of project name length");
  await allure.tags("regress");
  await attachJiraIssue("4766");
  await allure.layer("e2e");
  await allure.owner("bugsbunny");
  await authorize();
  // Assuming createNewEntity takes a name parameter
  const longName = "a".repeat(256);
  await expect(createNewEntity("Project", longName)).rejects.toThrow("Name cannot be longer than 255 characters");
});