import { test, expect } from '@playwright/test';

test.describe('Ecosystem Network & Interactions', () => {
  test('should inspect different products when clicking satellite nodes on desktop', async ({ page }) => {
    await page.goto('/ecosystem');

    await expect(page.getByRole('heading', { name: /The Connected Ecosystem/i })).toBeVisible();

    // Check central hub presence
    await expect(page.locator('text=KnowTheTech').first()).toBeVisible();

    // Click KnowTheFile node
    const fileNode = page.getByRole('button', { name: /Inspect KnowTheFile/i });
    if (await fileNode.isVisible()) {
      await fileNode.click();
      await expect(page.getByRole('heading', { name: 'KnowTheFile' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: /Full Architecture/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Launch Application/i })).toBeVisible();
    }
  });
});
