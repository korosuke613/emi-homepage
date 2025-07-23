import type { Meta, StoryObj } from "@storybook/react-vite";
import { DarkModeToggle } from ".";

const metaData: Meta = {
  title: "DarkModeToggle",
  component: DarkModeToggle,
};

export default metaData;

export const Default: StoryObj<typeof DarkModeToggle> = {
  args: {},
  render: (args) => <DarkModeToggle {...args} />,
};

export const Variants: StoryObj<typeof DarkModeToggle> = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <DarkModeToggle variant="plain" />
      <DarkModeToggle variant="outlined" />
      <DarkModeToggle variant="soft" />
      <DarkModeToggle variant="solid" />
    </div>
  ),
};

export const Sizes: StoryObj<typeof DarkModeToggle> = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <DarkModeToggle size="sm" />
      <DarkModeToggle size="md" />
      <DarkModeToggle size="lg" />
    </div>
  ),
};
