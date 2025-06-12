import { test, expect } from "@playwright/test";

test.describe("ブログ一覧機能", () => {
  // .github/workflows/sample-data/blogs.json のテストデータを使用

  test("同じslugのブログを統合して表示する", async ({ page }) => {
    await page.goto("/blog");
    
    // 統合されたブログが表示されることを確認（同じslugは1つのエントリ）
    await expect(page.locator("text=日本語のみのブログ")).toBeVisible();
    await expect(page.locator("text=English Only Blog")).toBeVisible();
    // sampleブログは統合されて1つのエントリのみ表示（日本語ページなので日本語タイトル）
    await expect(page.locator("text=（サンプル）まずはこの記事を開きましょう")).toBeVisible();
    
    // 重複していないことを確認（3つのユニークなslug: english-only, japanese-only, sample）
    const blogItems = page.locator("main ul li");
    await expect(blogItems).toHaveCount(3);
  });

  test("英語ブログ一覧でも統合されたブログを表示する", async ({ page }) => {
    await page.goto("/en/blog");
    
    // 同じく統合されたブログが表示される
    await expect(page.locator("text=日本語のみのブログ")).toBeVisible();
    await expect(page.locator("text=English Only Blog")).toBeVisible();
    // sampleブログは英語ページなので英語タイトル
    await expect(page.locator("text=(Sample) First, open this article")).toBeVisible();
    
    // 重複していないことを確認
    const blogItems = page.locator("main ul li");
    await expect(blogItems).toHaveCount(3);
  });

  test("ブログタイトルの横に言語絵文字を表示する", async ({ page }) => {
    await page.goto("/blog");
    
    // 日本語のみブログの絵文字確認
    const japaneseOnlyBlog = page.locator("li").filter({ hasText: "日本語のみのブログ" });
    await expect(japaneseOnlyBlog.locator("text=🇯🇵")).toBeVisible();
    await expect(japaneseOnlyBlog.locator("text=🇬🇧")).not.toBeVisible();
    
    // 英語のみブログの絵文字確認  
    const englishOnlyBlog = page.locator("li").filter({ hasText: "English Only Blog" });
    await expect(englishOnlyBlog.locator("text=🇬🇧")).toBeVisible();
    await expect(englishOnlyBlog.locator("text=🇯🇵")).not.toBeVisible();
    
    // sampleブログ（多言語）の絵文字確認
    const sampleBlog = page.locator("li").filter({ hasText: "（サンプル）まずはこの記事を開きましょう" });
    await expect(sampleBlog.locator("text=🇯🇵")).toBeVisible();
    await expect(sampleBlog.locator("text=🇬🇧")).toBeVisible();
  });

  test("言語絵文字をクリックして対応する言語ページに遷移する", async ({ page }) => {
    await page.goto("/blog");
    
    // sampleブログの日本語絵文字クリック
    const sampleBlog = page.locator("li").filter({ hasText: "（サンプル）まずはこの記事を開きましょう" });
    const japaneseEmoji = sampleBlog.locator("a").filter({ hasText: "🇯🇵" });
    await japaneseEmoji.click();
    
    // 日本語版ブログページに遷移することを確認
    await page.waitForURL("**/blog/sample/");
    await expect(page.url()).toMatch(/\/blog\/sample\/$/);
  });

  test("英語絵文字をクリックして英語ブログページに遷移する", async ({ page }) => {
    await page.goto("/blog");
    
    // sampleブログの英語絵文字クリック
    const sampleBlog = page.locator("li").filter({ hasText: "（サンプル）まずはこの記事を開きましょう" });
    const englishEmoji = sampleBlog.locator("a").filter({ hasText: "🇬🇧" });
    await englishEmoji.click();
    
    // 英語版ブログページに遷移することを確認
    await page.waitForURL("**/en/blog/sample/");
    await expect(page.url()).toMatch(/\/en\/blog\/sample\/$/);
  });

  test("英語ブログ一覧でも言語絵文字機能が動作する", async ({ page }) => {
    await page.goto("/en/blog");
    
    // 英語ページでも絵文字クリックが機能することを確認
    const sampleBlog = page.locator("li").filter({ hasText: "(Sample) First, open this article" });
    const japaneseEmoji = sampleBlog.locator("a").filter({ hasText: "🇯🇵" });
    await japaneseEmoji.click();
    
    // 日本語版ブログページに遷移することを確認
    await page.waitForURL("**/blog/sample/");
    await expect(page.url()).toMatch(/\/blog\/sample\/$/);
  });

  test("各言語ページで適切な言語のタイトルを表示する", async ({ page }) => {
    // 日本語ページでの確認
    await page.goto("/blog");
    // 統合されたsampleブログで日本語タイトルが表示される
    await expect(page.locator("text=（サンプル）まずはこの記事を開きましょう")).toBeVisible();
    
    // 英語ページでの確認
    await page.goto("/en/blog");
    // 統合されたsampleブログで英語タイトルが表示される  
    await expect(page.locator("text=(Sample) First, open this article")).toBeVisible();
    
    // ラオス語ページでの確認（フォールバック機能により日本語タイトルが表示される）
    await page.goto("/lo/blog");
    await expect(page.locator("text=（サンプル）まずはこの記事を開きましょう")).toBeVisible();
    
    // 全ページで同じ数のブログが表示される  
    const enPageItems = await page.locator("main ul li").count();
    await page.goto("/blog");
    const jaPageItems = await page.locator("main ul li").count();
    await page.goto("/lo/blog");
    const loPageItems = await page.locator("main ul li").count();
    expect(jaPageItems).toBe(3);
    expect(enPageItems).toBe(3);
    expect(loPageItems).toBe(3);
  });

  test("現在の言語の絵文字を最前に表示する", async ({ page }) => {
    await page.goto("/blog");
    
    // sampleブログの絵文字順序確認（日本語ページでは🇯🇵が最初）
    const sampleBlog = page.locator("li").filter({ hasText: "（サンプル）まずはこの記事を開きましょう" });
    const emojiLinks = sampleBlog.locator("a.language-emoji-link");
    
    const firstEmoji = await emojiLinks.first().textContent();
    expect(firstEmoji?.trim()).toBe("🇯🇵");
    
    // 英語ページでの確認
    await page.goto("/en/blog");
    const enSampleBlog = page.locator("li").filter({ hasText: "(Sample) First, open this article" });
    const enEmojiLinks = enSampleBlog.locator("a.language-emoji-link");
    
    const enFirstEmoji = await enEmojiLinks.first().textContent();
    expect(enFirstEmoji?.trim()).toBe("🇬🇧");
    
    // ラオス語ページでの確認（ラオス語は対応していないため、日本語絵文字が最前に表示される）
    await page.goto("/lo/blog");
    const loSampleBlog = page.locator("li").filter({ hasText: "（サンプル）まずはこの記事を開きましょう" });
    const loEmojiLinks = loSampleBlog.locator("a.language-emoji-link");
    
    const loFirstEmoji = await loEmojiLinks.first().textContent();
    expect(loFirstEmoji?.trim()).toBe("🇯🇵");
  });
});