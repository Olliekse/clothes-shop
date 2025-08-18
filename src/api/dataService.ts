import { mockData } from "./mockData";
import productReviews from "./product-reviews.json";
import productInfo from "./product-info.json";
import collections from "./collections.json";
import users from "./users.json";

// Types
export interface Product {
  product_id: string;
  name: string;
  description: string;
  category: string;
  collection: string;
  created_at: string;
}

export interface ProductImage {
  product_id: string;
  color: string;
  image_url: string;
}

export interface InventoryItem {
  product_id: string;
  sku: string;
  color: string;
  size: string | null;
  list_price: number;
  discount: number | null;
  discount_percentage: number | null;
  sale_price: number;
  sold: number;
  stock: number;
}

export interface ProductReview {
  product_id: string;
  user_id: string;
  rating: number;
  content: string | null;
  created_at: string;
}

export interface ProductInfo {
  product_id: string;
  title: string;
  description: string[];
}

export interface ProductWithDetails extends Product {
  images: ProductImage[];
  inventory: InventoryItem[];
  reviews?: ProductReview[];
  averageRating?: number;
}

// Data Service
class DataService {
  // Get all products with their details
  getProductsWithDetails(): ProductWithDetails[] {
    return mockData.products.map((product) => {
      const images = mockData.productImages.filter(
        (img) => img.product_id === product.product_id
      );
      const inventory = mockData.inventory
        .filter((inv) => inv.product_id === product.product_id)
        .map((inv) => ({
          ...inv,
          size: inv.size ? String(inv.size) : null,
        }));
      const reviews = this.getProductReviews(product.product_id);
      const averageRating = this.getProductAverageRating(product.product_id);

      return {
        ...product,
        images,
        inventory,
        reviews,
        averageRating,
      };
    });
  }

  // Get product by ID with all details
  getProductById(id: string): ProductWithDetails | undefined {
    const product = mockData.products.find((p) => p.product_id === id);
    if (!product) return undefined;

    const images = mockData.productImages.filter(
      (img) => img.product_id === id
    );
    const inventory = mockData.inventory
      .filter((inv) => inv.product_id === id)
      .map((inv) => ({
        ...inv,
        size: inv.size ? String(inv.size) : null,
      }));
    const reviews = this.getProductReviews(id);
    const averageRating = this.getProductAverageRating(id);

    return {
      ...product,
      images,
      inventory,
      reviews,
      averageRating,
    };
  }

  // Get products by category
  getProductsByCategory(category: string): Product[] {
    return mockData.products.filter((product) => product.category === category);
  }

  // Get products by collection
  getProductsByCollection(collection: string): Product[] {
    return mockData.products.filter(
      (product) => product.collection === collection
    );
  }

  // Get inventory for a specific product
  getProductInventory(productId: string): InventoryItem[] {
    return mockData.inventory
      .filter((inv) => inv.product_id === productId)
      .map((inv) => ({
        ...inv,
        size: inv.size ? String(inv.size) : null,
      }));
  }

  // Get available colors for a product
  getProductColors(productId: string): string[] {
    const colors = new Set(
      mockData.inventory
        .filter((inv) => inv.product_id === productId)
        .map((inv) => inv.color)
    );
    return Array.from(colors);
  }

  getCollections() {
    return collections;
  }

  // Get available sizes for a product
  getProductSizes(productId: string): (string | null)[] {
    const sizes = new Set(
      mockData.inventory
        .filter((inv) => inv.product_id === productId)
        .map((inv) => (inv.size ? String(inv.size) : null))
    );
    return Array.from(sizes);
  }

  // Get reviews for a specific product
  getProductReviews(productId: string): ProductReview[] {
    return productReviews.filter((review) => review.product_id === productId);
  }

  // Get average rating for a product
  getProductAverageRating(productId: string): number {
    const reviews = this.getProductReviews(productId);
    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  }

  // Get review count for a product
  getProductReviewCount(productId: string): number {
    return this.getProductReviews(productId).length;
  }

  getUsers(userId: string) {
    return users.find((user) => user.user_id === userId);
  }

  // Get product info (Features, Fabric & Care, Shipping) for a specific product
  getProductInfo(productId: string): ProductInfo[] {
    return productInfo.filter((info) => info.product_id === productId);
  }
}

// Export a singleton instance
export const dataService = new DataService();
