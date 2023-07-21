import { Link } from 'react-router-dom';

const EmptyCart = function (): React.JSX.Element {
  return (
    <div>
      <Link to="/menu">&larr; Back to menu</Link>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
};

export default EmptyCart;

