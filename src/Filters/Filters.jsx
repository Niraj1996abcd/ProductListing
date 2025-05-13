import styles from "./Filters.module.css";
import { useState } from "react";

const Filters = ({ filters, setFilters, addProduct, products }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    data: "",
  });

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    try {
      const parsedData = JSON.parse(newProduct.data);
      addProduct({
        id: Date.now().toString(),
        name: newProduct.name,
        data: parsedData,
      });
      setNewProduct({ name: "", data: "" });
    } catch (err) {
      alert("Invalid JSON in Product Data field.");
    }
  };

  // 🔍 Dynamically extract unique colors and capacities
  const colors = Array.from(
    new Set(
      products
        .map((p) => p.data?.color || p.data?.Color || p.data?.["Strap Colour"])
        .filter(Boolean)
    )
  );

  const capacities = Array.from(
    new Set(
      products
        .map(
          (p) =>
            p.data?.capacity ||
            p.data?.["Capacity"] ||
            (p.data?.["capacity GB"]
              ? `${p.data["capacity GB"]} GB`
              : undefined)
        )
        .filter(Boolean)
    )
  );

  return (
    <div className={styles.filters}>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleProductChange}
      />
      <input
        type="text"
        name="data"
        placeholder="Product Data (JSON)"
        value={newProduct.data}
        onChange={handleProductChange}
      />
      <button onClick={handleAdd}>Add Product</button>

      <select
        name="color"
        onChange={handleFilterChange}
        value={filters.color || ""}
      >
        <option value="">Filter by Color</option>
        {colors.map((color, idx) => (
          <option key={idx} value={color}>
            {color}
          </option>
        ))}
      </select>

      <select
        name="capacity"
        onChange={handleFilterChange}
        value={filters.capacity || ""}
      >
        <option value="">Filter by Capacity</option>
        {capacities.map((cap, idx) => (
          <option key={idx} value={cap}>
            {cap}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
