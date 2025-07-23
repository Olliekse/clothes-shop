import type { Meta, StoryObj } from "@storybook/react";
import Quantity from "./Quantity";

const meta: Meta<typeof Quantity> = {
  title: "Components/Quantity",
  component: Quantity,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Quantity>;

export const Default: Story = {
  args: {
    stock: 10,
    initialQuantity: 1,
    onQuantityChange: (qty: number) => alert(`Quantity: ${qty}`),
  },
};
