import styles from './Message.module.css';

const Message = function ({ message }: { message: string }): React.JSX.Element {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
};

export default Message;

