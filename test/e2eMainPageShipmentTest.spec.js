const { test } = require("@playwright/test");
const allure = require("allure-js-commons");
const {
  attachJiraIssue,
  attachMicroservice,
  authorize,
  createNewEntity,
  deleteNewEntity,
} = require("./utils");

test.describe("ShipmentRequestsWebTest", () => {
  test.beforeEach(async () => {
    allure.layer("e2e");
    allure.owner("baev");
    allure.feature("Shipment Requests");
  });

  test("Authenticated user with confirmed payment can request a shipment", async () => {
    allure.tags("e2e", "regress", "smoke", "regular");
    attachJiraIssue("AD-7");
    allure.story("Manage shipments");
    attachMicroservice("Shipment");
    await authorize();
    await createNewEntity("shipment");
  });
  test("Authenticated user with confirmed payment can cancel a shipment", async () => {
    attachJiraIssue("AD-8");
    allure.tags("web", "regress", "regular", "smoke");
    allure.story("Manage shipments");
    attachMicroservice("Shipment");
    await authorize();
    await deleteNewEntity("shipment");
  });
});