import { test, expect } from '@playwright/test';

test.describe('Product Catalog & Dynamic Details (8 Products)', () => {
  test('should display all 8 products on /products', async ({ page }) => {
    await page.goto('/products');

    await expect(page.getByRole('heading', { name: 'KnowTheMice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowToMigrate' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowTheFile' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowYourResume' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowYourJob' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowTheMD' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowTheBinary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Knowhere Tech' })).toBeVisible();
  });

  test('should filter products via search input for KnowTheMice and KnowToMigrate', async ({ page }) => {
    await page.goto('/products');

    const searchInput = page.getByPlaceholder(/Search products/i);
    await searchInput.fill('Mice');

    await expect(page.getByRole('heading', { name: 'KnowTheMice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowToMigrate' })).not.toBeVisible();

    await page.getByRole('button', { name: /Clear search/i }).click();
    await searchInput.fill('Migrate');
    await expect(page.getByRole('heading', { name: 'KnowToMigrate' })).toBeVisible();
  });

  test('should filter products by category buttons (Device Connectivity & Migration)', async ({ page }) => {
    await page.goto('/products');

    await page.getByRole('button', { name: /Device Connectivity/i }).click();
    await expect(page.getByRole('heading', { name: 'KnowTheMice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowToMigrate' })).not.toBeVisible();

    await page.getByRole('button', { name: /Migration/i }).click();
    await expect(page.getByRole('heading', { name: 'KnowToMigrate' })).toBeVisible();
  });

  test('should navigate to KnowTheMice detail page and verify complete specifications', async ({ page }) => {
    await page.goto('/products/knowthemice');

    await expect(page.getByRole('heading', { name: 'KnowTheMice', exact: true })).toBeVisible();
    await expect(page.getByText(/Device Connectivity & Hardware Utility Product/i)).toBeVisible();

    const launchBtn = page.getByRole('link', { name: /Launch KnowTheMice/i });
    await expect(launchBtn).toBeVisible();
    await expect(launchBtn).toHaveAttribute('href', 'https://knowthemice.web.app/');
    await expect(launchBtn).toHaveAttribute('target', '_blank');
    await expect(launchBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should navigate to KnowToMigrate detail page and verify complete specifications', async ({ page }) => {
    await page.goto('/products/knowtomigrate');

    await expect(page.getByRole('heading', { name: 'KnowToMigrate', exact: true })).toBeVisible();
    await expect(page.getByText(/Data & Schema Migration Utility Platform/i)).toBeVisible();

    const launchBtn = page.getByRole('link', { name: /Launch KnowToMigrate/i });
    await expect(launchBtn).toBeVisible();
    await expect(launchBtn).toHaveAttribute('href', 'https://knowtomigrate.web.app/');
    await expect(launchBtn).toHaveAttribute('target', '_blank');
    await expect(launchBtn).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should show friendly fallback on unknown product slug', async ({ page }) => {
    await page.goto('/products/unknown-app-xyz');

    await expect(page.getByRole('heading', { name: /Application Not Found/i })).toBeVisible();
    const backBtn = page.getByRole('link', { name: /Browse All 8 Products/i });
    await expect(backBtn).toBeVisible();
    await backBtn.click();
    await expect(page).toHaveURL(/\/products/);
  });
});
