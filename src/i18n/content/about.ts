/**
 * About Page Content
 *
 * このファイルはAboutページの文言を管理します。
 * 非エンジニアの方が編集しやすいよう、日本語の文言をキーとして使用しています。
 *
 * 編集方法:
 * 1. 変更したい文言を日本語で検索
 * 2. ja, en, lo の3言語すべてを同時に更新
 * 3. HTMLタグが含まれる場合は、リンクや改行タグを保持してください
 */

import type { Languages } from "../ui";
import type { ContentRecord } from "./types";

export const aboutContent: ContentRecord = {
  // About page title
  About: {
    ja: "About",
    en: "About",
    lo: "About",
  },

  // Profile table labels
  名称: {
    ja: "名称",
    en: "Name",
    lo: "ຊື່",
  },
  所在地: {
    ja: "所在地",
    en: "Location",
    lo: "ທີ່ຕັ້ງ",
  },
  お問い合わせ: {
    ja: "お問い合わせ",
    en: "Contact",
    lo: "ຕິດຕໍ່",
  },
  事業内容: {
    ja: "事業内容",
    en: "Business Activities",
    lo: "ກິດຈະກຳທຸລະກິດ",
  },

  // Profile table values
  "牧浦 えみ（まきうら えみ）": {
    ja: "牧浦 えみ（まきうら えみ）",
    en: "Emi  Makiura (Amy)",
    lo: "ມາກິອູຣະ ເອມີ (Amy)",
  },
  "ラオス人民民主共和国　ビエンチャン": {
    ja: "ラオス人民民主共和国　ビエンチャン",
    en: "Vientiane, Lao People's Democratic Republic",
    lo: "ນະຄອນຫຼວງວຽງຈັນ, ສາທາລະນະລັດປະຊາທິປະໄຕປະຊາຊົນລາວ",
  },
  考え中: {
    ja: "考え中",
    en: "TBD",
    lo: "ກຳລັງພິຈາລະນາ",
  },
  "障害者就労継続支援、デジタル絵制作(SNSアイコン、名刺、商品パッケージ)、アナログ絵(デッサン全般)、英語教師":
    {
      ja: "障害者就労継続支援、デジタル絵制作(SNSアイコン、名刺、商品パッケージ)、アナログ絵(デッサン全般)、英語教師",
      en: "Continuous employment support for people with disabilities, digital picture production (SNS icons, business cards, product packaging), analog pictures (general sketching), English teacher",
      lo: "ການສະໜັບສະໜູນການຈ້າງງານຕໍ່ເນື່ອງສຳລັບຄົນພິການ, ການຜະລິດຮູບແບບດິຈິຕອນ (ໄອຄອນ SNS, ນາມບັດ, ບັນຈຸສິນຄ້າ), ຮູບແບບອະນາລອກ (ການແຕ້ມຮູບທົ່ວໄປ), ຄູສອນພາສາອັງກິດ",
    },

  // Profile description (biography)
  profile_description: {
    ja: `障害者施設をメインに、ラオスにての英語教師（2025年9月～）、リモートで<a href="https://stara.co.jp" target="_blank" rel="noopener noreferrer">株式会社stara</a>の広報、個人でイラストレーター。<br />
2022年新卒で株式会社staraにて障害者の就労支援を始める。<br />
2023年から2年間SNSアイコン作成やブログの挿絵などのイラストレーター業務を行う。<br />
2025年よりJICA海外協力隊でラオスで英語教師として在任中。<br />`,
    en: `I am an English teacher in Laos, a remote PR person for <a href="https://stara.co.jp" target="_blank" rel="noopener noreferrer">stara Inc.</a>, and a private illustrator, mainly at a facility for the disabled.<br />
In 2022, he graduated from stara Inc. and started working as an employment support for people with disabilities.<br />
From 2023, I worked as an illustrator for 2 years, creating SNS icons and illustrations for blogs.<br />
From 2025, he is currently serving as an English teacher in Laos with JICA Overseas Cooperation Volunteers.<br />`,
    lo: `ຂ້ອຍເປັນຄູສອນພາສາອັງກິດຢູ່ລາວ, ເປັນພະນັກງານ PR <a href="https://stara.co.jp" target="_blank" rel="noopener noreferrer">ບໍລິສັດ stara</a>, ແລະເປັນນັກແຕ້ມຮູບສ່ວນຕົວ, ຫຼັກແມ່ນຢູ່ສຳນັກງານພິການ.<br />
ໃນປີ 2022, ລາວໄດ້ຈົບການສຶກສາຈາກ stara Inc. ແລະເລີ່ມເຮັດວຽກສະໜັບສະໜູນການຈ້າງງານຄົນພິການ.<br />
ຕັ້ງແຕ່ປີ 2023, ຂ້ອຍໄດ້ເຮັດວຽກເປັນນັກແຕ້ມຮູບເປັນເວລາ 2 ປີ, ສ້າງໄອຄອນ SNS ແລະຮູບປະກອບບລອກ.<br />
ຕັ້ງແຕ່ປີ 2025, ລາວປັດຈຸບັນກຳລັງປະຈຳການເປັນຄູສອນພາສາອັງກິດຢູ່ລາວກັບ JICA ອາສາສະໝັກຮ່ວມມືຕ່າງປະເທດ.<br />`,
  },
} as const;

// Type helper for better type safety
export type AboutContentKey = keyof typeof aboutContent;

// Helper function to get translated text
export function getAboutText(key: AboutContentKey, lang: Languages): string {
  return aboutContent[key][lang];
}
