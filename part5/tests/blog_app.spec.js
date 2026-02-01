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
      // await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("16guitar");
      await page.getByLabel("password").fill("123456");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("tzvi logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      // await page.getByRole("button", { name: "login" }).click();
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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      // await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("16guitar");
      await page.getByLabel("password").fill("123456");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "create new blog" }).click();
      await page.getByLabel("title").fill("title from test");
      await page.getByLabel("author").fill("author from test");
      await page.getByLabel("url").fill("url from test");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByText("title from test author from test").waitFor();
      await expect(
        page.getByText("title from test author from test"),
      ).toBeVisible();
    });

    describe("And a blog exists", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByLabel("title").fill("The Playwright's Guidebook");
        await page.getByLabel("author").fill("Stuart Spencer");
        await page
          .getByLabel("url")
          .fill(
            "https://www.amazon.com/Playwrights-Guidebook-Insightful-Dramatic-Writing/dp/0571199917/ref=sr_1_5?crid=1HWMH8QQKQFU6&dib=eyJ2IjoiMSJ9.qvNlXS2pBig8AH-5BT0SJFxPCcGjz7wgTbwAa-Wyiy9W4lArOErNVmxKZS4uG0n7qdEkf0B2Ky-TSFMQcp2mss2O2BGnlPaV6KJxUv97L3P2AlnHkDTo7folAggEUlTI76Mb6ogK8WsortzPVPsbzte14XOWY2bvg2MfPEBOQErXbWbldUgBJSZ9cz7LnUQL1dpbgw30cpIDb-nFwx9-5RMBl0Q78-YVFO2BuLuk0s4.2chJY_EwxFhpjFJLMmX5bH52iAYvN_d8EXlVPNOg6aY&dib_tag=se&keywords=playwright&qid=1769916217&s=books&sprefix=playwr%2Cstripbooks%2C606&sr=1-5",
          );
        await page.getByRole("button", { name: "create" }).click();
      });

      test("a blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "show" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("a blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "show" }).click();
        page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "remove" }).click();
        await expect(
          page.getByText("title from test author from test"),
        ).not.toBeVisible();
      });

      test("the remove button won't appear for another user", async ({
        page,
        request,
      }) => {
        await page.getByRole("button", { name: "show" }).click();
        await expect(
          page.getByRole("button", { name: "remove" }),
        ).toBeVisible();
        await page.getByRole("button", { name: "logout" }).click();
        await request.post("http://localhost:5173/api/users", {
          data: {
            name: "hershy",
            username: "tzvika12",
            password: "123456",
          },
        });
        await page.getByLabel("username").fill("tzvika12");
        await page.getByLabel("password").fill("123456");
        await page.getByRole("button", { name: "login" }).click();
        await page.getByRole("button", { name: "show" }).click();
        await expect(page.getByRole("button", { name: "like" })).toBeVisible();
        await expect(
          page.getByRole("button", { name: "remove" }),
        ).not.toBeVisible();
      });
    });
  });
});
