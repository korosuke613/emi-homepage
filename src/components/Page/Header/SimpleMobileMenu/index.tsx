import { useEffect, useRef } from "react";
import type { Languages } from "../../../../i18n/ui";
import {
  getRoutePathWithLang,
  isUIKey,
  useSharedTranslations,
} from "../../../../i18n/utils";
import { STATIC_ROUTES } from "../../../../utils/staticRoute";

type Props = {
  lang: Languages;
  keepOpen?: boolean;
  currentPathWithoutLang?: string;
};

export const SimpleMobileMenu = ({
  lang,
  keepOpen = false,
  currentPathWithoutLang = "/",
}: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const t = useSharedTranslations(lang);

  console.log("SimpleMobileMenu rendered with keepOpen:", keepOpen);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const button = menu.querySelector("button");
    const dropdown = menu.querySelector(".dropdown");

    if (!button || !dropdown) return;

    const toggleMenu = () => {
      console.log("Menu toggle clicked");
      const dropdownEl = dropdown as HTMLElement;
      const isVisible = dropdownEl.style.display === "block";
      dropdownEl.style.display = isVisible ? "none" : "block";
    };

    button.addEventListener("click", toggleMenu);

    return () => {
      button.removeEventListener("click", toggleMenu);
    };
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <button
        type="button"
        style={{
          background: "none",
          border: "none",
          padding: "12px",
          cursor: "pointer",
          fontSize: "24px",
        }}
        aria-label="メニューを開く"
      >
        ⋮
      </button>
      
      <div
        className="dropdown"
        style={{
          display: keepOpen ? "block" : "none",
          position: "absolute",
          top: "100%",
          right: "0",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          minWidth: "150px",
          zIndex: 1000,
        }}
      >
        {STATIC_ROUTES.map((route) => {
          const uiKey = `route.${route}`;
          const routePath = getRoutePathWithLang(route, lang);
          if (isUIKey(lang, uiKey)) {
            return (
              <a
                key={route}
                href={routePath}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  textDecoration: "none",
                  color: "black",
                  borderBottom: "1px solid #eee",
                  backgroundColor: currentPathWithoutLang === `/${route}` ? "#f0f0f0" : "transparent",
                }}
              >
                {t(uiKey)}
              </a>
            );
          }
          console.error(`[SimpleMobileMenu] route is not found: ${route}`);
          return null;
        })}
      </div>
    </div>
  );
};
