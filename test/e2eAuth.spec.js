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
  await allure.attachment("One small txt attachment", "some useless data", "text/plain");
});

test("Login Form - Valid Credentials @allure.id:14542", async() => {
  await allure.epic("Authentication");
  await allure.tags("web", "regress", "smoke");
  await allure.feature("Built-in authentication");
  await allure.story("Login form");
  await attachJiraIssue("AD-1");
  await attachMicroservice("testops");
  await allure.step("Enter valid username and password", async () => {
      await allure.step("Expected Result", async () => {
          await allure.step("User is logged in successfully", async () => {});
      });
  });
  await allure.step("Click Continue button", async () => {
      await allure.step("Expected Result", async () => {
          await allure.step("User is redirected to the dashboard.", async () => {});
      });
  });
});

test("Login Form - Invalid Credentials @allure.id:14544", async() => {
  await allure.epic("Authentication");
  await allure.feature("Built-in authentication");
  await allure.story("Login form");
  await attachJiraIssue("AD-1");
  await attachMicroservice("testops");
  await allure.tags("web", "regress", "critical");
  await allure.step("Enter invalid username and password", async () => {
      await allure.step("Expected Result", async () => {
          await allure.step("User sees an error message", async () => {});
      });
  });
  await allure.step("Click Continue button", async () => {
      await allure.step("Expected Result", async () => {
          await allure.step("User remains on the login page", async () => {});
      });
  });
});