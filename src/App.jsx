import { useEffect, useState } from "react";
import { fetchProducts } from "./api/productAPI";
import ProductList from "./ProductList/ProductList";
import Filters from "./Filters/Filters";
import Chart from "./Chart/Chart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ name: "" });

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  // const filtered = products.filter((product) =>
  //   product.name.toLowerCase().includes(filters.name.toLowerCase())
  // );
  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const filtered = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(filters.name?.toLowerCase() || "");
    const colorMatch = !filters.color || product.data?.color === filters.color;
    const capacityMatch =
      !filters.capacity ||
      product.data?.capacity === filters.capacity ||
      product.data?.["Capacity"] === filters.capacity ||
      `${product.data?.["capacity GB"]} GB` === filters.capacity;
    return nameMatch && colorMatch && capacityMatch;
  });
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Product Listing With Charts</h1>
      <Filters
        filters={filters}
        setFilters={setFilters}
        addProduct={addProduct}
        products={products}
      />
      <ProductList products={filtered} />
      <Chart products={filtered} />
    </div>
  );
};

export default App;
