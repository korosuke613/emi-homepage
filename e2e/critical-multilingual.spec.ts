import { test, expect } from '@playwright/test';

/**
 * 重要な多言語機能のみに絞り込んだE2Eテスト
 * データ依存を避け、UI動作のみに焦点を当てたテスト
 */
test.describe('多言語機能（重要テスト）', () => {
  test.describe('ラオス語サポート', () => {
    test('ラオス語URLアクセスが正常に動作するべき', async ({ page }) => {
      // ラオス語URLにアクセス
      await page.goto('/lo/');
      
      // ページが正常に読み込まれることを確認
      await expect(page).toHaveTitle('Emi Makiura');
      
      // HTML lang属性がラオス語になっていることを確認
      const html = await page.locator('html');
      await expect(html).toHaveAttribute('lang', 'lo');
      
      // 言語アイコンがラオス語（LO）になっている
      await expect(page.getByTestId('lang-selector-button')).toHaveText('LO');
    });

    test('ブログページでのラオス語アクセスが正常に動作するべき', async ({ page }) => {
      // ラオス語ブログページにアクセス
      await page.goto('/lo/blog/sample/');
      
      // ページが正常に読み込まれることを確認（メインコンテンツがある）
      await expect(page.getByRole('main')).toBeVisible();
      
      // 言語アイコンがラオス語（LO）になっている
      await expect(page.getByTestId('lang-selector-button')).toHaveText('LO');
    });
  });

  test.describe('基本的な言語切り替え', () => {
    test('日本語と英語のページが正常にアクセス可能であるべき', async ({ page }) => {
      // 日本語ページ
      await page.goto('/');
      await expect(page.getByTestId('lang-selector-button')).toHaveText('JA');
      
      // 英語ページ  
      await page.goto('/en/');
      await expect(page.getByTestId('lang-selector-button')).toHaveText('EN');
    });
  });

  test.describe('フォールバック機能', () => {
    test('存在しない言語でもページが表示されるべき', async ({ page }) => {
      // 日本語のみのブログに英語URLでアクセス
      await page.goto('/en/blog/sample/');
      
      // ページが正常に表示される（404にならない）
      await expect(page.getByRole('main')).toBeVisible();
      
      // 言語アイコンが英語（EN）になっている
      await expect(page.getByTestId('lang-selector-button')).toHaveText('EN');
    });
  });
});
