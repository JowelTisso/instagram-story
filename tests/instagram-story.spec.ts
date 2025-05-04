import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  const response = await page.request.get(
    "https://run.mocky.io/v3/966b8e58-ae38-43fe-a51a-643213bca5c0"
  );
  await expect(response).toBeOK();
});

test("Open Instagram app and load user story list", async ({ page }) => {
  await page.waitForSelector('[data-testid="story-item"]');

  const storyItems = page.getByTestId("story-item");
  const count = await storyItems.count();

  expect(count).toBeGreaterThan(0);
});

test("Story viewer should open on clicking a story item from list", async ({
  page,
}) => {
  const storyItems = page.getByTestId("story-item");

  await storyItems.first().click();

  await expect(page.getByTestId("story-viewer")).toBeVisible();

  const avatarLocator = page.getByAltText("avatar");

  expect(avatarLocator.first()).toBeVisible();
});

test("Story should change to next/prev image when clicked on the left/right side of the screen", async ({
  page,
}) => {
  const storyItems = page.getByTestId("story-item");
  await storyItems.first().click();

  await expect(page.getByTestId("story-viewer")).toBeVisible();

  const btnRight = page.getByTestId("btn-right");

  const img = page.getByAltText("story content").first();

  await expect(img).toBeVisible();

  const getTranslateStyle = async () => {
    return await img.evaluate((el) => el.style.translate || "");
  };
  const before = await getTranslateStyle();

  await btnRight.click();
  await page.waitForTimeout(300);

  const after = await getTranslateStyle();

  expect(after).not.toBe(before);

  const btnLeft = page.getByTestId("btn-left");
  const beforeLeftClicked = await getTranslateStyle();

  await btnLeft.click();
  await page.waitForTimeout(300);

  const afterLeftClicked = await getTranslateStyle();

  expect(afterLeftClicked).not.toBe(beforeLeftClicked);
});

test("Story image should change automatically after 5 seconds", async ({
  page,
}) => {
  const storyItems = page.getByTestId("story-item");
  await storyItems.first().click();

  await expect(page.getByTestId("story-viewer")).toBeVisible();

  const img = page.getByAltText("story content").first();

  await expect(img).toBeVisible();

  const getTranslateStyle = async () => {
    return await img.evaluate((el) => el.style.translate || "");
  };

  const before = await getTranslateStyle();

  await page.waitForTimeout(5000);

  const after = await getTranslateStyle();

  expect(after).not.toBe(before);
});

test("Close story on click", async ({ page }) => {
  const storyItems = page.getByTestId("story-item");
  await storyItems.first().click();

  await expect(page.getByTestId("story-viewer")).toBeVisible();

  const closeBtn = page.getByTestId("btn-close");

  await closeBtn.click();

  await expect(page.getByTestId("story-viewer")).toBeHidden();
});
