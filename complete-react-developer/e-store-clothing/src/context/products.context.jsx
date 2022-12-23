import { createContext, useState, useEffect } from 'react';

import SHOP_DATA from '../shop-data.json';

// as the actual value you want to access
export const ProductsContext = createContext({
  products: [],
  setProducts: () => [],
});

// provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products };

  useEffect(() => {
    setProducts(SHOP_DATA);
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
