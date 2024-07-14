import { defaultLang, languageNames } from "../../i18n/ui";

export const LangSelector = (props: { path: string }) => (
  <ul>
    {Object.entries(languageNames).map(([lang, label]) => {
      const prefix = lang === defaultLang ? "" : `/${lang}`;
      return (
        <li key={lang}>
          <a href={`${prefix}/${props.path}`}>{label}</a>
        </li>
      );
    })}
  </ul>
);
