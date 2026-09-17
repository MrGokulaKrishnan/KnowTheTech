import { test, expect } from '@playwright/test';

test.describe('Responsive Layout & Mobile Drawer', () => {
  test('should open and close mobile drawer via hamburger and escape key', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const openMenuBtn = page.getByRole('button', { name: /Open mobile menu/i });
    await expect(openMenuBtn).toBeVisible();
    await openMenuBtn.click();

    // Mobile drawer is visible
    const mobileNav = page.getByRole('dialog', { name: /Mobile Navigation/i });
    await expect(mobileNav).toBeVisible();

    // Verify links inside drawer with exact match
    await expect(mobileNav.getByRole('link', { name: 'Products', exact: true })).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: 'Ecosystem', exact: true })).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: 'About', exact: true })).toBeVisible();

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(mobileNav).not.toBeVisible();
  });

  test('should navigate to products from mobile drawer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await page.getByRole('button', { name: /Open mobile menu/i }).click();
    const mobileNav = page.getByRole('dialog', { name: /Mobile Navigation/i });
    await mobileNav.getByRole('link', { name: 'Products', exact: true }).click();

    await expect(page).toHaveURL(/\/products/);
    await expect(mobileNav).not.toBeVisible();
  });
});
