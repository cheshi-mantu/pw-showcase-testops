const { test, expect } = require("@playwright/test");
const { allure } = require("allure-playwright");

const attachJiraIssue = async (val) => {
  await allure.label("jira", val);
};

const attachMicroservice = async (val) => {
  await allure.label("msrv", val);
};

const isTimeToThrow = () => {
  var failing = Math.random();

  if (failing > 0.91 && failing < 0.92) {
    throw new Error("net::ERR_CONNECTION_REFUSED");
  }
  if (failing > 0.94 && failing < 0.95) {
    throw new Error(
      "Element not found {selector: something}\n Expected: visible or transparent: visible or have css value opacity=0\n Timeout: 6000 ms"
    );
  }
  if (failing > 0.98 && failing < 0.99) {
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
    let statusOfSomething = 'good';
    await expect(
      statusOfSomething,
      `check ${entityName} does not exist`
    ).toBe('good');
    await test.step(`Go to ${entityName} page`, async () => {
      isTimeToThrow();
    });
    await test.step(`Click 'New ${entityName}' button`, async () => {});
    await test.step(`Enter ${entityName} name`, async () => {
      isTimeToThrow();
    });
    await test.step(`Check new ${entityName} creation`, async () => {
      statusOfSomething = getStatus(1, 10);  
    });
    await expect(statusOfSomething,`check if ${entityName} exists`).toBe("exists");
  });

const deleteNewEntity = async (entityName) =>
  await test.step(`Delete ${entityName}`, async () => {
    let statusOfSomething = "exists";
    await test.step(`Go to ${entityName} configuration`, async () => {
      isTimeToThrow();
    });
    await test.step(`Go to ${entityName} General section`, async () => {
      isTimeToThrow();
    });
    await test.step(`Click delete ${entityName} button`, async () => {});
    await test.step(`Click confirm deletetion of ${entityName} button`, async () => {});
    await test.step(`Check ${entityName} deletion`, async () => {
      statusOfSomething = getStatus(5, 5);
    });
    await expect(statusOfSomething,`check if ${entityName} exists`).toBe("absent");
  });

  const updateEntity = async (entityName) =>
  await test.step(`Update ${entityName}`, async () => {
    let statusOfSomething = "exists";
    await test.step(`Go to ${entityName} configuration`, async () => {
      // isTimeToThrow();
    });
    await test.step(`Go to ${entityName} general section`, async () => {
      // isTimeToThrow();
    });
    await test.step(`Click update ${entityName} button`, async () => {});
    await test.step(`Click confirm update of ${entityName} button`, async () => {});
    await test.step(`Check ${entityName} is updated`, async () => {
      statusOfSomething = getStatus(5, 5);
    });
    await expect(statusOfSomething,`check if ${entityName} exists`).toBe("absent");
  });

const getStatus = (min, max) => {
  const random = Math.random() * 10; // Generate random number from 0 to 10
  return random >= min && random <= max ? 'exists' : 'absent';
};

module.exports = {
  attachJiraIssue,
  attachMicroservice,
  authorize,
  createNewEntity,
  deleteNewEntity,
  updateEntity,
  getStatus,
};