import { test, expect } from '@playwright/test';

test.describe('多言語ブログシステム', () => {
  test.describe('フォールバック機能テスト', () => {
    test('英語のみブログに日本語URLでアクセス', async ({ page }) => {
      // 英語のみのブログに日本語URLでアクセス
      await page.goto('/blog/english-only/');
      
      // ページが正常に表示される（404ではない）
      await expect(page).toHaveTitle(/English Only Blog/);
      
      // 英語コンテンツが表示される（フォールバック機能）
      await expect(page.getByRole('heading', { name: 'This is English Only Content 🇬🇧' })).toBeVisible();
    });

    test('日本語のみブログに英語URLでアクセス', async ({ page }) => {
      // 日本語のみのブログに英語URLでアクセス
      await page.goto('/en/blog/japanese-only/');
      
      // ページが正常に表示される（404ではない）
      await expect(page).toHaveTitle(/日本語のみのブログ/);
      
      // 日本語コンテンツが表示される（フォールバック機能）
      await expect(page.getByRole('heading', { name: 'これは日本語のみのコンテンツです 🇯🇵' })).toBeVisible();
    });
  });

  test.describe('言語アイコン表示', () => {
    test('日本語URLブログページでは日本語アイコン表示', async ({ page }) => {
      // 日本語ブログページにアクセス
      await page.goto('/blog/japanese-only/');
      
      // 言語アイコンが日本語（🇯🇵）になっている
      await expect(page.getByRole('button', { name: '🇯🇵' })).toBeVisible();
    });

    test('英語URLブログページでは英語アイコン表示', async ({ page }) => {
      // 英語ブログページにアクセス
      await page.goto('/en/blog/english-only/');
      
      // 言語アイコンが英語（🇬🇧）になっている
      await expect(page.getByRole('button', { name: '🇬🇧' })).toBeVisible();
    });

    test('多言語対応ブログで言語アイコン表示', async ({ page }) => {
      // 多言語対応ブログにアクセス
      await page.goto('/blog/sample/');
      
      // 言語アイコンが日本語（🇯🇵）になっている
      await expect(page.getByRole('button', { name: '🇯🇵' })).toBeVisible();

      // 英語URLに切り替え
      await page.goto('/en/blog/sample/');
      // 言語アイコンが英語（🇬🇧）に変わる
      await expect(page.getByRole('button', { name: '🇬🇧' })).toBeVisible();
    });
  });

  test.describe('言語切り替え機能', () => {
    test('多言語対応ブログで言語切り替え', async ({ page }) => {
      // 日本語版sampleブログにアクセス
      await page.goto('/blog/sample/');
      
      // 言語アイコンが日本語（🇯🇵）になっている
      await expect(page.getByRole('button', { name: '🇯🇵' })).toBeVisible();
      
      // 言語選択メニューを開く
      await page.getByRole('button', { name: '🇯🇵' }).click();
      
      // メニューが表示されるまで待機
      await expect(page.getByRole('menu')).toBeVisible();
      
      // 英語リンクが表示されるまで待機してからクリック
      const englishLink = page.getByRole('link', { name: '🇬🇧 English' });
      await expect(englishLink).toBeVisible();
      await englishLink.click();
      
      // 英語URLに遷移する
      await expect(page).toHaveURL('/en/blog/sample/');
      
      // 言語アイコンが英語（🇬🇧）に変わる
      await expect(page.getByRole('button', { name: '🇬🇧' })).toBeVisible();
      
      // 英語版のコンテンツが表示される
      await expect(page.getByRole('heading', { name: 'Created from blog template 🎉' })).toBeVisible();
    });
  });
});
