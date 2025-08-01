const { devices, defineConfig } = require("@playwright/test");

export default defineConfig({
  testDir: "./test",
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir: "./allure-results",
        environmentInfo: {
          node_version: process.version,
        },
      },
    ],
  ],
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
