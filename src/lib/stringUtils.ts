/**
 * Capitalizes the first letter of each word in a string
 * @param str - The input string to capitalize
 * @returns The string with each word capitalized
 *
 * @example
 * capitalizeWords("john doe") // "John Doe"
 * capitalizeWords("mary jane smith") // "Mary Jane Smith"
 * capitalizeWords("JOHN") // "John"
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Capitalizes the first letter of a string
 * @param str - The input string to capitalize
 * @returns The string with the first letter capitalized
 *
 * @example
 * capitalizeFirst("hello") // "Hello"
 * capitalizeFirst("world") // "World"
 */
export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
