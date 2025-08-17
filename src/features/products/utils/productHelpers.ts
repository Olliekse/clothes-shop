// Import the shared utility instead of duplicating functionality
import { capitalizeFirst } from "../../../lib/stringUtils";

// Re-export for backward compatibility if needed
export const capitalizeFirstLetter = capitalizeFirst;

export function formatPrice(price: number): string {
  return price % 1 === 0 ? price.toString() : price.toFixed(2);
}
