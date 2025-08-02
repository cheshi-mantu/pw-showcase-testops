const { test, expect } = require("@playwright/test");
// const { allure } = require("allure-playwright");
const allure = require("allure-js-commons");

const attachJiraIssue = (val) => {
  allure.label("jira", val);
};

const attachMicroservice = (val) => {
  allure.label("msrv", val);
};

const isTimeToThrow = () => {
  var failing = Math.random();

  if (failing > 0.91 && failing <= 0.92) {
    throw new Error("net::ERR_CONNECTION_REFUSED");
  }
  if (failing >= 0.93 && failing <= 0.95) {
    throw new Error(
      "Element not found {selector: something}\n Expected: visible or transparent: visible or have css value opacity=0\n Timeout: 6000 ms"
    );
  }
  if (failing >= 0.94 && failing <= 0.99) {
    throw new Error("Test timeout of 30000ms exceeded.");
  }
};

const authorize = async () =>
  await test.step("Authorize", async () => {
    let status = "anonymous";
    await expect(status, "expect status to be anonymous before login").toBe(
      "anonymous"
    );
    await test.step("Go to login page", async () => {
      isTimeToThrow();
    });
    await test.step("Enter Login", async () => {
      isTimeToThrow();
    });
    await test.step("Enter Password", async () => {});
    await test.step("Click Continue", async () => {
      isTimeToThrow();
    });
    status = "authorized";
    await expect(status, "expect status to be authorized before login").toBe(
      "authorized"
    );
  });

const createNewEntity = async (entityName) =>
  await test.step(`Create new ${entityName}`, async () => {
    const issuesList = [];
    await expect(
      issuesList,
      `check ${entityName} count before creation`
    ).toHaveLength(0);
    await test.step(`Go to ${entityName} page`, async () => {
      isTimeToThrow();
    });
    await test.step(`Click 'New ${entityName}' button`, async () => {});
    await test.step(`Enter ${entityName} Info`, async () => {
      isTimeToThrow();
    });
    await test.step(`Confirm new ${entityName} creation`, async () => {
      issuesList.push({ name: "New issue", status: "open" });
    });
    await expect(
      issuesList,
      `check if ${entityName} list contain new ${entityName}`
    ).toContainEqual({ name: "New issue", status: "open" });
  });

const deleteNewEntity = async (entityName) =>
  await test.step(`Close ${entityName}`, async () => {
    const issuesList = [{ name: "New issue", status: "open" }];
    await test.step(`Go to ${entityName} page`, async () => {
      isTimeToThrow();
    });
    await test.step(`Open new ${entityName} page`, async () => {});
    await expect(
      issuesList[0].status,
      `Check ${entityName} status before closing`
    ).toBe("open");
    await test.step(`Click '${entityName}' button`, async () => {});
    issuesList[0].status = "closed";
    await expect(
      issuesList[0].status,
      `Check ${entityName} status after closing`
    ).toBe("closed");
  });

module.exports = {
  attachJiraIssue,
  attachMicroservice,
  authorize,
  createNewEntity,
  deleteNewEntity,
};