const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:5173/api/testing/reset");
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: "tzvi",
        username: "16guitar",
        password: "123456",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("16guitar");
      await page.getByLabel("password").fill("123456");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("tzvi logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("16guitar");
      await page.getByLabel("password").fill("wrong password");
      await page.getByRole("button", { name: "login" }).click();

      const notificationDiv = page.locator(".notification");
      await expect(notificationDiv).toContainText("wrong credentials");
      await expect(notificationDiv).toHaveCSS("border-style", "solid");
      await expect(notificationDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("tzvi logged in")).not.toBeVisible();
    });
  });
});
