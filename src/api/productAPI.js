export const fetchProducts = async () => {
  try {
    const response = await fetch("/api/products.json");
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
