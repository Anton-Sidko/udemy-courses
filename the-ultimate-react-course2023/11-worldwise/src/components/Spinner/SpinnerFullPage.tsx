import Spinner from './Spinner';
import styles from './SpinnerFullPage.module.css';

const SpinnerFullPage = function (): React.JSX.Element {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
};

export default SpinnerFullPage;

