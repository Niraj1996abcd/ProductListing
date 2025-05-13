import styles from "./ProductItem.module.css";

const ProductItem = ({ product }) => {
  const details = product.data || {};
  return (
    <div className={styles.card}>
      <h3>{product.name}</h3>
      {Object.entries(details).map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

export default ProductItem;
