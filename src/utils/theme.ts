// 共通のテーマ設定とスタイル定数
export const FONT_SIZES = {
  "1": "0.625rem",
  "2": "0.75rem",
  "3": "0.8125rem",
  "4": "0.875rem",
  "5": "1rem",
  "6": "1.125rem",
  "7": "1.25rem",
  "8": "1.5rem",
  "9": "1.75rem",
  "10": "2rem",
  "11": "2.625rem",
  "12": "3rem",
} as const;

// 環境に応じたフォントファミリー
export const getFontFamily = () => {
  if (typeof window !== "undefined") {
    // クライアントサイドでの判定
    const isDevelopment =
      !import.meta.env.PROD && !import.meta.env.PUBLIC_PRODUCTION;
    return isDevelopment
      ? '"Times New Roman", "Times", "Georgia", serif'
      : '"Noto Serif JP", "Times New Roman", serif';
  }
  // SSR時はNoto Serif JPを使用
  return '"Noto Serif JP", "Times New Roman", serif';
};

// レスポンシブタイポグラフィのCSS変数
export const getTypographyStyles = () => ({
  h1: {
    fontSize: FONT_SIZES[12],
    "@media (max-width: 899px)": {
      fontSize: FONT_SIZES[11],
    },
    "@media (max-width: 599px)": {
      fontSize: FONT_SIZES[9],
    },
  },
  h2: {
    fontSize: FONT_SIZES[10],
    "@media (max-width: 899px)": {
      fontSize: FONT_SIZES[9],
    },
    "@media (max-width: 599px)": {
      fontSize: FONT_SIZES[8],
    },
  },
  h3: {
    fontSize: FONT_SIZES[9],
    "@media (max-width: 899px)": {
      fontSize: FONT_SIZES[8],
    },
    "@media (max-width: 599px)": {
      fontSize: FONT_SIZES[7],
    },
  },
  h4: {
    fontSize: FONT_SIZES[8],
    "@media (max-width: 899px)": {
      fontSize: FONT_SIZES[7],
    },
    "@media (max-width: 599px)": {
      fontSize: FONT_SIZES[6],
    },
  },
  "body-md": {
    fontSize: FONT_SIZES[5],
    "@media (max-width: 899px)": {
      fontSize: FONT_SIZES[4],
    },
    "@media (max-width: 599px)": {
      fontSize: FONT_SIZES[3],
    },
  },
});
