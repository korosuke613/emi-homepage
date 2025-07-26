import type { Meta, StoryObj } from "@storybook/react-vite";
import { DarkModeToggle } from ".";
import { ThemeProvider } from "../ThemeProvider";

const metaData: Meta = {
  title: "DarkModeToggle",
  component: DarkModeToggle,
  args: {
    lang: "ja",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default metaData;

export const Default: StoryObj<typeof DarkModeToggle> = {
  args: {
    lang: "ja",
  },
  render: (args) => <DarkModeToggle {...args} />,
};

export const Languages: StoryObj<typeof DarkModeToggle> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <strong>Japanese (ja)</strong>
        <DarkModeToggle lang="ja" />
      </div>
      <div>
        <strong>English (en)</strong>
        <DarkModeToggle lang="en" />
      </div>
      <div>
        <strong>Laotian (lo)</strong>
        <DarkModeToggle lang="lo" />
      </div>
    </div>
  ),
};
