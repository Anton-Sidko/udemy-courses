import { ActionFunctionArgs, useFetcher } from 'react-router-dom';

import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

const UpdateOrder = function (): React.JSX.Element {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

const action = async function ({ params }: ActionFunctionArgs) {
  const data = { priority: true };

  if (params.orderId) await updateOrder(params.orderId, data);

  return null;
};

// eslint-disable-next-line react-refresh/only-export-components
export { action };
