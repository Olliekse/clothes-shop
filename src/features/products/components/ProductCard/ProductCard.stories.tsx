import type { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Products/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    product: {
      product_id: "1",
      name: "Classic T-Shirt",
      description: "A comfortable cotton t-shirt.",
      category: "Tops",
      collection: "Summer 2024",
      created_at: "2024-01-01",
    },
  },
};

export const NoData: Story = {
  args: {
    product: {
      product_id: "",
      name: "",
      description: "",
      category: "",
      collection: "",
      created_at: "",
    },
  },
};
