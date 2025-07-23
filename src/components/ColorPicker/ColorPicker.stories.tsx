import type { Meta, StoryObj } from "@storybook/react";
import ColorPicker from "./ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    colors: ["red", "blue", "green", "yellow"],
    selectedColor: "red",
    onColorSelect: (color: string) => alert(`Selected: ${color}`),
  },
};
