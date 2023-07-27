import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

const RouterError = function (): React.JSX.Element {
  const error = useRouteError();

  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-xl font-semibold">Something went wrong 😢</h1>
      <p className="mb-2">{errorMessage}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
};

export default RouterError;
