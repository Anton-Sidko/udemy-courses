import { Link } from 'react-router-dom';

const CartOverview = function (): React.JSX.Element {
  return (
    <div>
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={'/cart'}>Open cart &rarr;</Link>
    </div>
  );
};

export default CartOverview;

