const fs = require("fs");
const path = require("path");

const sources = [
  { key: "products", file: "src/data/products.json" },
  { key: "categories", file: "src/data/categories.json" },
  { key: "inventory", file: "src/data/inventory.json" },
  { key: "collections", file: "src/data/collections.json" },
  { key: "product-images", file: "src/data/product-images.json" },
];

const db = {};

sources.forEach(({ key, file }) => {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, "utf-8"));
    db[key] = data;
  } else {
    console.warn(`File not found: ${file}`);
  }
});

fs.writeFileSync("db.json", JSON.stringify(db, null, 2));
