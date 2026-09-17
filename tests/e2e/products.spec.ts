import { test, expect } from '@playwright/test';

test.describe('Product Catalog & Dynamic Details', () => {
  test('should display all 6 products on /products', async ({ page }) => {
    await page.goto('/products');

    await expect(page.getByRole('heading', { name: 'Knowhere Tech' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowTheBinary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowTheFile' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowYourResume' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowYourJob' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowTheMD' })).toBeVisible();
  });

  test('should filter products via client-side search input', async ({ page }) => {
    await page.goto('/products');

    const searchInput = page.getByPlaceholder(/Search products/i);
    await searchInput.fill('Binary');

    await expect(page.getByRole('heading', { name: 'KnowTheBinary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Knowhere Tech' })).not.toBeVisible();

    // Clear search
    await page.getByRole('button', { name: /Clear search/i }).click();
    await expect(page.getByRole('heading', { name: 'Knowhere Tech' })).toBeVisible();
  });

  test('should filter products by category buttons', async ({ page }) => {
    await page.goto('/products');

    // Click "Education" category
    await page.getByRole('button', { name: /Education/i }).click();

    await expect(page.getByRole('heading', { name: 'Knowhere Tech' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowTheBinary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'KnowYourResume' })).not.toBeVisible();
  });

  test('should navigate to dynamic product detail page and verify complete specifications', async ({ page }) => {
    await page.goto('/products/knowthebinary');

    // Verify Title & Tagline
    await expect(page.getByRole('heading', { name: 'KnowTheBinary', exact: true })).toBeVisible();
    await expect(page.getByText(/Interactive Computer Science and DSA Learning Platform/i)).toBeVisible();

    // Verify Status & Problem / Solution
    await expect(page.locator('text=LIVE').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Current Landscape & Friction/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /How KnowTheBinary Solves It/i })).toBeVisible();

    // Verify External Launch Link
    const launchBtn = page.getByRole('link', { name: /Launch KnowTheBinary/i });
    await expect(launchBtn).toBeVisible();
    await expect(launchBtn).toHaveAttribute('href', 'https://knowthebinary.web.app/');
    await expect(launchBtn).toHaveAttribute('target', '_blank');
    await expect(launchBtn).toHaveAttribute('rel', 'noopener noreferrer');

    // Verify Tech stack & Architecture
    await expect(page.getByRole('heading', { name: /Built With Modern Web Standards/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Implementation Blueprint/i })).toBeVisible();
  });

  test('should show friendly fallback on unknown product slug', async ({ page }) => {
    await page.goto('/products/unknown-app-xyz');

    await expect(page.getByRole('heading', { name: /Application Not Found/i })).toBeVisible();
    const backBtn = page.getByRole('link', { name: /Browse All Products/i });
    await expect(backBtn).toBeVisible();
    await backBtn.click();
    await expect(page).toHaveURL(/\/products/);
  });
});
