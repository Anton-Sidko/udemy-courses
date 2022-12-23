import { useContext } from 'react';
import { ProductsContext } from '../../context/products.context';

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      {products.map(({ id, name: productName }) => (
        <div key={id}>
          <h1>{productName}</h1>
        </div>
      ))}
    </div>
  );
};

export default Shop;
