import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BackButton = function () {
  const navigate = useNavigate();

  const backButtonHandler = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Button
      type="back"
      onClick={backButtonHandler}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
