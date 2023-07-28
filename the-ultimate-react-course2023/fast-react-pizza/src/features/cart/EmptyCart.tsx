import LinkButton from '../../ui/LinkButton';

const EmptyCart = function (): React.JSX.Element {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-5 text-xl font-semibold">
        Your cart is still empty. Start adding some pizzas 😉
      </p>
    </div>
  );
};

export default EmptyCart;
