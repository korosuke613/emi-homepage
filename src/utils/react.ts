import type { JsxElement } from "typescript";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ReactProps<T extends ({ ...args }: any) => JSX.Element> =
  Parameters<T>[0];
