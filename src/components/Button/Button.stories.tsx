import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const ViewAll: Story = {
  args: {
    type: "viewAll",
    children: "View All",
    onClick: () => alert("View All clicked"),
  },
};

export const AddToCart: Story = {
  args: {
    type: "addToCart",
    children: "Add to Cart",
    onClick: () => alert("Add to Cart clicked"),
  },
};
